const Router = require('koa-router')
const { RegisterValidator } = require('../validators/validator')
const { User } = require('../models/user')
const { Success } = require('../../core/http-exception')
const router = new Router({
  prefix: '/user'
})
router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    nickname: v.get('body.nickname'),
    password: v.get('body.password1')
  }
  await User.create(user)
  throw new Success()
})
module.exports = router