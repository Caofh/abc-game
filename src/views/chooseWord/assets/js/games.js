/**
 * Created by Lenovo on 2017/12/19.
 */

import img_3 from '../../assets/img/3.png' // 炸弹图片
import img_z from '../../assets/img/z.png' // 炸弹爆炸图片
import img_xs from '../../assets/img/xs.png' // 字母点击图片效果
import { outWord } from '../../assets/js/computed/word26'

var index = {
  moveSpeed: 150, // 字母下降的速度（ms）,值越大越慢
  speed: 150, // 字母增加的速度（ms）,值越大越慢
  ledoucount: 0,
  imagestest: new Image(),
  win: (parseInt($("body").css("width"))) - 60,
  num: 10, // canvas的id，递增形成canvas的id唯一性

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

    // 点击字母逻辑
    $(document).on("touchstart",'.ledoucontent .canvasevent', index.stopanimation);
  },

  // 点击字母逻辑
  stopanimation (event) {
    $(event.currentTarget).removeClass("canvasevent");
    var startTop=$(event.target).offset().top;
    var startLeft=$(event.target).offset().left;
    var wid=$(event.currentTarget).data("width");
    if($(event.currentTarget).hasClass("canvas3"))
    {
      index.imagestest.src = img_z;
      index.imagestest.width=wid;
      index.imagestest.height=wid;
      $(event.currentTarget).attr('width',wid);
      $(event.currentTarget).attr('height',wid);
      $(event.currentTarget).get(0).getContext("2d").drawImage(index.imagestest, 0, 0,wid,wid);
      $(event.currentTarget).css({
        'opacity':0,
        'transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
        '-webkit-transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
        'transition': 'transform 0s, opacity 2.8s',
        '-webkit-transition': '-webkit-transform 0s, opacity 2.8s'
      })
      setTimeout(function(){
        $(event.currentTarget).remove()
      },2800)
      index.ledoucount = index.ledoucount-2;
      if(index.ledoucount <= 0){
        index.ledoucount = 0;
      }
      $(".gamenumber").html(index.ledoucount);
    }else{

      index.imagestest.src = img_xs;
      index.imagestest.width=wid;
      index.imagestest.height=wid;
      $(event.currentTarget).attr('width',wid);
      $(event.currentTarget).attr('height',wid);
      $(event.currentTarget).get(0).getContext("2d").drawImage(index.imagestest, 0, 0,wid,wid);
      $(event.currentTarget).css({
        'opacity':0,
        'transition': 'transform 0s, opacity 800ms',
        '-webkit-transition': 'transform 0s, opacity 800ms',
        'transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
        '-webkit-transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
      })
      setTimeout(function(){
        $(event.currentTarget).remove()
      },400)
      index.ledoucount++
      $(".gamenumber").html(index.ledoucount);
    }

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

      imgpic.src = douimgstr
    }
    imgpic.width = Wh;
    imgpic.height = Wh;
    canvas = index.convertImageToCanvas(imgpic)
    canvas.id = 'canvas' + index.num;

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

    index.cleartime = setTimeout(index.add, index.speed)//乐豆数量
  },

  // 26个英文字母随机算法(a-z祖母随机选择一个)
  wordRandom () {
    const random = Math.floor(Math.random() * 26)

    return outWord()[random]
  },

  // 清除添加字母方法的定时
  clearAdd () {
    clearTimeout(index.cleartime)
  },

  // 字符串 => 数字
  durationValue (value) {
    return parseInt(value) ;
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