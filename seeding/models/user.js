
const casual = require('casual')

module.exports = () => {
  return {
    id: casual.uuid,
    email: casual.email,
    username: casual.username,
    password: casual.password,
    items: [],
    comments: [],
    updatedAt: casual.unix_time,
    createdAt: casual.unix_time
  }
}
