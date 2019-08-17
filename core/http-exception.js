class HttpException extends Error {
  constructor(msg = '服务器异常', errCode = 10000, code = 400) {
    super()
    this.errCode = errCode
    this.code = code
    this.msg = msg
  }
}
class ParameterException extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errCode = errCode || 10000
  }
}
class Success extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errCode = errCode || 0
  }
}
class NotFound extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 404
    this.msg = msg || '资源未找到'
    this.errCode = errCode || 10000
  }
}
class AuthFailed extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errCode = errCode || 10004
  }
}
class Forbbiden extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errCode = errCode || 10006
  }
}
class LikeError extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 400
    this.msg = msg || '你已经点赞过'
    this.errCode = errCode || 60001
  }
}
class DislikeError extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 400
    this.msg = msg || '你已经取消点赞'
    this.errCode = errCode || 60002
  }
}
module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden,
  LikeError,
  DislikeError
}