import { ref } from "vue";
import $http from "@/utils/http.js";

export default function (url) {
  let pagation = ref(new Pagation());
  let list = ref([]);

  function getList(filter = {}) {
    pagation.value.loading = true;
    return $http
      .get(url, {
        ...filter,
        page: pagation.value.page,
        size: pagation.value.size,
      })
      .then((res) => {
        list.value = res.data?.list;
        pagation.value.total = res.data?.total;
      })
      .finally(() => {
        pagation.value.loading = false;
      });
  }

  return { pagation, list, getList };
}

class Pagation {
  page = 1;
  size = 10;
  total = 0;
  loading = false;
}
