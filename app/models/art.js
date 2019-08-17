const {
  Movie,
  Music,
  Sentence
} = require('./classic')
const {
  Op
} = require('sequelize')
const {
  flatten
} = require('lodash')
class Art {
  static async getList (artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0)
        continue
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }
    return flatten(arts)
  }
  static async _getListByType (ids, type) {
    let arts = []
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    const scope = 'bh'
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(finder)
        break;
      case 200:
        arts = await Music.scope(scope).findAll(finder)
        break;
      case 300:
        arts = await Sentence.scope(scope).findAll(finder)
        break;
      case 400:
        art = await Book.scope(scope).findOne(finder)
        break;
      default:
        break;
    }
    return arts
  }
  static async getData (art_id, type, useScope = true) {
    const finder = {
      where: {
        id: art_id
      }
    }
    const scope = useScope ? 'bh' : null
    let art = null
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break;
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break;
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
        break;
      case 400:
        const {
          Book
        } = require('./book')
        art = await Book.scope(scope).findOne(finder)
        if (!art) {
          art = await Book.create({
            id: art_id
          })
        }
        break;
      default:
        break;
    }
    if (art && art.image) {
      let imgUrl = art.dataValues.image
      art.dataValues.image = global.config.host + imgUrl
    }
    return art
  }
}

module.exports = {
  Art
}