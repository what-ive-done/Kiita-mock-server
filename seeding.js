const casual = require('casual')

// Utils
const timesDo = (times, doSomething) => {
  for (let index = 0; index < times; index++) {
    doSomething()
  }
}

const pick = (iterable) => {
  const index = Math.floor(Math.random() * iterable.length)
  return iterable[index]
}

const isExists = (iterable, property, target) => {
  return iterable.findIndex(i => i[property] === target[property]) > -1
}

const pickMultiple = (iterable, count) => {
  const result = []
  while (result.length === count) {
    const picked = pick(iterable)
    if (!isExists(result, 'id', picked)) {
      result.push(picked)
    }
  }
  return result
}


const CountItems = 1000
const CountUsers = 300
const CountComments = 10000
const CountTags = 10

// Create an object for config file
const db = {
  items: [],
  comments: [],
  users: [],
  tags: []
}

casual.define('item', (userId = -1) => {
  return {
    id: casual.uuid,
    title: casual.title,
    body: casual.sentences(3),
    exceprt: casual.short_description,
    isPublished: casual.random_element([true, false]),
    comments: [],
    tags: [],
    userId,
    updatedAt: casual.unix_time,
    createdAt: casual.unix_time
  }
})

casual.define('user', () => {
  return {
    id: casual.uuid,
    email: casual.email,
    username: casual.username,
    password: casual.password,
    items: [],
    stockedItems: [],
    comments: [],
    updatedAt: casual.unix_time,
    createdAt: casual.unix_time
  }
})

casual.define('comment', (itemId = -1, userId = -1) => {
  return {
    id: casual.uuid,
    itemId,
    userId,
    body: casual.sentences(n = 2)
  }
})

casual.define('tag', () => {
  return {
    id: casual.uuid,
    name: casual.word,
    updatedAt: casual.unix_time,
    createdAt: casual.unix_time
  }
})

// Item 만들기
timesDo(CountItems, _ => db.items.push(casual.item))
db.users.push({
  id: casual.uuid,
  email: "admin@example.com",
  username: "admin",
  password: "password",
  items: [],
  stockedItems: [],
  comments: [],
  updatedAt: casual.unix_time,
  createdAt: casual.unix_time
})
// User 만들기
timesDo(CountUsers, _ => db.users.push(casual.user))
// Comment 만들기
timesDo(CountUsers, _ => db.comments.push(casual.comment))
// Tag 만들기
timesDo(CountUsers, _ => db.tags.push(casual.tag))

// Item - User 관계 만들기
db.items.forEach(item => {
  const pickedUser = pick(db.users)
  item.userId = pickedUser.id
  pickedUser.items.push(item.id)
})

// Item - Comment 관계 만들기
db.comments.forEach(comment => {
  const pickedUser = pick(db.users)
  const pickedItem = pick(db.items)
  comment.userId = pickedUser.id
  comment.itemId = pickedItem.id
  pickedUser.comments.push(comment.id)
  pickedItem.comments.push(comment.id)
})

db.users.forEach(user => {
  const countStocked = casual.integer(from = 0, to = CountItems / 2)

  for (let index = 0; index < countStocked; index++) {
    const pickedItem = pick(db.items)
    if (!isExists(user.stockedItems, 'id', pickedItem)) {
      user.stockedItems.push(pickedItem.id)
    }
  }
})

// Item - Tag 관계 만들기
db.items.forEach(item => {
  const tags = pickMultiple(db.tags, casual.integer(from = 0, to = CountTags >= 5 ? 5 : CountTags))
  item.tags = tags.map(t => t.id)
})

console.log(JSON.stringify(db))