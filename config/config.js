module.exports = {
  environment: 'dev',
  database: {
    dbName: '7yue',
    host: 'cdb-nrzqzsoa.cd.tencentcdb.com',
    port: 10030,
    user: 'root',
    password: 'aassdd123'
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: 'wx32b1bc8624126fa3',
    appSecret: '05f380e7966a28fb343ebf92cf8a248b',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host: 'https://localhost:8900/'
}