const requireDirectory = require('require-directory')
const Router = require('koa-router')


class InitManager {
  // 初始化
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadConfig()
  }
  // 加载配置文件
  static loadConfig (path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
  // 自动加载并且注册路由
  static initLoadRouters () {
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: whenLoadModule
    })
    function whenLoadModule (obj) {
      if (obj instanceof Router)
        InitManager.app.use(obj.routes())
    }
  }
}

module.exports = InitManager
