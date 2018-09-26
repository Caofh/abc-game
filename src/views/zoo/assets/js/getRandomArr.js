

// 获取随机n个不重复值得数组
/*
var arrResult = index.getNorepeatArr(3, 6) // 想得到有三个整数值得数组，每个值是0-5之间的整数，而且3个值不能重复

console.log(arrResult)
 */


var index = {}

// 得到一个数组，内部数字随机且不重复(length:数组长度；range:随机范围)
index.getNorepeatArr = function (length, range) {

  var arr = []
  for (var i = 0; true; i++) {
    var random = index.getRandom(range)
    if (arr.indexOf(random) < 0) {
      arr.push(random)
    }

    if (arr.length >= length) {
      break;
    }

  }

  return arr
}

// 随机出0-（length - 1）之间的整数
index.getRandom = function (length) {
  var random = Math.floor(Math.random() * length)

  if (random == length) {
    index.getRandom(length)
  }

  return random
}


module.exports = index