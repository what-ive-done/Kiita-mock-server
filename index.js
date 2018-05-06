const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router('Database.json')
const middlewares = jsonServer.defaults()
const SECRET = 's3cr3t'

server.use(middlewares)
// Auth
server.use('/signin', (req, res, next) => {

})
// User/StockedItem Routes
server.use('/users/:user_id/stocked/:item_id', (req, res, next) => {
  const userId = req.params['user_id']
  const itemId = req.params['item_id']
  const user = router.db.get('users').getById(userId).cloneDeep().value()
  const userStockedItems = router.db.get('users_stockedItems').cloneDeep().value()
  const filteredRelations = userStockedItems.filter(item => item.userId === userId)
  const items = filteredRelations.find(item => item.itemId === itemId)
  const item = router.db.get('items').getById(itemId)
  return res.status(200).json(item)
})

server.use('/users/:user_id/stocked', (req, res, next) => {
  const userId = req.params['user_id']
  const user = router.db.get('users').getById(userId).cloneDeep().value()
  const userStockedItems = router.db.get('users_stockedItems').cloneDeep().value()
  const filteredRelations = userStockedItems.filter(item => item.userId === userId)
  const result = []
  const items = [] 
  filteredRelations.forEach(relation => {
    const item = router.db.get('items').getById(relation.itemId).cloneDeep().value()
    items.push(item)
  })
  return res.status(200).json(items)
})

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
