const casual = require('casual')

module.exports = (userId = -1) => {
  return {
    id: casual.uuid,
    title: casual.title,
    body: casual.sentences(100),
    exceprt: casual.short_description,
    isPublished: casual.coin_flip,
    comments: [],
    userId,
    updatedAt: casual.unix_time,
    createdAt: casual.unix_time
  }
}