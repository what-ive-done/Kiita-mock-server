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
  while (result.length !== count) {
    const picked = pick(iterable)
    if (!isExists(result, 'id', picked)) {
      result.push(picked)
    }
  }
  return result
}

module.exports = {
  timesDo,
  pick,
  pickMultiple,
  isExists
}