<template>
  <div class="game-home">

    <!--游戏首页浮层-->
    <div v-if="homeMark" class="start abc-flex-y-start">
      <div class="title">点一点</div>
      <div class="btn abc-flex-x-center">
        <div class="icon"><div class="abc-img"><img src="../assets/img/home/start.png"></div></div>
        <div @click="startGame" class="start-game">开始游戏</div>
      </div>
    </div>

    <!--输入昵称浮层-->
    <div v-if="nicknameMark" class="nickname-par abc-flex-y-center">
      <div class="content abc-flex-x-center">
        <div class="content-nickname"><input type="text" placeholder="请填写昵称"></div>
        <div @click="nickGo" class="btn">Go</div>
      </div>
    </div>


    <!--游戏结果浮层-->
    <div v-if="resultShow" class="popcontent">
      <div class="popdialogue">
        <a @click="backHome" href="javascript:;" class="clearBtn"></a>
        <div class="ledoutext">用时&nbsp;
          <i class="LDcont">{{ gameResult ? gameResult.split(':')[0] : '' }}</i>&nbsp;分
          <i class="LDcont">{{ gameResult ? gameResult.split(':')[1] : '' }}</i>&nbsp;秒
          <i class="LDcont">{{ gameResult ? gameResult.split(':')[2] : '' }}</i>&nbsp;毫秒
        </div>

        <a @click="look" href="javascript:;" class="selectBtn"></a>
      </div>
    </div>

    <!--排行榜浮层-->
    <div v-if="rankingList" class="loadingbig">
      <div class="poploding">
        排行榜
      </div>
    </div>

    <!--游戏开始-->
    <div class="bigdiv" style=" display: none;">
      <div class="ledoucontent">

      </div>

      <!--<div v-if="gameStartMark" class="gamenumber">0</div>-->

      <div v-if="gameStartMark" class="show-board">
        <div v-for="item in wordArr" class="board-item abc-flex-x-between">
          <div class="item-title">
            <span v-for="itemSon in item" class="item-word">{{ itemSon }}</span>
          </div>
          <div class="item-icon abc-img"><img src="../assets/img/home/yes.png"></div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
  import { mapState } from "vuex"
  import moment from 'moment'
  import MobileDetect from'mobile-detect'

  import { randomWords } from '../assets/js/computed/word26'
  import '@/assets/js/m'
  import game from '../assets/js/games'
