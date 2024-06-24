import { ref } from "vue";
import $http from "@/utils/http.js";

export default function <T>(url: string, series: boolean = true) {
  let pagination = ref(new Pagination());
  let list = ref<Array<T>>([]);

  function getList<T>(filter: {}) {
    pagination.value.loading = true;
    return $http
      .get(url, {
        ...filter,
        page: pagination.value.page,
        size: pagination.value.size,
      })
      .then((res) => {
        console.log("series=", series);
        if (series) {
          //是否连续
          if (pagination.value.page == 1) {
            list.value = res.data?.list;
          } else {
            list.value = [...list.value!, ...res.data?.list];
          }
        } else {
          list.value = res.data?.list;
        }
        pagination.value.total = res.data?.total;
        pagination.value.hasMore = list.value!.length < res.data?.total;
      })
      .catch((err) => {
        //加载错误，页码回滚
        pagination.value.page =
          pagination.value.page == 1 ? 1 : pagination.value.page - 1;
      })
      .finally(() => {
        pagination.value.loading = false;
      });
  }

  function loadMore(filter: {}) {
    if (pagination.value.hasMore && !pagination.value.loading) {
      pagination.value.page += 1;
      getList(filter);
    }
  }

  return { pagination, list, getList, loadMore };
}

class Pagination {
  page = 1;
  size = 20;
  total = 0;
  hasMore = false;
  loading = false;
}
