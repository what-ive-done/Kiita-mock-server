const casual = require('casual')

module.exports = (itemId = -1, userId = -1) => {
  return {
    id: casual.uuid,
    itemId,
    userId,
    body: casual.sentences(n = 2)
  }
}