//  import qmcai from '../assets/js/util/qmcai'

  import img_z from '../assets/img/z.png' // 炸弹爆炸图片
  import img_xs from '../assets/img/xs.png' // 字母点击图片效果

  export default {
    name: 'Home',
    data(){
      return {
        rankingList: false, // 排行榜弹窗标识(弹窗)
        resultShow: false, // 游戏结果显示(弹窗)
        homeMark: true, // home弹窗显示标识(弹窗)
        nicknameMark: false, // 昵称弹窗显示标识(弹窗)

        gameStartMark: false, // 游戏开始标识，游戏总开关(游戏控制步骤 =》 1：此开关打开；2：add方法调用；3：clearAdd方法结束游戏)

        wordArr: [], // 从单词库中随机生成的三个不重复的单词
        gameProgressLast: [], // 之前数组暂存
        gameProgressArr: [],
        wordAllLength: '', // 单词的总长度

        startstamp: '', // 游戏开始时间戳
        endstamp: '', // 游戏结束时间戳
        gameResult: '', // 游戏成绩
      }
    },
    computed: {
      ...mapState([
        'test' // 当前选中的tab
      ]),
    },
    created () {
//      console.log(randomWords())

    },
    watch: {
      gameProgressArr (newValue, oldValue) {
        // 将老数据暂存，用于回退数据
        this.gameProgressLast = oldValue
      }

    },
    mounted () {
      // 初始化
      this.start()

      // doc操作初始化
      doc.init(this)





//      const md = new MobileDetect(window.navigator.userAgent);
//      console.log(md)
//      console.log(md.phone())

    },
    methods: {
      // 开始游戏按钮
      startGame () {
        this.homeMark = false
        this.nicknameMark = true
        // 清除添加字母方法的定时
        game.clearAdd()
      },

      // 修改昵称方法
      nickGo () {
        this.nicknameMark = false
        this.gameStartMark = true

        // 从单词库中随机生成的三个不重复的单词
        const wordArr = randomWords()
        this.wordArr = wordArr

        // 数值主进度
        this.gameProgressArr = this.wordArr.reduce((prev, next) => prev + next)
        this.wordAllLength = this.gameProgressArr.length

        // 将当前涉及到的所有字母传入game组件
        game.updateAllWord(this.gameProgressArr)
        // 游戏开始
        game.add() // 游戏开始方法

        this.startstamp = moment().format('x')

      },

      // 回到首页方法
      backHome () {
        this.wordArr = []
        this.resultShow = false
        this.homeMark = true
        this.rankingList = false // 排行榜弹窗标识(弹窗)
        this.nicknameMark = false // 昵称弹窗显示标识(弹窗)
        this.gameStartMark = false
        this.gameProgressArr = []
        this.wordAllLength = ''
        this.startstamp = ''
        this.endstamp = ''

        // 初始化
        this.start()

        // doc操作初始化
        doc.init(this)

      },

      // 显示榜单
      look () {
        this.rankingList = true
        this.resultShow = false
      },

      // 初始化
      start () {
        let that = this // 外部vue对象


        $(".bigdiv").show();
        $("body").addClass("body");

        game.add() // 游戏开始方法
        setTimeout(() => {
          if (that.wordArr.length) return

          // 清除添加字母方法的定时
          game.clearAdd()
        }, 5000)

      }

    },
    components: {

    }

  }

  var doc = {
    vueObj: '', // vue对象
    imagestest: new Image(),

    init (that) {
      this.vueObj = that

      this.helper()
      this.bind()
    },
    helper () {},
    bind () {
      // 点击字母逻辑
      this.vueObj.$nextTick(() => {
        $(document).off("touchstart",'.ledoucontent .canvasevent', doc.stopanimation);
        $(document).on("touchstart",'.ledoucontent .canvasevent', doc.stopanimation);
      })


    },
    // 点击字母逻辑
    stopanimation (event) {
      $(event.currentTarget).removeClass("canvasevent");
      var startTop=$(event.target).offset().top;
      var startLeft=$(event.target).offset().left;
      var wid=$(event.currentTarget).data("width");
      if($(event.currentTarget).hasClass("canvas3"))
      {
        doc.imagestest.src = img_z;
        doc.imagestest.width=wid;
        doc.imagestest.height=wid;
        $(event.currentTarget).attr('width',wid);
        $(event.currentTarget).attr('height',wid);
        $(event.currentTarget).get(0).getContext("2d").drawImage(doc.imagestest, 0, 0,wid,wid);
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

        console.log('点击炸弹')

      }else{

        doc.imagestest.src = img_xs;
        doc.imagestest.width=wid;
        doc.imagestest.height=wid;
        $(event.currentTarget).attr('width',wid);
        $(event.currentTarget).attr('height',wid);
        $(event.currentTarget).get(0).getContext("2d").drawImage(doc.imagestest, 0, 0,wid,wid);
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

        console.log('点击字母')
        const nowWord = $(event.currentTarget).attr('data-word')
        // 判断是否点击中了方法
        if (nowWord == doc.vueObj.gameProgressArr[0]) {

          doc.vueObj.gameProgressArr = doc.vueObj.gameProgressArr.substr(1, doc.vueObj.gameProgressArr.length)

          // 当前点击单词的索引
          const index = (doc.vueObj.wordAllLength - doc.vueObj.gameProgressArr.length - 1)
          $('.item-word').eq(index).addClass('selected')

          // 对号的展示
          doc.showBtn(index)

        }

      }

    },
    // 展示对号方法
    showBtn (index) {
      $('.item-icon').hide()

      if (index >= doc.vueObj.wordArr[0].length - 1) {
        $('.item-icon').eq(0).show()
      }
      if (index >= doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length - 1) {
        $('.item-icon').eq(0).show()
        $('.item-icon').eq(1).show()
      }
      if (index >= doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length + doc.vueObj.wordArr[2].length - 1) {
        $('.item-icon').show()

        // 计算成绩
        doc.vueObj.endstamp = moment().format('x')
        const timeResult = doc.computeTime()
        doc.vueObj.gameResult = timeResult
//        console.log(timeResult)

        // 停止游戏
        game.clearAdd()

        // 展示成绩板
        doc.vueObj.resultShow = true

      }
    },
    // 计算最终时间格式化算法(时间戳 => 分：秒：毫秒:1:35:258)
    computeTime (intervalTime) {
      const timeResult =
        moment.duration(doc.vueObj.endstamp - doc.vueObj.startstamp).minutes() + ':' +
        moment.duration(doc.vueObj.endstamp - doc.vueObj.startstamp).seconds() + ':' +
        moment.duration(doc.vueObj.endstamp - doc.vueObj.startstamp).milliseconds()

      return timeResult
    }




  }

</script>

<style lang="scss">
  @import "../../../assets/css/pr2rem";
  @import "../assets/css/index";

  .game-home {
    position: relative;

    // home弹窗样式
    .start {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right:0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;
      
      .title {
        margin-top: pr(180);
        font-size: pr(100);
        color: #fff;
      }

      .btn {
        position: absolute;
        bottom: pr(260);
        border-radius: pr(100);
        background: #fff;
        width: pr(405);
        height: pr(115);
        cursor: pointer;

        .icon {
          width: pr(50);
          height: pr(50);

          .abc-img {
            width: 100%;
            height: 100%;
          }
        }

        .start-game {
          font-size: pr(50);
          color: #000;
          margin-left: pr(10);
        }

      }

    }

    // 昵称弹窗样式
    .nickname-par {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right:0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;

      .content {
        width: pr(550);
        height: pr(100);
        margin-top: pr(-100);

        .content-nickname {
          width: pr(300);
          height: pr(100);
          background: rgba(255, 255, 255, 0.6);
          border-radius: pr(100) 0 0 pr(100);

          input{
            width: pr(200);
            height: pr(100);
            line-height: pr(100);
            color: #fff;
            font-size: pr(34);
            background: rgba(255, 255, 255, 0);
          }
        }

        .btn {
          width: pr(120);
          height: pr(100);
          line-height: pr(100);
          text-align: center;
          font-size: pr(50);
          color: #fff;
          background: #4E860D;
          border-radius: 0 pr(100) pr(100) 0;
          cursor: pointer;
          margin-left: pr(-1);

          &:hover, &:active {
            background: rgba(78, 134, 13, 0.7);
          }
        }
      }
    }

    .bigdiv {
      .show-board {
        position: absolute;
        bottom: 0;
        left: 0;
        width: pr(295);
        height: pr(175);
        background: rgba(255, 255, 255, 0.7);
        padding: 0 pr(5);

        .board-item {
          .item-title {
            width: pr(230);
            text-align: left;

            span {
              display: inline-block;
              height: pr(60);
              line-height: pr(60);
              padding: 0 pr(5);
              font-size: pr(30);
              font-weight: 900;

              &.selected {
                color: #f71;
              }
            }
          }
          .item-icon {
            display: none;
            width: pr(50);
            height: pr(50);
          }
        }
      }

    }

  }

</style>
