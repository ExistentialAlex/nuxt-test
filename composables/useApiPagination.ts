/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { FetchResult, UseFetchOptions } from '#app';
import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack';
import type { DefaultAsyncDataValue } from 'nuxt/app/defaults';
import type { FetchError } from 'ofetch';
import { destr } from 'destr';
import { deepEqual } from 'fast-equals';

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
    page.value = getQueryParamValue(route, 'page', (v) => Number(v), defaultPage);
    limit.value = getQueryParamValue(route, 'limit', (v) => Number(v), defaultLimit);
    sort.value = getQueryParamValue(route, 'sort', (v) => destr<ColumnSort[]>(v), defaultSort);
    search.value = getQueryParamValue(route, 'search', (v) => v, defaultSearch);
  });

  const page = useState<number>(`${key}.page`, () =>
    getQueryParamValue(route, 'page', (v) => Number(v), defaultPage)
  );
  const search = useState<string>(`${key}.search`, () =>
    shallowRef(getQueryParamValue(route, 'search', (v) => v, defaultSearch))
  );
  const limit = useState<number>(`${key}.limit`, () =>
    getQueryParamValue(route, 'limit', (v) => Number(v), defaultLimit)
  );
  const sort = useState<ColumnSort[]>(`${key}.sort`, () =>
    getQueryParamValue(route, 'sort', (v) => destr<ColumnSort[]>(v), defaultSort)
  );

  const defaultPageChanged = computed(() => !deepEqual(defaultPage, page.value));
  const defaultLimitChanged = computed(() => !deepEqual(defaultLimit, limit.value));
  const defaultSortChanged = computed(() => !deepEqual(defaultSort, sort.value));
  const defaultSearchChanged = computed(() => !deepEqual(defaultSearch, debouncedSearch.value));

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
        // Store the page changes in the current route to allow sharing the values around.
        router.replace({
          query: {
            ...(defaultPageChanged.value && { page: page.value }),
            ...(defaultSortChanged.value && { sort: JSON.stringify(sort.value) }),
            ...(defaultLimitChanged.value && { limit: limit.value }),
            ...(defaultSearchChanged.value && { search: search.value }),
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
    const limitChanged = !deepEqual(oldLimit, limit);
    const sortChanged = !deepEqual(oldSort, sort);
    const searchChanged = !deepEqual(oldSearch, search);

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
