<template>
  <div class="game-home">

    <!--游戏首页浮层-->
    <div v-if="homeMark" class="start abc-flex-y-start">
      <div class="title">点一点</div>

      <div class="btn-group abc-flex-y-start">
        <div @click="rankShow" class="ranking-icon abc-img"><img src="../assets/img/home/ranking.png"></div>

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

        <div @click="homeMusicControl" class="music-part abc-flex-y-center">
          <div class="abc-img"><img :class="[{'move': musicMark}]" src="../assets/img/home/home_music.png"/></div>
          <div class="control"><img :class="[{'close': !musicMark}]" src="../assets/img/home/open_control.png"></div>
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
    <div v-if="resultShow" class="game-result abc-flex-y-center">
      <div class="result-content abc-flex-y-start">
        <div class="title">恭喜您</div>

        <div class="grade-title">本次所用时间</div>

        <div class="time-grade">
          {{ gameResult && gameResult.timeResult ? gameResult.timeResult.split(':')[0] : '-' }}分
          {{ gameResult && gameResult.timeResult ? gameResult.timeResult.split(':')[1] : '-' }}秒
          {{ gameResult && gameResult.timeResult ? gameResult.timeResult.split(':')[2] : '-' }}毫秒
        </div>

        <div class="history-grade abc-flex-x-center">
          <div>历史最高：</div>
          <div>{{ meData &&  meData.length && meData[0].use_time && meData[0].use_time != 'null' ?
            meData[0].use_time.split(':')[0] + '分' + meData[0].use_time.split(':')[1] + '秒' + meData[0].use_time.split(':')[2] + '毫秒' : '-' }}</div>
        </div>

        <div @click="look" class="look-more abc-flex-x-center">
          <div class="sub-title">查看全部排行</div>
          <div class="abc-img"><img src="../assets/img/home/right.png"/></div>
        </div>

      </div>

      <div class="word-mean abc-flex-y-center">
        <div class="mean-item abc-flex-x-between" v-for="item in originData">
          <div>{{ item.word || '' }}</div>
          <div class="cn">{{ item.cn || '' }}</div>
        </div>
      </div>

      <div @click="startGameAgain" v-if="!homeRanking" class="again-start abc-flex-x-center">
        <div class="icon"><div class="abc-img"><img src="../assets/img/home/refresh.png"></div></div>
        <div class="start-game">再玩一局</div>
      </div>

    </div>

    <!--排行榜浮层-->
    <div v-if="rankingList" class="loadingbig abc-flex-y-center">
        <div class="title">全球排行榜</div>

        <div class="list abc-flex-y-center">
          <div class="refresh-notice"><div class="notice-content">每周一凌晨刷新</div></div>
          <div v-for="(item, index) in rankingData" class="item abc-flex-x-center">
            <div class="order">{{ (index + 1) }}</div>
            <div class="name">{{ item.nickname || '' }}</div>
            <div class="time">{{ item.use_time && item.use_time != 'null' ?
              item.use_time.split(':')[0] + '分' + item.use_time.split(':')[1] + '秒' + item.use_time.split(':')[2] + '毫秒' : '-' }}</div>
          </div>
        </div>

        <div v-if="meData.length <= 1" class="me-grade abc-flex-x-center">
          <div class="order">{{ meData &&  meData.length ? meData[0].ranking : '-' }}</div>
          <div class="name">{{ meData &&  meData.length ? meData[0].nickname : '' }}</div>
          <div class="time">{{ meData &&  meData.length && meData[0].use_time && meData[0].use_time != 'null' ?
            meData[0].use_time.split(':')[0] + '分' + meData[0].use_time.split(':')[1] + '秒' + meData[0].use_time.split(':')[2] + '毫秒' : '-' }}</div>

          <div class="me-icon abc-img"><img src="../assets/img/home/record.png"></div>
        </div>

        <div class="btn-group abc-flex-x-between">
          <div @click="backLast" class="back abc-flex-x-center"><img src="../assets/img/home/back.png"></div>

          <div @click="startGameAgain" v-if="!homeRanking" class="again-start abc-flex-x-center">
            <div class="icon"><div class="abc-img"><img src="../assets/img/home/refresh.png"></div></div>
            <div class="start-game">再玩一局</div>
          </div>

        </div>

    </div>

    <!--游戏开始-->
    <!--<div class="bigdiv" :style="{display: 'none', 'background-image': 'url(' + bgResource + ')'}">-->
    <div class="bigdiv" :style="{display: 'none'}">
      <div v-if="gameStartMark" @click="musicControl" :class="['music-control', {'open': musicMark, 'close': !musicMark}]"></div>

      <div class="ledoucontent">

      </div>

      <!--<div v-if="gameStartMark" class="gamenumber">0</div>-->

      <div v-if="gameStartMark" class="show-board">
        <div class="board-bg abc-img"><img src="../assets/img/home/sun.png"></div>
        <div class="hand-deriction abc-img"><img src="../assets/img/home/deriction_up.png"></div>

        <div v-for="item in wordArr" class="board-item abc-flex-x-between">
          <div class="item-title">
            <span v-for="itemSon in item" class="item-word">{{ itemSon }}</span>
          </div>
          <div class="item-icon abc-img"><img src="../assets/img/home/yes.png"></div>
        </div>

      </div>

    </div>

    <!--音乐（音效）资源-->
    <audio class="click-audio" src="/static/mp3/click.mp3" style="display: none;"></audio>
    <audio class="click-audio-Bomb" src="/static/mp3/blast.mp3" style="display: none;"></audio>
    <audio class="audio-bg" src="/static/mp3/bg_2.mp3" loop autoplay="autoplay" style="display: none;"></audio>
    <!--<audio class="audio-bg" src="/static/mp3/bg_1.mp3" loop style="display: none;"></audio>-->
    <!--<audio class="audio-bg" src="/static/mp3/bg_3.mp3" loop autoplay="autoplay" style="display: none;"></audio>-->

  </div>

