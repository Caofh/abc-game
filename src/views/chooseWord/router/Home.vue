<template>
  <div class="game-home">

    <!--游戏首页浮层-->
    <div v-if="homeMark" class="start abc-flex-y-start">
      <div class="title">点一点</div>

      <div class="btn abc-flex-x-center">
        <div class="icon"><div class="abc-img"><img src="../assets/img/home/start.png"></div></div>
        <div @click="startGame" class="start-game">开始游戏</div>
      </div>

      <div class="difficulty abc-flex-y-start">
        <div @click="chooseDiffcult" class="show-info abc-flex-x-center">
          <div>难度：</div>
          <div>{{ diffcultValue == 1 ? 'easy' : (diffcultValue == 2 ? 'normal' : 'crazy') }}</div>
          <div class="abc-img" :class="diffcultMark ? 'selected' : ''"><img src="../assets/img/home/down_blue.png"></div>
        </div>

        <div class="options abc-flex-y-center" :class="diffcultMark ? 'selected' : ''">
          <div @click="chooseDiff(1)">easy</div>
          <div @click="chooseDiff(2)">normal</div>
          <div @click="chooseDiff(3)">crazy</div>
        </div>
      </div>
    </div>

    <!--输入昵称浮层-->
    <div v-if="nicknameMark" class="nickname-par abc-flex-y-center">
      <div class="content abc-flex-x-center">
        <div class="content-nickname"><input @input="nicknameInput" v-model="nickname" type="text" placeholder="请填写昵称"></div>
        <div @click="nickGo" class="btn">Go</div>

        <div v-if="nickname && tipMark" class="tip abc-img"><img src="../assets/img/home/tip_yes.png"></div>
        <div v-if="nickname && !tipMark" class="tip abc-img"><img src="../assets/img/home/tip_no.png"></div>
      </div>
    </div>


    <!--游戏结果浮层-->
    <div v-if="resultShow" class="popcontent">
      <div class="popdialogue">
        <a @click="backHome" href="javascript:;" class="clearBtn"></a>
        <div class="ledoutext">用时&nbsp;
          <i class="LDcont">{{ gameResult ? gameResult.timeResult.split(':')[0] : '' }}</i>&nbsp;分
          <i class="LDcont">{{ gameResult ? gameResult.timeResult.split(':')[1] : '' }}</i>&nbsp;秒
          <i class="LDcont">{{ gameResult ? gameResult.timeResult.split(':')[2] : '' }}</i>&nbsp;毫秒
        </div>

        <a @click="look" href="javascript:;" class="selectBtn"></a>
      </div>
    </div>

    <!--排行榜浮层-->
    <div v-if="rankingList" class="loadingbig abc-flex-y-center">
    <!--<div v-if="true" class="loadingbig abc-flex-y-center">-->
        <div class="title">排行榜</div>

        <div class="list abc-flex-y-center">
          <div v-for="(item, index) in rankingData" class="item abc-flex-x-center">
            <div class="order">{{ (index + 1) }}</div>
            <div class="name">{{ item.nickname || '' }}</div>
            <div class="time">{{ item.use_time && item.use_time != 'null' ?
              item.use_time.split(':')[0] + '分' + item.use_time.split(':')[1] + '秒' + item.use_time.split(':')[2] + '毫秒' : '-' }}</div>
          </div>
        </div>

        <div v-for="(item, index) in meData" class="me-grade abc-flex-x-center">
          <div class="order">-</div>
          <div class="name">{{ item.nickname || '' }}</div>
          <div class="time">{{ item.use_time && item.use_time != 'null' ?
            item.use_time.split(':')[0] + '分' + item.use_time.split(':')[1] + '秒' + item.use_time.split(':')[2] + '毫秒' : '-' }}</div>
        </div>

        <div class="btn-group abc-flex-x-center">
          <div @click="backLast" class="back abc-flex-x-center"><img src="../assets/img/home/back.png"></div>

          <div class="again-start abc-flex-x-center">
            <div class="icon"><div class="abc-img"><img src="../assets/img/home/refresh.png"></div></div>
            <div @click="startGameAgain" class="start-game">再玩一局</div>
          </div>

        </div>

    </div>

    <!--游戏开始-->
    <!--<div class="bigdiv" :style="{display: 'none', 'background-image': 'url(' + bgResource + ')'}">-->
    <div class="bigdiv" :style="{display: 'none'}">
      <div class="ledoucontent">

      </div>

      <!--<div v-if="gameStartMark" class="gamenumber">0</div>-->

      <div v-if="gameStartMark" class="show-board">
        <div class="hand-deriction abc-img"><img src="../assets/img/home/deriction_up.png"></div>

        <div v-for="item in wordArr" class="board-item abc-flex-x-between">
          <div class="item-title">
            <span v-for="itemSon in item" class="item-word">{{ itemSon }}</span>
          </div>
          <div class="item-icon abc-img"><img src="../assets/img/home/yes.png"></div>
        </div>

      </div>

    </div>

    <audio class="click-audio" src="/static/mp3/click.mp3" style="display: none;"></audio>
    <audio class="click-audio-Bomb" src="/static/mp3/blast.mp3" style="display: none;"></audio>

  </div>

