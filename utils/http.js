import { ElMessage } from "element-plus";

function isCompleteURL(url) {
  return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
}

class Http {
  static getInstance() {
    if (!this._instance) {
      this._instance = new Http();
    }
    return this._instance;
  }

  requestBefore(request, options) {
    // options.headers["Mmym-Token"] = localStorage.getItem("token");
    return { request, options };
  }
  responseBefore(response) {
    let responseData = response._data;
    if (response.headers["content-type"] == "application/octet-stream") {
      return responseData;
    }
    if (response.status === 200) {
      if (responseData.code == 0) {
        return responseData;
      } else {
        if (responseData instanceof Blob) {
          return responseData
        }
        if (responseData.code >= 2000 && responseData.code < 2010) {
          ElMessage.error(responseData?.msg);
        }
        return Promise.reject(responseData);
      }
    } else {
      return Promise.reject(response);
    }
  }

  request({ url, query, body, headers, method }) {
    return new Promise((resolve, reject) => {
      $fetch(url, {
        method,
        query,
        body,
        headers,
        onRequest: ({ request, options }) => {
          let t = this.requestBefore(request, options);
          request = t.request;
          options = t.options;
        },
        onResponse: ({ request, response, options }) => {
          return resolve(this.responseBefore(response));
        },
        onRequestError: ({ request, options, error }) => {
          reject(error);
        },
        onResponseError: ({ request, response, options }) => {
          reject(response);
        },
      });
    });
  }
  get(url, params, headers) {
    return this.request({ url, query: params, headers, method: "GET" });
  }
  post(url, params, headers) {
    return this.request({ url, body: params, headers, method: "POST" });
  }
  put(url, params, headers) {
    return this.request({ url, body: params, headers, method: "PUT" });
  }
  delete(url, params, headers) {
    return this.request({ url, query: params, headers, method: "DELETE" });
  }
}
export default Http.getInstance();
