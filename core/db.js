const { Sequelize, Model } = require('sequelize')
const db = require('../config/config').database
const { unset, clone, isArray } = require('lodash')
const sequelize = new Sequelize(db.dbName, db.user, db.password, {
  dialect: 'mysql',
  host: db.host,
  port: db.port,
  timezone: '+08:00',
  logging: false,
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    scopes: {
      bh: {
        attributes: {
          exclude: ['created_at', 'updated_at', 'deleted_at']
        }
      }
    }
  }
})
Model.prototype.toJSON = function () {
  // let data = this.dataValues
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')

  for (key in data) {
    if (key === 'image') {
      if (!data[key].startsWith('http'))
        data[key] = global.config.host + data[key]
    }
  }

  if (isArray(this.exclude)) {
    this.exclude.forEach(
      (value) => {
        unset(data, value)
      }
    )
  }
  return data
}
sequelize.sync()
module.exports = {
  sequelize
}