</template>

<script>
  import { mapState } from "vuex"
  import moment from 'moment'
  import MobileDetect from'mobile-detect'
  import { addUser, updateUser, getUserList } from '@/api/chooseWord'

  import { randomWords } from '../assets/js/computed/word26'
  import '@/assets/js/m'
  import game from '../assets/js/games'
//  import qmcai from '../assets/js/util/qmcai'

  import img_z from '../assets/img/z.png' // 炸弹爆炸图片
  import img_xs from '../assets/img/xs.png' // 字母点击图片效果
  import bg from '../assets/img/home/bg/sayabc_bg.png' // 背景图1
  import bg_1 from '../assets/img/home/bg/sayabc_bg_1.png' // 背景图2
  import bg_2 from '../assets/img/home/bg/sayabc_bg_2.png' // 背景图3
  import bg_3 from '../assets/img/home/bg/sayabc_bg_3.png' // 背景图4
  import bg_4 from '../assets/img/home/bg/sayabc_bg_4.png' // 背景图5

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
        gameResult: {}, // 游戏成绩

        nickname: '', // 用户昵称
        tipMark: true, // 昵称是否已存在标识
        rankingData: [], // 排行榜数据
        meData: [], // 当前用户的排行数据

        diffcultMark: false, // 选择难度options展示标识
        diffcultValue: 2, // 1:easy; 2:normal; 3:crazy；默认是2

        bgResource: '', // 背景资源
