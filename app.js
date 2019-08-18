require('module-alias/register')
const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const app = new Koa()
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

app.use(catchError) //全局异常处理
app.use(parser())
app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)
app.listen(8902)