</template>

<script>
  import { mapState } from "vuex"
  import moment from 'moment'
  import MobileDetect from'mobile-detect'
  import { addUser, updateUser, getUserList, getRandomWords } from '@/api/chooseWord'

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

  // Qos打点
  import log from '@/api/log'

  export default {
    name: 'Home',
    data(){
      return {
        wordCount: 3, // 从单词库中随机生成的单词的数量，支持后续修改.
        musicMark: false, // 声音的开关(默认关闭)

        rankingList: false, // 排行榜弹窗标识(弹窗)
        resultShow: false, // 游戏结果显示(弹窗)
        homeMark: true, // home弹窗显示标识(弹窗)
        nicknameMark: false, // 昵称弹窗显示标识(弹窗)

        gameStartMark: false, // 游戏开始标识，游戏总开关(游戏控制步骤 =》 1：此开关打开；2：add方法调用；3：clearAdd方法结束游戏)

        originData: [], // 随机单词的原始数据，包好中文意义
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
        bgTimer: 30 * 1000, // 每半分钟切换一次背景（时间）（已废弃）

        homeRanking: false, // 首页点击排行榜标识
        registerMark: true, // 禁止重复注册标识
      }
    },
    computed: {
      ...mapState([
        'test' // 当前选中的tab
      ]),
    },
    created () {
//      this.changeBg() // 切换背景定时器(已废弃)

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
      async start () {
        let that = this // 外部vue对象

        $(".bigdiv").show();
        $("body").addClass("body");

        game.add() // 游戏开始方法
        setTimeout(() => {
          if (that.gameStartMark) return

          // 清除添加字母方法的定时
          game.clearAdd()
        }, 5000)

        // 从单词库中随机生成的三个不重复的单词
        try {
          const para = 'count=' + this.wordCount
          const dataList = await getRandomWords(para)

          // 将原始数据暂存，用户结果展示
          const data = dataList.data ? dataList.data : []
          this.originData = data

          // 取word字段
          const wordArr = dataList.data.map(item => item.word)
          this.wordArr = wordArr // 赋值随机的单词
        } catch (error) {
          console.log(error)
        }


      },

      // 声音控制方法
      musicControl () {

        let bgAudio = $(".audio-bg")[0];

        if (this.musicMark) {
          // 停止背景音乐
          bgAudio.pause(); // 停止播放背景音乐
          bgAudio.currentTime = 0.0 // 背景音乐时间重置

          this.musicMark = false

        } else {
          // 播放背景音乐
          bgAudio.play();

          this.musicMark = true

        }

      },

      // 首页声音开关
      homeMusicControl () {
        this.musicMark = !this.musicMark
      },

      // 首页查看排行榜方法
      rankShow () {
        this.homeRanking = true // 首页点击排行榜标识
        this.homeMark = false

        this.look() // 调用显示榜单方法

        // Qos数据统计
        log.log({
          event: 'ABC_GAME_CLICKONECLICK',
          subEvent: 'CLICK_LOOKRANKING_HOME',
          extra: {
            msg: window.localStorage.getItem('abcGame_nickname') || '无注册用户',
            message: new Date().getTime()
          }
        });
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

          // 禁止重复注册
          if (!this.registerMark) return
          this.registerMark = false

          try {
            const dataList = await addUser(data)

            window.localStorage.setItem('abcGame_nickname', nickname) // 将本次nickname加入到locaStorage中
            this.nicknameMark = false
            this.gameBegin() // 启动游戏

            // Qos数据统计
            log.log({
              event: 'ABC_GAME_CLICKONECLICK',
              subEvent: 'CLICK_NEWUSER_REGISTER',
              extra: {
                msg: nickname,
                message: new Date().getTime()
              }
            });

          } catch (error) {
            this.registerMark = true // 恢复重复注册开关

            console.log(error)
          }

        } else {
          console.log('未填写昵称')
        }

      },

      // 游戏启动
      gameBegin () {
        this.gameStartMark = true

        // 数值主进度
        this.gameProgressArr = this.wordArr.reduce((prev, next) => prev + next)
        this.wordAllLength = this.gameProgressArr.length
        this.gameProgressLast = this.gameProgressArr.slice()

        // 背景音乐
        if (this.musicMark) {
          let bgAudio = $(".audio-bg")[0];
          bgAudio.play(); // 播放背景音乐
        }

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
        if (this.homeRanking) {
          this.rankingList = false
          this.homeMark = true

          this.homeRanking = false // 首页点击排行榜标识

        } else {
          this.resultShow = true
          this.rankingList = false
        }

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

          // 取历史最好成绩方法
          this.getBestGrade()

          // Qos数据统计
          log.log({
            event: 'ABC_GAME_CLICKONECLICK',
            subEvent: 'CLICK_UPDATE_GRADE',
            extra: {
              msg: nickname,
              message: new Date().getTime() + ' , ' + use_time
            }
          });

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

      // 取历史最好成绩
      async getBestGrade () {
        const nickname = window.localStorage.getItem('abcGame_nickname') || ''
        const para = nickname ? 'nickname=' + nickname : ''

        try {
          const dataList = await getUserList(para)

          const meDataResult = dataList.data && dataList.data.length ? dataList.data : []
          this.meData = meDataResult // 填充个人排名数据

          // 展示成绩板
          doc.vueObj.resultShow = true

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
    imageBlast: new Image(),
    imageWord: new Image(),

    init (that) {
      this.vueObj = that

      this.helper()
      this.bind()
    },
    helper () {
      // 预加载炸弹爆炸效果和字母点击效果的图片.
      doc.imageBlast.src = img_z;
      doc.imageWord.src = img_xs;

    },
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
//        doc.imagestest.src = img_z;
        doc.imageBlast.width=wid;
        doc.imageBlast.height=wid;
        $(event.currentTarget).attr('width',wid);
        $(event.currentTarget).attr('height',wid);
        $(event.currentTarget).get(0).getContext("2d").drawImage(doc.imageBlast, 0, 0,wid,wid);
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

//        doc.imagestest.src = img_xs;
        doc.imageWord.width=wid;
        doc.imageWord.height=wid;
        $(event.currentTarget).attr('width',wid);
        $(event.currentTarget).attr('height',wid);
        $(event.currentTarget).get(0).getContext("2d").drawImage(doc.imageWord, 0, 0,wid,wid);
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
        if (index == doc.vueObj.wordArr[0].length - 1) {
          if ( type == 'add') {
            doc.stageJump(0) // 第一排整行跳动跳动
          } else {
            $('.item-icon').eq(0).removeClass('selected')
          }

        }

      }
      if (index >= doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length - 1) {
        $('.item-icon').eq(0).addClass('selected')
        $('.item-icon').eq(1).addClass('selected')

        // 整排跳动（阶段性晋级）
        if (index == doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length - 1) {
          if ( type == 'add') {
            doc.stageJump(1) // 第二排整行跳动跳动
          } else {
            $('.item-icon').eq(1).removeClass('selected')
          }

        }

      }
      if (index >= doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length + doc.vueObj.wordArr[2].length - 1) {
        $('.item-icon').addClass('selected')

        // 整排跳动（阶段性晋级）
        if (index == doc.vueObj.wordArr[0].length + doc.vueObj.wordArr[1].length + doc.vueObj.wordArr[2].length - 1) {
          if ( type == 'add') {
            doc.stageJump(2) // 第三排整行跳动跳动
          }

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

        // 停止背景音乐
        let bgAudio = $(".audio-bg")[0];
        bgAudio.pause(); // 停止播放背景音乐
        bgAudio.currentTime = 0.0 // 背景音乐时间重置

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

      .btn-group {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: pr(540);

        .ranking-icon {
          position: absolute;
          top: pr(0);
          left: 50%;
          margin-left: pr(-60);
          width: pr(120);
          height: pr(120);

          -webkit-animationn: rankingAni 4s infinite;
          -moz-animation: rankingAni 4s infinite;
          -o-animation: rankingAni 4s infinite;
          animation: rankingAni 4s infinite;

          @keyframes rankingAni{
            0% {
              top: pr(0);
            }
            5% {
              top: pr(-20);
            }
            10% {
              top: pr(0);
            }
            12% {
              -webkit-transform: rotate(0);
              -moz-transform: rotate(0);
              -ms-transform: rotate(0);
              -o-transform: rotate(0);
              transform: rotate(0);
              top: pr(0);
            }
            15% {
              -webkit-transform: rotate(-20deg);
              -moz-transform: rotate(-20deg);
              -ms-transform: rotate(-20deg);
              -o-transform: rotate(-20deg);
              transform: rotate(-20deg);
              top: pr(0);
            }
            21% {
              -webkit-transform: rotate(20deg);
              -moz-transform: rotate(20deg);
              -ms-transform: rotate(20deg);
              -o-transform: rotate(20deg);
              transform: rotate(20deg);
              top: pr(0);
            }
            24% {
              -webkit-transform: rotate(0);
              -moz-transform: rotate(0);
              -ms-transform: rotate(0);
              -o-transform: rotate(0);
              transform: rotate(0);
              top: pr(0);
            }
            100% {
              top: pr(0);
            }
          }

        }

        .btn {
          position: absolute;
          top: pr(130);
          left: 50%;
          margin-left: pr(-202.5);
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
          top: pr(250);
          left: 50%;
          margin-left: pr(-202.5);
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

        .music-part {
          position: absolute;
          right: pr(20);
          bottom: pr(20);
          width: pr(120);
          height: pr(120);

          .abc-img {
            width: pr(60);
            height: pr(60);
            margin-bottom: pr(6);

            img{
              &.move {
                -webkit-animationn: imgMove 4s infinite;
                -moz-animation: imgMove 4s infinite;
                -o-animation: imgMove 4s infinite;
                animation: imgMove 4s infinite;

                @keyframes imgMove{
                  0% {
                    -webkit-transform: rotate(0);
                    -moz-transform: rotate(0);
                    -ms-transform: rotate(0);
                    -o-transform: rotate(0);
                    transform: rotate(0);

                    opacity: 1;
                  }
                  50% {
                    -webkit-transform: rotate(360deg);
                    -moz-transform: rotate(360deg);
                    -ms-transform: rotate(360deg);
                    -o-transform: rotate(360deg);
                    transform: rotate(360deg);

                    opacity: .5;
                  }
                  100% {
                    -webkit-transform: rotate(0);
                    -moz-transform: rotate(0);
                    -ms-transform: rotate(0);
                    -o-transform: rotate(0);
                    transform: rotate(0);

                    opacity: 1;
                  }
                }
              }
            }
          }

          .control {
            position: relative;
            width: pr(87.5);
            height: pr(35);
            border-radius: pr(20);
            overflow: hidden;

            img {
              position: relative;
              width: pr(140);
              height: pr(35);
              left: 0;

              @extend .trans;

              &.close {
                left: pr(-52.5);
              }
            }
          }
        }

      }

    }

    // 游戏结果弹窗
    .game-result {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;

      .result-content {
        position: relative;
        width: pr(550);
        height: pr(550);
        background: rgba(155, 155, 155, 0.7);
        color: #fff;
        box-shadow: pr(5) pr(5) pr(10) rgba(255, 255, 255, 0.6);
        border-radius: pr(10);

        .title {
          position: absolute;
          top: pr(-40);
          left: 50%;
          margin-left: pr(-89.5);
          width: pr(179);
          height: pr(83);
          line-height: pr(83);
          text-align: center;
          font-size: pr(36);
          background: url("../assets/img/home/result-title-bg.png") no-repeat center / 100% 100%;
        }

        .grade-title {
          font-size: pr(48);
          margin-top: pr(100);
          margin-bottom: pr(20);
        }

        .time-grade {
          font-size: pr(60);
          color: #7ED321;
          margin-bottom: pr(60);
        }

        .history-grade {
          font-size: pr(32);
        }

        .look-more {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: pr(110);
          background: rgba(0, 0, 0, 0.1);

          .sub-title {
            font-size: pr(36);
          }
          .abc-img {
            width: pr(45);
            height: pr(45);
            margin-left: pr(10);
          }

        }

      }

      .word-mean {
        position: relative;
        width: pr(550);
        height: pr(270);
        background: rgba(255, 255, 255, 0.6);
        color: #fff;
        margin-top: pr(40);
        margin-bottom: pr(40);
        border-radius: pr(10);

        .mean-item {
          width: pr(480);
          margin-bottom: pr(10);

          & > div {
            font-size: pr(36);
            color: #000;
            font-weight: 600;
          }

          & > .cn {
            width: pr(90);
            text-align: left;
          }

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
        /*background: rgba(255, 255, 255, 0.7);*/
        /*background: url("../assets/img/home/sun.png") no-repeat 100px 100px / 100% auto;*/
        padding: 0 pr(5);

        .board-bg {
          position: absolute;
          top: pr(-90);
          left: pr(-90);
          width: pr(360);
          height: pr(360);

          -webkit-animationn: board 4s infinite;
          -moz-animation: board 4s infinite;
          -o-animation: board 4s infinite;
          animation: board 4s infinite;

          @keyframes board{
            0% {
              opacity: .5;
            }
            50% {
              opacity: .9;
            }
            100% {
              opacity: .5;
            }
          }
        }

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
            0% {
              bottom: pr(-120);
            }
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
            opacity: 0;

            &.selected {
              display: block;
            }
          }
        }
      }

      .music-control {
        position: absolute;
        top: pr(5);
        right: pr(5);
        width: pr(70);
        height: pr(70);

        &.open {
          background: url("../assets/img/home/music_open.png") no-repeat left top / 100% auto;
        }
        &.close {
          background: url("../assets/img/home/music_close.png") no-repeat left top / pr(50) auto;
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
        height: pr(800);
        background: rgba(58, 56, 59, 0.7);
        margin-top: pr(15);

        .refresh-notice {
          width: 100%;
          height: pr(25);
          text-align: left;
          font-size: pr(24);
          padding-left: pr(70);
          margin-bottom: pr(10);

          .notice-content {
            position: relative;
            top: pr(-12);
          }
        }

        .item {
          font-size: pr(36);
          height: pr(60);
          margin-bottom: pr(10);

          .order {
            width: pr(50);
            margin-right: pr(30);
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
        position: relative;
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

        .me-icon {
          position: absolute;
          right: pr(-40);
          top: pr(-10);
          width: pr(100);
          height: pr(85);
        }

      }

      .btn-group {
        margin-top: pr(15);
        width: pr(650);
        height: pr(125);
        padding: 0 pr(10);

        .back {
          width: pr(110);
          height: pr(110);
          background: #fff;
          border-radius: 50%;

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