//        bgTimer: 1 * 60 * 1000 // 每1分钟切换一次背景（时间）
        bgTimer: 30 * 1000 // 每半分钟切换一次背景（时间）
      }
    },
    computed: {
      ...mapState([
        'test' // 当前选中的tab
      ]),
    },
    created () {
      this.changeBg() // 切换背景定时器


    },
    watch: {
//      gameProgressArr (newValue, oldValue) {
//        // 将老数据暂存，用于回退数据
//        this.gameProgressLast = oldValue
//      }

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
      // 页面初始化(模拟背景闪屏效果)
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

      },

      // 开始游戏按钮方法
      startGame () {
        this.homeMark = false
        // 清除添加字母方法的定时
        game.clearAdd()

        // 判断是否登录过
        const storageNickname = window.localStorage.getItem('abcGame_nickname')
        if (storageNickname) {
          this.gameBegin() // 启动游戏

        } else {
          this.nicknameMark = true
        }

      },

      // 检索昵称是否被其他人注册
      async nicknameInput () {

        try {
          const para = this.nickname ? 'nickname=' + this.nickname : ''
          const dataList = await getUserList(para)

          // 如果当前库中存在此用户名，则弹出提示
          this.tipMark = true
          if (dataList.data && dataList.data.length) {
            this.tipMark = false
          }

        } catch (error) {

        }

      },
      // 新用户注册昵称方法
      async nickGo () {
        const nickname = this.nickname
        const data = {
          nickname: nickname
        }
        if (nickname) {
          // 如果此昵称已经被注册过得话，则禁止注册
          if (!this.tipMark) return

          try {
            const dataList = await addUser(data)

            window.localStorage.setItem('abcGame_nickname', nickname) // 将本次nickname加入到locaStorage中
            this.nicknameMark = false
            this.gameBegin() // 启动游戏

          } catch (error) {
            console.log(error)
          }

        } else {
          console.log('未填写昵称')
        }

      },
      // 游戏启动
      gameBegin () {
        this.gameStartMark = true

        // 从单词库中随机生成的三个不重复的单词
        const wordArr = randomWords()
        this.wordArr = wordArr

        // 数值主进度
        this.gameProgressArr = this.wordArr.reduce((prev, next) => prev + next)
        this.wordAllLength = this.gameProgressArr.length
        this.gameProgressLast = this.gameProgressArr.slice()

        this.$nextTick(() => {
          $('.item-word').eq(0).addClass('animation')

          // 展板上方小手展示方法(1s后隐藏)
          $('.hand-deriction').show()
          setTimeout(() => {
            $('.hand-deriction').hide()
          }, 3000)

        })

        // 将当前涉及到的所有字母传入game组件
        game.updateAllWord(this.gameProgressArr)
        // 游戏开始
        game.add() // 游戏开始方法

        this.startstamp = moment().format('x')
      },

      // 再来一局方法
      startGameAgain () {
        this.backHome() // 初始化

        game.clearAdd() // 清除添加字母方法的定时
      },

      // 返回上一层方法
      backLast () {
        this.resultShow = true
        this.rankingList = false
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

        this.diffcultMark = false // 隐层难度选框

        // 初始化
        this.start()

        // doc操作初始化
        doc.init(this)

      },

      // 提交游戏成绩方法
      async updateScore () {
        const nickname = window.localStorage.getItem('abcGame_nickname')
        const use_time = this.gameResult.timeResult || ''
        const time_stamp = this.gameResult.timestamp || ''

        const data = {
          nickname,
          use_time,
          time_stamp
        }

        try {
          const dataList = await updateUser(data)
//          console.log(dataList)

          // 展示成绩板
          doc.vueObj.resultShow = true

        } catch (error) {
          console.log(error)
        }

      },

      // 显示榜单
      async look () {
        this.rankingList = true
        this.resultShow = false
        this.gameStartMark = false

        try {
          const nickname = window.localStorage.getItem('abcGame_nickname') || ''
          const para = nickname ? 'nickname=' + nickname : ''

          // Promise.all同时请求两接口
          Promise.all([getUserList(), getUserList(para)]).then((data) => {
            const dataList = data[0] // 榜单数据
            const meData = data[1] // 个人排名数据

            const dataResult = dataList.data && dataList.data.length ? dataList.data : []
            const meDataResult = meData.data && meData.data.length ? meData.data : []

            this.rankingData = dataResult // 填充榜单数据
            this.meData = meDataResult // 填充个人排名数据

          })

        } catch (error) {
          console.log(error)
        }

      },

      // 选择难度
      chooseDiffcult () {
        this.diffcultMark = !this.diffcultMark
      },
      // 点击难度方法
      chooseDiff (type) {
        game.changeDiff(type)
        this.diffcultValue = type
        this.diffcultMark = false
      },

      // 每2分钟切换背景方法
      changeBg () {
        let that = this
        this.bgResource = bg_1

        setInterval(() => {
          let bgResource = ''
          const random = Math.floor(Math.random() * 6)

          // 共5张背景，增大sayabc主题背景几率
          switch (random) {
            case (0): bgResource = bg; break;
            case (1): bgResource = bg; break;
            case (2): bgResource = bg_1; break;
            case (3): bgResource = bg_2; break;
            case (4): bgResource = bg_3; break;
            case (5): bgResource = bg_4; break;
          }

          $('.bigdiv').css({
            'background-color': '#fff'
          })
          setTimeout(() => {
            that.bgResource = bgResource
          }, 500)

        }, this.bgTimer)

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

      // 区分点击炸弹还是字母方法
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

        // 音效
        let audio = $(".click-audio-Bomb")[0];
        audio.play(); // 播放音效

        // 点中炸弹，减去一排单词
        doc.subRowWord()

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

        // 音效
        let audio = $(".click-audio")[0];
        audio.play(); // 播放音效

        const nowWord = $(event.currentTarget).attr('data-word')
        // 判断是否点击中了方法
        if (nowWord == doc.vueObj.gameProgressArr[0]) {

          doc.addWord() // 点对单词，增加单词方法

        } else {

          doc.subWord() // 点错单词，减少一个单词

        }

      }

    },
    // 点对单词，增加一个单词方法
    addWord () {
      doc.vueObj.gameProgressArr = doc.vueObj.gameProgressArr.substr(1, doc.vueObj.gameProgressArr.length)

      // 当前点击单词的索引
      const index = (doc.vueObj.wordAllLength - doc.vueObj.gameProgressArr.length - 1)
      $('.item-word').eq(index).addClass('selected')

      // 单词的跳动
      $('.item-word').removeClass('animation')
      $('.item-word').eq(index + 1).addClass('animation')

      // 对号的展示
      doc.showBtn(index, 'add')
    },
    // 点错单词，减少一个单词方法
    subWord () {
      // 当前点击单词的索引
      const index = (doc.vueObj.wordAllLength - doc.vueObj.gameProgressArr.length)

      if (index > 0) {
        const newArr = doc.vueObj.gameProgressLast.substr(index - 1, doc.vueObj.gameProgressLast.length)

        doc.vueObj.gameProgressArr = newArr

        // 控制样式
        $('.item-word').eq(index - 1).removeClass('selected')

        // 单词的跳动
        $('.item-word').removeClass('animation')
        $('.item-word').eq(index - 1).addClass('animation')

        // 对号的展示
        doc.showBtn(index - 1, 'sub')

      }
    },
    // 点中炸弹，减去一排单词方法
    subRowWord () {

      const wordOne = doc.vueObj.wordArr[0] // 看板中第一个单词
      const wordTwo = doc.vueObj.wordArr[1] // 看板中第二个单词
      const wordThree = doc.vueObj.wordArr[2] // 看板中第三个单词

      // 通过对号的数量，判断当前游戏进度在第几行（0：第一行；1：第二行；2：第三行）
      const yesIcon = $('.item-icon.selected').length
      let progressNew = ''

      switch (yesIcon) {
        case 0: {
          progressNew = doc.vueObj.gameProgressLast
          break
        }
        case 1: {
          progressNew = doc.vueObj.gameProgressLast.replace(wordOne, '')
          break
        }
        case 2: {
          progressNew = doc.vueObj.gameProgressLast.replace(wordOne, '').replace(wordTwo, '')
          break
        }
      }

      // 为游戏进度重新赋值
      doc.vueObj.gameProgressArr = progressNew

      // 当前点击单词的索引
      const index = (doc.vueObj.wordAllLength - doc.vueObj.gameProgressArr.length)

      // 控制样式
      $('.item-title').eq(yesIcon).children('.item-word').removeClass('selected')

      // 单词的跳动
      $('.item-word').removeClass('animation')
      $('.item-word').eq(index).addClass('animation')

    },
    // 展示对号方法(index:索引； type：调用的类型（add:增加单词调用；sub：减去单词调用）)
    showBtn (index, type) {
      $('.item-icon').removeClass('selected')

      if (index >= doc.vueObj.wordArr[0].length - 1) {
        $('.item-icon').eq(0).addClass('selected')

        // 整排跳动（阶段性晋级）
        if (index == doc.vueObj.wordArr[0].length - 1 && type == 'add') {
          doc.stageJump(0) // 第一排整行跳动跳动
        }

      }
      if (index >= doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length - 1) {
        $('.item-icon').eq(0).addClass('selected')
        $('.item-icon').eq(1).addClass('selected')

        // 整排跳动（阶段性晋级）
        if (index == doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length - 1 && type == 'add') {
          doc.stageJump(1) // 第一排整行跳动跳动
        }

      }
      if (index >= doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length + doc.vueObj.wordArr[2].length - 1) {
        $('.item-icon').addClass('selected')

        // 整排跳动（阶段性晋级）
        if (index == doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length + doc.vueObj.wordArr[2].length - 1 && type == 'add') {
          doc.stageJump(2) // 第一排整行跳动跳动
        }

        // 计算成绩
        doc.vueObj.endstamp = moment().format('x')
        const timeResult = doc.computeTime()
        doc.vueObj.gameResult = timeResult
//        console.log(timeResult)

        // 停止游戏
        game.clearAdd()

        // 上传成绩方法
        doc.vueObj.updateScore()

      }
    },
    // 阶段性整排跳动方法(stage参数： 0：第一排整行跳动；1：第二排；3：第三排)
    stageJump (stage) {
      const node = $('.item-title').eq(stage).children('.item-word')
      node.addClass('animation-stage')
      setTimeout(() => {
        node.removeClass('animation-stage')
      }, 600)
    },

    // 计算最终时间格式化算法(时间戳 => 分：秒：毫秒:1:35:258)
    computeTime (intervalTime) {
      const timestamp = doc.vueObj.endstamp - doc.vueObj.startstamp

      const timeResult =
        moment.duration(doc.vueObj.endstamp - doc.vueObj.startstamp).minutes() + ':' +
        moment.duration(doc.vueObj.endstamp - doc.vueObj.startstamp).seconds() + ':' +
        moment.duration(doc.vueObj.endstamp - doc.vueObj.startstamp).milliseconds()

      return {
        timestamp,
        timeResult
      }
    }




  }

