const casual = require('casual')
const { timesDo, pick, pickMultiple, isExists } = require('./utils')
const itemModel = require('./models/item')
const userModel = require('./models/user')
const commentModel = require('./models/comment')
const tagModel = require('./models/tag')
const CountItems = 1000
const CountUsers = 300
const CountComments = 10000
const CountTags = 50

const db = {
  items: [],
  comments: [],
  users: [],
  tags: [],
  items_tags: [],
  users_stockedItems: []
}

casual.define('item', itemModel)
casual.define('user', userModel)
casual.define('comment', commentModel)
casual.define('tag', tagModel)

timesDo(CountItems, _ => db.items.push(casual.item))

// Create Admin
db.users.push({
  id: casual.uuid,
  email: "admin@example.com",
  username: "admin",
  password: "password",
  items: [],
  comments: [],
  updatedAt: casual.unix_time,
  createdAt: casual.unix_time
})

timesDo(CountUsers, _ => db.users.push(casual.user))
timesDo(CountComments, _ => db.comments.push(casual.comment))
timesDo(CountTags, _ => db.tags.push(casual.tag))

// Item - User Relationships

db.items.forEach(item => {
  const pickedUser = pick(db.users)
  item.userId = pickedUser.id
  pickedUser.items.push(item.id)
})

// Item - Comment Relationships

db.comments.forEach(comment => {
  const pickedUser = pick(db.users)
  const pickedItem = pick(db.items)
  comment.userId = pickedUser.id
  comment.itemId = pickedItem.id
  pickedUser.comments.push(comment.id)
  pickedItem.comments.push(comment.id)
})

// User - StockedItem Relationships
db.users.forEach(user => {
  const count = casual.integer(from = 0, to = 10)
  const items = pickMultiple(db.items, count)
  items.forEach(item => {
    db.users_stockedItems.push({
      id: casual.uuid,
      userId: user.id,
      stockedItems: item.id,
      updatedAt: casual.unix_time,
      createdAt: casual.unix_time
    })
  })
})

// Item - Tag Relationships
db.items.forEach(item => {
  const count = casual.integer(from = 0, to = CountTags)
  const tags = pickMultiple(db.tags, count)
  tags.forEach(tag => {
    db.items_tags.push({
      id: casual.uuid,
      tagId: tag.id,
      itemId: item.id,
      updatedAt: casual.unix_time,
      createdAt: casual.unix_time
    })
  })
})

console.log(JSON.stringify(db))