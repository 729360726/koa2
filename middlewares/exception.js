const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException)
      throw error
    // 已知异常
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        errCode: error.errCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      // 未知异常
      ctx.body = {
        msg: 'we made a mistake',
        errCode: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError