const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../validators/validator')
const { LoginType } = require('../lib/enum')
const { User } = require('../models/user')
const { ParameterException } = require('../../core/http-exception')
const { generateToken } = require('../../core/util')
const { WXManager } = require('../services/wx')
const { Auth } = require('../../middlewares/auth')
const router = new Router({
  prefix: '/token'
})
router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    // 账号+密码
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    // 微信小程序
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      throw new ParameterException('没有相应的处理函数')
      break;
  }
  ctx.body = {
    token
  }
})

router.post('/verify', async ctx => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}
module.exports = router