/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { FetchResult, UseFetchOptions } from '#app';
import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack';
import type { DefaultAsyncDataValue } from 'nuxt/app/defaults';
import type { FetchError } from 'ofetch';
import { destr } from 'destr';

type ColumnSort = {
  id: string;
  desc: boolean;
};

type KeysOf<T> = Array<T extends T ? (keyof T extends string ? keyof T : never) : never>;

const defaultPage = 1;
const defaultLimit = 25;
const defaultSearch = '';
const defaultSort: ColumnSort[] = [];

export const useApiPagination = async <
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void
    ? 'get' extends AvailableRouterMethod<ReqT>
      ? 'get'
      : AvailableRouterMethod<ReqT>
    : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT extends null = DefaultAsyncDataValue,
>(
  key: string,
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>
) => {
  const route = useRoute();
  const router = useRouter();

  onBeforeMount(() => {
    page.value = getQueryParamValue('page', (v) => Number(v), defaultPage);
    limit.value = getQueryParamValue('limit', (v) => Number(v), defaultLimit);
    sort.value = getQueryParamValue('sort', (v) => destr<ColumnSort[]>(v), defaultSort);
    search.value = getQueryParamValue('search', (v) => v, defaultSearch);
  });

  const getQueryParamValue = <T>(key: string, converter: (v: string) => T, defaultValue: T): T => {
    const v = route.query[key];
    return v && !Array.isArray(v) ? converter(v) : defaultValue;
  };

  const hasValueChanged = <T>(oldV: T, newV: T) => {
    if (Array.isArray(oldV) && Array.isArray(newV)) {
      return JSON.stringify(oldV) !== JSON.stringify(newV);
    }

    return oldV !== newV;
  };

  const page = useState<number>(`${key}.page`, () =>
    getQueryParamValue('page', (v) => Number(v), defaultPage)
  );
  const search = useState<string>(`${key}.search`, () =>
    shallowRef(getQueryParamValue('search', (v) => v, defaultSearch))
  );
  const limit = useState<number>(`${key}.limit`, () =>
    getQueryParamValue('limit', (v) => Number(v), defaultLimit)
  );
  const sort = useState<ColumnSort[]>(`${key}.sort`, () =>
    getQueryParamValue('sort', (v) => destr<ColumnSort[]>(v), defaultSort)
  );

  const pageChanged = computed(() => hasValueChanged(defaultPage, page.value));
  const limitChanged = computed(() => hasValueChanged(defaultLimit, limit.value));
  const sortChanged = computed(() => hasValueChanged(defaultSort, sort.value));
  const searchChanged = computed(() => hasValueChanged(defaultSearch, debouncedSearch.value));

  const debouncedSearch = refDebounced(search, 500);

  const limitItems = [1, 5, 10, 25, 50];
  const pagination = computed(() => ({
    pageIndex: page.value - 1,
    pageSize: limit.value,
  }));

  const options = computed<UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>>(() => {
    const base = {
      params: {
        page,
        limit,
        search: debouncedSearch,
        sort,
      },
      key: `${key}.data`,
      onResponse() {
        router.replace({
          query: {
            ...(pageChanged.value && { page: page.value }),
            ...(sortChanged.value && { sort: JSON.stringify(sort.value) }),
            ...(limitChanged.value && { limit: limit.value }),
            ...(searchChanged.value && { search: search.value }),
          },
        });
      },
    };

    if (opts) {
      return {
        ...base,
        ...opts,
      };
    }

    return base;
  });

  const { data, status, clear, error, execute, pending, refresh } = await useFetch<
    ResT,
    ErrorT,
    ReqT,
    Method,
    _ResT,
    DataT
  >(request, options.value);

  watch([sort, debouncedSearch, limit], ([sort, search, limit], [oldSort, oldSearch, oldLimit]) => {
    const limitChanged = hasValueChanged(oldLimit, limit);
    const sortChanged = hasValueChanged(oldSort, sort);
    const searchChanged = hasValueChanged(oldSearch, search);

    if (!sortChanged && !searchChanged && !limitChanged) {
      return;
    }

    page.value = 1;
  });

  return {
    page,
    limit,
    search,
    sort,
    pagination,
    limitItems,
    data,
    status,
    clear,
    error,
    execute,
    pending,
    refresh,
  };
};