</script>

<style lang="scss">
  @import "../../../assets/css/pr2rem";
  @import "../assets/css/index";

  // 0.4秒动画设置，用于下面被继承
  .trans {
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

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
        bottom: pr(280);
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

      .difficulty {
        position: absolute;
        bottom: 0;
        width: pr(405);
        height: pr(270);
        cursor: pointer;
        color: #fff;
        font-size: pr(34);

        .show-info {
          margin-bottom: pr(10);
          & > div {
            margin-right: pr(10);
          }
          .abc-img {
            /*继承0.4秒动画设置*/
            @extend .trans;

            width: pr(40);
            height: pr(40);

            &.selected {
              /*继承0.4秒动画设置*/
              @extend .trans;

              -webkit-transform: rotate(-180deg);
              -moz-transform: rotate(-180deg);
              -ms-transform: rotate(-180deg);
              -o-transform: rotate(-180deg);
              transform: rotate(-180deg);

            }
          }
        }

        .options {
          width: pr(140);
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: pr(10);
          overflow: hidden;

          & > div {
            font-size: pr(34);
            margin-bottom: pr(10)
          }

          &.selected {
            height: pr(200);
          }
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
        position: relative;
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

        .tip {
          position: absolute;
          right: pr(-15);
          top: pr(25);
          width: pr(60);
          height: pr(60);
        }
      }
    }

    .bigdiv {
      @extend .trans;

      .show-board {
        position: absolute;
        top: 0;
        left: 0;
        width: pr(295);
        height: pr(175);
        background: rgba(255, 255, 255, 0.7);
        padding: 0 pr(5);

        .hand-deriction {
          position: absolute;
          width: pr(100);
          height: pr(100);
          bottom: pr(-120);
          left: pr(20);

          -webkit-animationn: handMove 1s infinite;
          -moz-animation: handMove 1s infinite;
          -o-animation: handMove 1s infinite;
          animation: handMove 1s infinite;

          @keyframes handMove{
            50% {
              bottom: pr(-150);
            }
            100% {
              bottom: pr(-120);
            }
          }

        }

        .board-item {
          height: pr(55);

          .item-title {
            width: pr(230);
            height: pr(55);
            text-align: left;

            span {
              display: inline-block;
              position: relative;
              height: pr(55);
              line-height: pr(60);
              padding: 0 pr(5);
              font-size: pr(30);
              font-weight: 900;

              &.selected {
                color: #f71;
              }

              &.animation {
                font-size: pr(40);
                color: #ff0000;
                text-shadow: 0 0 pr(5) #1AFA29;

                -webkit-animationn: dance 1s infinite;
                -moz-animation: dance 1s infinite;
                -o-animation: dance 1s infinite;
                animation: dance 1s infinite;

                @keyframes dance{
                  0% {
                    -webkit-transform: rotate(0);
                    -moz-transform: rotate(0);
                    -ms-transform: rotate(0);
                    -o-transform: rotate(0);
                    transform: rotate(0);
                  }
                  25% {
                    -webkit-transform: rotate(-25deg);
                    -moz-transform: rotate(-25deg);
                    -ms-transform: rotate(-25deg);
                    -o-transform: rotate(-25deg);
                    transform: rotate(-25deg);
                  }
                  50% {
                    -webkit-transform: rotate(0);
                    -moz-transform: rotate(0);
                    -ms-transform: rotate(0);
                    -o-transform: rotate(0);
                    transform: rotate(0);
                  }
                  75% {
                    -webkit-transform: rotate(25deg);
                    -moz-transform: rotate(25deg);
                    -ms-transform: rotate(25deg);
                    -o-transform: rotate(25deg);
                    transform: rotate(25deg);
                  }
                  100% {
                    -webkit-transform: rotate(0);
                    -moz-transform: rotate(0);
                    -ms-transform: rotate(0);
                    -o-transform: rotate(0);
                    transform: rotate(0);
                  }
                }

              }

              &.animation-stage {
                @extend .trans;

                color: #f71;
                text-shadow: 0 0 pr(5) #1AFA29;

                -webkit-animationn: dance_stage 0.3s infinite;
                -moz-animation: dance_stage 0.3s infinite;
                -o-animation: dance_stage 0.3s infinite;
                animation: dance_stage 0.3s infinite;

                @keyframes dance_stage{
                  0% {
                    top: 0;
                  }
                  50% {
                    top: pr(-8);
                  }
                  100% {
                    top: pr(0);
                  }
                }

              }

            }
          }
          .item-icon {
            display: none;
            width: pr(50);
            height: pr(50);

            &.selected {
              display: block;
            }
          }
        }
      }

    }

    .loadingbig {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right:0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;
      color: #fff;

      .title {
        font-size: pr(50);
      }

      .list {
        width: pr(650);
        height: pr(780);
        background: rgba(58, 56, 59, 0.7);
        margin-top: pr(15);

        .item {
          font-size: pr(36);
          height: pr(60);
          margin-bottom: pr(10);

          .order {
            margin-right: pr(60);
            margin-left: pr(30);
          }

          .name {
            text-align: left;
            width: pr(230);
          }

          .time {
            font-size: pr(30);
            text-align: left;
            width: pr(260);
          }
        }
      }

      .me-grade {
        margin-top: pr(15);
        width: pr(650);
        height: pr(100);
        background: rgba(58, 56, 59, 0.7);
        font-size: pr(36);

        .order {
          margin-right: pr(60);
          margin-left: pr(30);
        }

        .name {
          text-align: left;
          width: pr(230);
        }

        .time {
          font-size: pr(30);
          text-align: left;
          width: pr(260);
        }

      }

      .btn-group {
        margin-top: pr(15);
        width: pr(650);
        height: pr(125);

        .back {
          width: pr(110);
          height: pr(110);
          background: #fff;
          border-radius: 50%;
          margin-right: pr(200);

          img {
            width: pr(58);
            height: pr(58);
          }
        }

        .again-start {
          border-radius: pr(100);
          background: #fff;
          width: pr(315);
          height: pr(110);
          cursor: pointer;

          .icon {
            width: pr(58);
            height: pr(58);

            .abc-img {
              width: 100%;
              height: 100%;
            }
          }

          .start-game {
            font-size: pr(36);
            color: #000;
            margin-left: pr(10);
          }
        }

      }

    }

  }

</style>
