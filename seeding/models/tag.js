const casual = require('casual')

module.exports = () => {
  return {
    id: casual.uuid,
    name: casual.word,
    updatedAt: casual.unix_time,
    createdAt: casual.unix_time
  }
}