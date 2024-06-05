import { ref, shallowRef, computed, watch } from 'vue';

import type { Ref, ShallowRef } from 'vue';

export interface IRequestOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  /**
   * page或pageSize变化后，是否立即请求数据
   */
  immediate?: boolean;
}
export type IRequestFn<T, Q> = (query: Q) => Promise<{ data: T[]; total: number }>;
interface IRequestReturn<Q> {
  total: Ref<number>;
  loading: Ref<boolean>;
  page: Ref<number>;
  pageSize: Ref<number>;
  lastPage: Ref<number>;
  fetchData: (query?: Q) => void;
}

export function useRequest<T, Q extends Record<string, any> = {}>(
  request: IRequestFn<T, Q>,
  options?: IRequestOptions
): {
  list: Ref<T[]>;
} & IRequestReturn<Q>;

export function useRequest<T, Q extends Record<string, any> = {}>(
  request: IRequestFn<T, Q>,
  options: IRequestOptions,
  isShallow: true
): {
  list: ShallowRef<T[]>;
} & IRequestReturn<Q>;

export function useRequest<T, Q extends Record<string, any> = {}>(
  request: IRequestFn<T, Q>,
  {
    defaultPage = 1,
    defaultPageSize = 10,
    immediate = false
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

  if (immediate) {
    watch(
      [page, pageSize],
      () => {
        fetchData();
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
    fetchData
  };
}
