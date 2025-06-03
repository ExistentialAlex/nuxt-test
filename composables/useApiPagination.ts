/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { FetchResult, UseFetchOptions } from '#app';
import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack';
import type { DefaultAsyncDataValue } from 'nuxt/app/defaults';
import type { FetchError } from 'ofetch';

type ColumnSort = {
  id: string;
  desc: boolean;
};

type KeysOf<T> = Array<T extends T ? (keyof T extends string ? keyof T : never) : never>;

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
  const page = useState(`${key}.page`, () => 1);
  const search = useState<string>(`${key}.search`, () => shallowRef(''));
  const limit = useState(`${key}.limit`, () => 25);
  const sort = useState<ColumnSort[]>(`${key}.sort`, () => []);

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

  watch([sort, debouncedSearch, limit], () => {
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
