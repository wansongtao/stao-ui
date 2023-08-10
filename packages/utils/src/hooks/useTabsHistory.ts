import { ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * 进入页面时，根据路由参数，设置默认选中的标签页。
 * 改变选中的标签页时，跳转页面并更新路由参数。
 * @param defaultKey 默认选中的标签页，默认为'0'
 * @param queryKey 路由参数的key，默认为tab
 * @returns
 */
export default function useTabsHistory(defaultKey = '0', queryKey = 'tab') {
  const router = useRouter();
  const name = router.currentRoute.value.query[queryKey] ?? defaultKey;
  const activeKey = ref(name as string);

  const onChangeTabs = (tabName: string | number) => {
    const route = router.currentRoute.value;

    router.push({
      path: route.path,
      query: {
        ...route.query,
        [queryKey]: tabName
      }
    });
  };

  return {
    activeKey,
    onChangeTabs
  };
}
