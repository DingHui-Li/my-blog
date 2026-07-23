import $http from "@/utils/http.js";
import { compressImage } from "@/utils/image.js";

export async function uploadImage(file, dir, needCompress = true) {
  if (needCompress) {
    file = await compressImage(file);
  }
  let formData = new FormData();
  formData.append("image", file);
  formData.append("dir", dir);
  return $http.post("/api/admin/file/upload", formData).then((res) => {
    return res?.data;
  });
}
export function uploadSound(file, dir) {
  let formData = new FormData();
  formData.append("sound", file);
  formData.append("dir", dir);
  return $http.post("/api/admin/file/upload", formData).then((res) => {
    return res?.data;
  });
}