import { $ as $http } from '../server.mjs';

function uploadImage(file, dir) {
  let formData = new FormData();
  formData.append("image", file);
  formData.append("dir", dir);
  return $http.post("/api/admin/file/upload", formData).then((res) => {
    return res == null ? void 0 : res.data;
  });
}

export { uploadImage as u };
//# sourceMappingURL=upload-b00de2b0.mjs.map
