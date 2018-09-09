/**
 * Created by Lenovo on 2017/12/19.
 */

import img_3 from '../../assets/img/3.png' // 炸弹图片
import { outWord } from '../../assets/js/computed/word26'

var index = {
  moveSpeed: 150, // 字母下降的速度（ms）,值越大越慢
  speed: 150, // 字母增加的速度（ms）,值越大越慢
  ledoucount: 0,
  win: (parseInt($("body").css("width"))) - 60,
  num: 10, // canvas的id，递增形成canvas的id唯一性
  allWordArr: [], // 当前涉及到的所有字母

  removeTimer: '', // 移出元素的定时器

  init () {
    this.helper()
  },
  helper () {
    $(".couten").css("height", $(document).height());
    $(".backward").css("height", $(document).height());
    $(".ledoucontent").css({
      'height':$(window).height(),
      "overflow":'hidden'
    })

  },

  // 更新本地游戏所涉及到的所有字母(而非26个英文字母，降低难度)
  updateAllWord (wordStr) {
    let allData = []

    wordStr.split('').map((item) => {
      outWord().map( itemSon => {
        if (item == itemSon.str) {
          allData.push(itemSon)
        }

      })

    })

    index.allWordArr = allData

  },

  // 添加字母方法
  add () {
    var imgpic=new Image()

    // 26个英文字母随机算法(a-z祖母随机选择一个字母图片)
    var douimgstr = index.wordRandom()

    var hb = index.durationValue(index.randomFloat(9, 1))
    var Wh = index.durationValue(index.randomFloat(70, 40)) //随机大小(最大、最小)
    var Left = index.durationValue(index.randomFloat(index.win, 0))
    var rot = index.durationValue(index.randomFloat(640, -640))+"deg";
    var canvas;
    index.num++;
    if(hb == "3")
    {
      imgpic.src = img_3
      Wh = 70;

    }else{
      imgpic.src = douimgstr.base64
    }
    imgpic.width = Wh;
    imgpic.height = Wh;
    canvas = index.convertImageToCanvas(imgpic)
    canvas.id = 'canvas' + index.num;

    canvas.setAttribute("data-word", douimgstr.str);
    canvas.setAttribute("class","canvas"+hb+" canvasevent");
    canvas.setAttribute("data-width",Wh);
    $(canvas).css({
      'transition-duration':'0ms',
      '-webkit-transition-duration':'0ms',
      'transition': 'transform 0ms, opacity 0s',
      '-webkit-transition': 'transform 0ms, opacity 0s',
      'transform': 'translate3d('+Left+'px,-60px,0px) rotate(' + Wh + 'deg)',
      '-webkit-transform': 'translate3d('+Left+'px,-60px,0px) rotate(' + Wh + 'deg)',
    });
    $(".ledoucontent").append(canvas);
    setTimeout(function(){
      $(canvas).css({
        'transition-duration': (120 - Wh) * index.moveSpeed + 'ms', // 字母下降速度
        '-webkit-transition-duration': (120 - Wh) * index.moveSpeed + 'ms', // 字母下降速度
        'transition': 'transform '+ (120 - Wh) * index.moveSpeed + 'ms, opacity 0s', // 字母下降速度
        '-webkit-transition': 'transform '+ (120 - Wh) * index.moveSpeed + 'ms, opacity 0s', // 字母下降速度
        'transform': 'translate3d('+Left+'px,'+($(document).height()+100)+'px,0px) rotate(' + rot + ')',
        '-webkit-transform': 'translate3d('+Left+'px,'+($(document).height()+100)+'px,0px) rotate(' + rot + ')'
      })
    },200)

    // 当字母下到屏幕下方后删除(避免页面dom元素过多导致页面卡顿)
    if ($('.canvasevent').length >= 200) {
      for (let i = 0; i < 40; i++) {
        $('.canvasevent').eq(i).remove()
      }
    }

    index.cleartime = setTimeout(index.add, index.speed) //乐豆数量
  },

  // 26个英文字母随机算法(a-z祖母随机选择一个)
  wordRandom () {

    // 区分游戏是否开始的情况(开始后，更改字母数据源)
    if (index.allWordArr.length) {
      const random = Math.floor(Math.random() * index.allWordArr.length)

      return index.allWordArr[random]

    } else {
      const random = Math.floor(Math.random() * 26)

      return outWord()[random]

    }

  },

  // 清除添加字母方法的定时
  clearAdd () {
    clearTimeout(index.cleartime)
  },

  // 字符串 => 数字
  durationValue (value) {
    return parseInt(value);
  },

  // canvas位置随机算法
  randomFloat(low, high) {
    return low + Math.random() * (high - low);
  },

  // 创建canvas对象
  convertImageToCanvas (image, winth, height) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0,image.width,image.height);

    return canvas;
  }

}

index.init()

export default index