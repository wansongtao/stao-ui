import { ref, shallowRef, computed, watch } from 'vue';
import { debounce } from '../utils';

import type { Ref, ShallowRef } from 'vue';

export interface IRequestOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  /**
   * 请求防抖时间，单位ms，设置为0则不防抖
   */
  delay?: number;
  /**
   * 是否自动监听page与pageSize的变化
   */
  autoWatchPage?: boolean;
}
export type IRequestFn<T, Q> = (
  query: Q
) => Promise<{ data: T[]; total: number }>;
interface IRequestReturn<Q> {
  total: Ref<number>;
  loading: Ref<boolean>;
  page: Ref<number>;
  pageSize: Ref<number>;
  lastPage: Ref<number>;
  getList: (query?: Q) => void;
}

export function usePagingRequest<T, Q extends Record<string, any> = {}>(
  request: IRequestFn<T, Q>,
  options?: IRequestOptions
): {
  list: Ref<T[]>;
} & IRequestReturn<Q>;

export function usePagingRequest<T, Q extends Record<string, any> = {}>(
  request: IRequestFn<T, Q>,
  options: IRequestOptions,
  isShallow: true
): {
  list: ShallowRef<T[]>;
} & IRequestReturn<Q>;

export function usePagingRequest<T, Q extends Record<string, any> = {}>(
  request: IRequestFn<T, Q>,
  {
    defaultPage = 1,
    defaultPageSize = 10,
    delay = 0,
    autoWatchPage = false
  }: IRequestOptions = {},
  isShallow = false
) {
  const list: Ref<T[]> | ShallowRef<T[]> = !isShallow
    ? ref([])
    : shallowRef([]);
  const loading = ref(false);
  const total = ref(0);
  const page = ref(defaultPage);
  const pageSize = ref(defaultPageSize);

  const lastPage = computed(() => {
    if (!total.value || !pageSize.value) {
      return 0;
    }

    return Math.ceil(total.value / pageSize.value);
  });

  const fetchData = (query?: Q) => {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      ...query
    } as unknown as Q;
    loading.value = true;

    request(params)
      .then((res) => {
        list.value = res.data;
        total.value = res.total;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  /**
   * 请求列表数据，自动带上page与pageSize，只传入其他query即可
   */
  const getList: (query?: Q) => void = delay
    ? debounce(fetchData, delay)
    : fetchData;

  if (autoWatchPage) {
    watch(
      [page, pageSize],
      () => {
        getList();
      },
      { immediate: true }
    );
  }

  return {
    list,
    total,
    loading,
    page,
    pageSize,
    lastPage,
    getList
  };
}
