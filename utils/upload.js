import $http from "@/utils/http.js";

export function uploadImage(file, dir) {
  let formData = new FormData();
  formData.append("image", file);
  formData.append("dir", dir);
  return $http.post("/api/admin/file/upload", formData).then((res) => {
    return res?.data;
  });
}
