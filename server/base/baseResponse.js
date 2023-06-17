export default class BaseResponse {
  code = 0;
  msg = "success";
  data = {};

  constructor({ code = 0, msg = "success", data = {} } = {}) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
