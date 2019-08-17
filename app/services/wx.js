const util = require('util')
const axios = require('axios')
const { AuthFailed } = require('../../core/http-exception')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')
class WXManager {
  static async codeToToken (code) {
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code)

    const res = await axios.get(url)
    if (res.status !== 200) {
      throw new AuthFailed('openId获取失败')
    }
    if (res.data.errcode) {
      throw new AuthFailed('openId获取失败:' + res.data.errmsg)
    }
    let user = await User.getUserByOpenid(res.data.openid)
    if (!user)
      user = await User.registerByOpenid(res.data.openid)
    return generateToken(user.id, Auth.USER)
  }
}
module.exports = {
  WXManager
}