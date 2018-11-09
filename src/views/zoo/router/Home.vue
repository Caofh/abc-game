<template>
  <div :class="['zoo-home']">
    <!--<div class="title"><img src="../assets/img/home/zoo-title.png"></div>-->

    <!--首页-->
    <div v-if="homeMark" class="home abc-flex-y-center">
    <!--<div v-if="false" class="home abc-flex-y-center">-->
      <div class="base-body abc-flex-y-center">
        <div class="home-title">
          找一找
        </div>

        <div @click="click">
          click me
        </div>

        <!--关卡-->
        <div class="checkpointNode">
          <div>
            <div @click="chooseTheme(1)">一</div>

            <div v-if="theme == 1" class="yes abc-img" style="width: 30px;height: 30px;"><img src="../assets/img/home/tip_yes.png"></div>
          </div>
          <div>
            <div @click="chooseTheme(2)">二</div>

            <div v-if="theme == 2" class="yes abc-img" style="width: 30px;height: 30px;"><img src="../assets/img/home/tip_yes.png"></div>

            <div v-if="zooAuthLevel < 2" class="cover"></div>
          </div>
        </div>

        <div @click="rankingShow" class="ranking abc-img">
          <img src="../assets/img/home/ranking.png">
        </div>

        <div @click="homeStart" class="btn">
          Start
        </div>

      </div>
    </div>

    <!--输入昵称浮层-->
    <div v-if="nicknameMark" class="nickname-par abc-flex-y-center">
    <!--<div v-if="false" class="nickname-par abc-flex-y-center">-->
      <div class="content abc-flex-x-center">
        <div class="content-nickname abc-flex-y-center"><input @input="nicknameInput" v-model="nickname" type="text" placeholder="请填写昵称"></div>
        <div @click="nickGo" class="btn">Go</div>

        <div v-if="nickname && tipMark" class="tip abc-img"><img src="../assets/img/home/tip_yes.png"></div>
        <div v-if="nickname && !tipMark" class="tip abc-img"><img src="../assets/img/home/tip_no.png"></div>
      </div>
    </div>

    <!--排行榜-->
    <div v-if="rankingMark" class="ranking-par abc-flex-x-center">
    <!--<div v-if="true" class="ranking-par abc-flex-x-center">-->

      <div @click="rankingBack" class="back abc-img">
        <img src="../assets/img/home/back.png">
      </div>

      <div class="ranking-me abc-flex-y-center">
        <div class="congratulation abc-img"><img src="../assets/img/home/congratulation.png"></div>

        <div class="money abc-flex-x-start">
          <div class="abc-img"><img src="../assets/img/home/money.png"></div>
          <div class="num">{{ rankingDataMe && rankingDataMe[0] && rankingDataMe[0].time_stamp ? rankingDataMe[0].time_stamp : '-' }}</div>
        </div>

        <div class="rank abc-flex-x-start">
          <div class="abc-img"><img src="../assets/img/home/ranking_icon.png"></div>
          <div class="num">{{ rankingDataMe && rankingDataMe[0] && rankingDataMe[0].ranking ? rankingDataMe[0].ranking : '-' }}</div>
        </div>
      </div>

      <div class="ranking-data abc-flex-y-center">
        <div class="ranking-data-title">全球前五</div>

        <div class="real-info abc-flex-y-start">
          <div v-for="(item, index) in rankingData" class="item abc-flex-x-center">
            <div class="order">{{ (index + 1) }}</div>
            <div class="name abc-ellipsis-single">{{ item.nickname || '' }}</div>
            <div class="money-num abc-flex-x-start">
              <img src="../assets/img/home/money.png">
              <div class="money-info">{{ item.time_stamp || '' }}</div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!--任务描述-->
    <div v-if="beforeGameMark" class="before-start abc-flex-y-center">
      <div class="base-body abc-flex-y-center">
        <div class="content">
          Please select <span class="point">{{ animalName || '' }}</span> in
          <span class="point">{{ second || 0 }}</span> seconds
        </div>

        <div @click="startGame" class="btn">
          Start
        </div>
      </div>
    </div>

    <!--游戏关卡提示-->
    <div v-if="gamingMark" class="before-start abc-flex-y-center">
      <div class="base-body abc-flex-y-center">
        <div class="point-title">{{progress || 1}}/10</div>
        <div class="content">
          Please select <span class="point">{{ animalName || '' }}</span> in
          <span class="point">{{ second || 0 }}</span> seconds
        </div>

        <div @click="continueGame" class="btn">
          Go
        </div>
      </div>
    </div>

    <!--游戏失败提示-->
    <div v-if="gameFailMark" class="before-start abc-flex-y-center">
      <div class="base-body abc-flex-y-center">
        <div class="point-title">闯关失败，您本次游戏共获得{{moneyCount || 0}}个金币</div>

        <div class="point-title-all">总金币数：<span class="count">{{moneyAll || 0}}</span></div>

        <div class="abc-flex-x-center">
          <div @click="restartGame" class="btn">
            Restart
          </div>
          <div @click="rankingOpen" class="btn">
            排行榜
          </div>
        </div>
      </div>
    </div>

    <!--游戏成功提示-->
    <div v-if="gameSuccessMark" class="before-start abc-flex-y-center">
      <div class="base-body abc-flex-y-center">
        <div class="point-title">闯关成功，您本次游戏共获得{{moneyCount || 0}}个金币</div>

        <div class="point-title-all">总金币数：<span class="count">{{moneyAll || 0}}</span></div>

        <div class="abc-flex-x-center">
          <div @click="restartGame" class="btn">
            Restart
          </div>
          <div @click="rankingOpen" class="btn">
            排行榜
          </div>
        </div>
      </div>
    </div>

    <!--倒计时及金币数量-->
    <div v-if="!homeMark && !rankingMark" class="money-par abc-flex-x-center">
      <div :class="['time', {'hidden': !gradeMark, 'move': gradeMark}]">{{second || 0}}</div>

      <div class="grade-count abc-flex-x-center">
        <div class="abc-img"><img src="../assets/img/home/money.png"></div>
        <div>{{ moneyCount || 0 }}</div>
      </div>
    </div>

    <!--随机的动物图片-->
    <div v-if="gradeMark" class="real-content">
      <div @click="chooseAnimal(item, index)" v-for="(item, index) in animalData" :class="['abc-img', {'selected': item.selected}]"
           :style="{'left': item.x + 'px', 'top': item.y + 'px', '-webkit-transform': 'rotate('+item.deg+'deg)', 'transform': 'rotate('+item.deg+'deg)'}">
        <img :src="item.src">
      </div>
    </div>



    <!--音乐（音效）资源-->
    <audio class="money-audio" src="/static/mp3/zoo/moneyNew.mp3" style="display: none;"></audio>
    <audio class="time-audio" src="/static/mp3/zoo/timeMove.mp3" style="display: none;"></audio>

  </div>

</template>

<script>
  import { mapState } from "vuex"
//  import moment from 'moment'
  import { addUser, updateUser, getUserList, getRandomWords } from '@/api/zoo'

  import getRandom from '../assets/js/getRandomArr'
  import { checkpoint, animalNameList } from '../assets/js/fun'

  import { wxShare } from '@/api/zoo'

  // 自适应，适配恒屏游戏js.
  import '@/assets/js/m_orientation'

  export default {
    name: 'Home',
    data(){
      return {
        clientWidth: '', //设备宽度
        clientHeight: '', //设备高度
        title: {}, // 动物园标题的位置及大小
        usedArea: {}, // 真正内容的可用坐标范围
        nickname: '', // 用户昵称
        tipMark: true, // 名称是否重复标识

        progress: '', // 游戏主进度(关数，共12关)
        animalName: '', // 当前任务的动物名称
        animalCount: '', // animal数量
        second: '', // 游戏读秒
        moneyAll: 0, // 当前用户的历史总金币数
        moneyCount: 0, // 金币数
        animalData: [], // 动物数据
        blackList: [], // 动物图片黑名单

        homeMark: true, // 首页弹窗标识
        nicknameMark: false, // 昵称弹窗标识
        rankingMark: false, // 排行榜标识
        beforeGameMark: true, // 任务描述标识
        gamingMark: false, // 游戏过程中，下一关的文案提示
        gradeMark: false, // 成绩显示标识标识
        gameFailMark: false, // 闯关失败标识
        gameSuccessMark: false, // 闯关成功标识
        registerMark: true, // 禁止重复注册标识
        resultMark: false, // 是从闯关失败弹窗->排行榜弹窗的标识（区分从首页进入）

        loopTime: '', // 倒计时定时变量

        rankingData: [], // 排行榜数据
        rankingDataMe: [], // 排行榜的个人数据

        theme: 1, // 用户自主选择的主题
        themeLength: 2, // 主题数量
        zooAuthLevel: 1, // 当前用户解锁的权限等级(主题)
      }
    },
    computed: {
      ...mapState([
        'resourceUrl' // 静态资源路径，服务器静态资源的host
      ]),

    },
    created () {
      /*
        积分规则：
        1.   5s内选出正确动物（动物数10）；  5s内选出正确动物（动物数10）；  5s内选出正确动物（动物数20）；  5s内选出正确动物（动物数20）；
             5s内选出正确动物（动物数24）；  5s内选出正确动物（动物数24）；  3s内选出正确动物（动物数20）；  3s内选出正确动物（动物数20）；
             3s内选出正确动物（动物数24）；  3s内选出正确动物（动物数24）；  2s内选出正确动物（动物数24）；  1s内选出正确动物（动物数24）；

             共12关：没关过了依次获得金币数：1 + 1 + 2 + 2 + 3 + 3 + 4 + 4 + 5 + 5 + 10 + 20

             最终排行榜以金币总是制作排行榜（用不清空）
       */

      // 首先从localStorage中获取当前用户的权限等级
      this.zooAuthLevel = localStorage.getItem('zooAuthLevel') || 1

    },
    watch: {

    },
    async mounted () {
//      alert(location.href.split('#')[0])
//      return false

      // 初始化
      this.start()

      // doc操作初始化
      doc.init(this)



      let apiList = [
        'checkJsApi',
        'openLocation',
        'getLocation',
        'onMenuShareTimeline',
        'onMenuShareQZone',
        'onMenuShareQQ',
        'onMenuShareAppMessage',
        'updateAppMessageShareData',
        'updateTimelineShareData',
      ];

//      const res = await wxShare(encodeURIComponent(location.href+'&wxBack=true'))
      const res = await wxShare(encodeURIComponent(location.href+'&wxBack=true'))

      console.log(res)

      wx.config({
        debug:true,
        //debug: !/^www\.sayabc\.com$/i.test(location.hostname), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.app_id, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonce_str, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: apiList
      })

    },
    methods: {
      click () {


        this.share({})

      },

      share:function(opt){
        var shareConfig = {
          'title': opt.title || 'SayABC体验课超值来袭！',
          'desc': opt.content || '100%纯正欧美外教，1对4在线少儿英语课堂，快来抢购吧～',
          'imgUrl': opt.imgUrl || 'https://static.sayabc.com/parentEnd/wx_logo2.png',
          'link' : opt.link || location.href,
          'shareSuccess': opt.shareSuccess || function () {

            alert(123)

          },
        };
        console.log('shareConfig',shareConfig);
        wx.ready(function() {
          console.log("errorToast(\"获取分享参数完成\",1);")

          //分享给朋友
            wx.updateAppMessageShareData({
              title: shareConfig.title, // 分享标题
              desc: shareConfig.desc, // 分享描述
              link: shareConfig.link.replace(/(info_id=\d+&)|(info_id=\d+)/, ""), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareConfig.imgUrl, // 分享图标
              success: shareConfig.shareSuccess // 分享朋友成功之后的回调函数
          });


          //分享朋友圈
          wx.updateTimelineShareData({
            title: shareConfig.title, // 分享标题
            link: shareConfig.link.replace(/(info_id=\d+&)|(info_id=\d+)/, ""), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareConfig.imgUrl, // 分享图标
            // success: function() {
            //     // 用户确认分享后执行的回调函数
            //     //_this.wxAdd();
            // }
            success: shareConfig.shareSuccess // 分享朋友圈成功之后的回调函数
          });
        });
      },





      // 页面初始化(模拟背景闪屏效果)
      async start () {
        // 强制横屏
        this.orientation()

        // 获取zoo的title位置及大小
        this.getTitle()

        // 配置游戏关卡:第一关
        this.confGame(1)

      },

      // 用户自主选择主题
      chooseTheme (num) {
        this.theme = num
      },

      homeStart () {
        this.homeMark = false

        const nickname = window.localStorage.getItem('zooNickname')
        if (!nickname) {
          // 开启昵称浮层
          this.nicknameMark = true
        } else {
          // 请求当前数据
          this.getRankingInfo()

        }

      },

      // 首页点击排行榜
      rankingShow () {
        this.homeMark = false
        this.rankingMark = true

        this.getRankingInfo() // 请求排行榜信息

      },

      // 挑战失败弹窗点击排行榜
      rankingOpen () {
        this.rankingMark = true
        this.resultMark = true

        this.getRankingInfo() // 请求排行榜信息
      },

      // 排行榜返回
      rankingBack () {

        if (this.resultMark) {
          this.rankingMark = false
          this.resultMark = false

        } else {
          this.homeMark = true
          this.rankingMark = false
        }

      },

      // 请求排行榜信息
      async getRankingInfo () {
        try {
          const meName = window.localStorage.getItem('zooNickname')

          const para = 'start=0&count=5'
          const paraMe = 'nickname='+meName+''

          // 请求排行榜信息
          Promise.all([getUserList(para), getUserList(paraMe)]).then((data) => {
//            console.log(data)
            const dataAll = data[0] || ''
            const dataMe = data[1] || ''

            this.rankingData = dataAll.data || []
            this.rankingDataMe = dataMe.data || []

            // 存储当前用户的总金币数
            this.moneyAll = this.rankingDataMe && this.rankingDataMe.length ? this.rankingDataMe[0].time_stamp : 0

          })

        } catch (error) {
          console.log(error.message || '')

        }

      },

      // 昵称input事件
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
          console.log(error)
        }

      },
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

            window.localStorage.setItem('zooNickname', nickname) // 将本次nickname加入到locaStorage中
            window.localStorage.setItem('zooAuthLevel', 1) // 将本次权限等级加入localStorage

            // 关闭昵称浮层
            this.nicknameMark = false

            // 请求当前数据
            this.getRankingInfo()

          } catch (error) {
            this.registerMark = true // 恢复重复注册开关

            console.log(error)
          }

        } else {
          console.log('未填写昵称')
        }

      },

      // 开始游戏
      startGame () {
        this.beforeGameMark = false
        this.gradeMark = true

        // 倒计时计时
        this.moveTime()

      },

      // 继续游戏
      continueGame () {
        this.gamingMark = false
        this.gradeMark = true

        // 倒计时计时
        this.moveTime()
      },

      // 失败重新开始游戏
      restartGame () {
        this.beforeGameMark = true
        this.gameSuccessMark = false
        this.homeMark = true

        // 重置分数
        this.moneyCount = 0

        // 配置游戏关卡:第一关
        this.confGame(1)

      },

      // 配置游戏关卡初始化(progress:第几关)
      confGame (progress) {
//        console.log(progress)

        // 重置相关变量
        this.progress = progress, // 游戏主进度(关数，共12关)
        this.animalName = '', // 当前任务的动物名称
        this.animalData = [], // 动物数据
        this.blackList = [], // 动物图片黑名单
        this.gradeMark = false // 成绩显示标识标识
        this.gameFailMark = false // 闯关失败标识

        // 获取当前关卡配置
        const gameConfig = checkpoint(progress)
        this.animalCount = gameConfig.animalCount
        this.second = gameConfig.second

        // 渲染随机动图图片
        this.renderImg()

      },

      // 点击动物方法（正确或错误）
      chooseAnimal (item, index) {
        console.log(item)
        const name = item.animalName || ''
//        console.log(this.animalName)

        console.log(name)
        console.log(this.animalName)

        if (name === this.animalName) {
          console.log('答对了')

          clearInterval(this.loopTime)

          console.log('progress', this.progress)
//          if (this.progress < 10) {
          if (this.progress < 3) {

            // 启动金币音效
            $('.money-audio')[0].play()
            // 关闭倒计时音效
            this.closeTimeMoveBg()

            // 根据当前通关数，设置金币
            const moneyCount = this.setMoney(this.progress)
            this.moneyCount = moneyCount

            // 配置游戏关卡
            this.progress++
            this.confGame(this.progress)

            // 显示过关提示
            this.gamingMark = true

          } else {
//            console.log('超过12关')

            // 启动金币音效
            $('.money-audio')[0].play()
            // 关闭倒计时音效
            this.closeTimeMoveBg()

            // 根据当前通关数，设置金币
            const moneyCount = this.setMoney(this.progress)
            this.moneyCount = moneyCount

            clearInterval(this.loopTime)

            // 闯关成功弹窗
            this.gameSuccessMark = true

            // 提交成绩
            this.updateGrade()

            // 闯关成功，主题自动跳转到下一个.
            if (this.theme < this.themeLength) {
              this.theme++

              const nowThemeLevel = localStorage.getItem('zooAuthLevel') || 1
              if (this.theme > nowThemeLevel) {
                this.zooAuthLevel = this.theme
                localStorage.setItem('zooAuthLevel', this.theme)
              }

            } else {
              alert('敬请期待下一主题...')
            }


          }

        } else {
//          console.log('答错了')

          this.animalData[index].selected = true
          setTimeout(() => {
            this.animalData[index].selected = false
          }, 1000)

        }

      },

      // 设置金币数
      setMoney (progress) {
        const progressNew = parseInt(progress)
        let moneyCount = 0

        switch(progressNew) {
          case (1): moneyCount = 1; break;
          case (2): moneyCount = 2; break;
          case (3): moneyCount = 3; break;
          case (4): moneyCount = 5; break;
          case (5): moneyCount = 7; break;
          case (6): moneyCount = 10; break;
          case (7): moneyCount = 13; break;
          case (8): moneyCount = 17; break;
          case (9): moneyCount = 21; break;
          case (10): moneyCount = 26; break;
          case (11): moneyCount = 36; break;
          case (12): moneyCount = 56; break;
        }

        return moneyCount

      },

      // 渲染随机动物图片
      renderImg () {
        let aniArr = []
        const randomArr = getRandom.getNorepeatArr(this.animalCount, [1, 20])
        // 随机生成当前需选择的动物文案
        const ranIndex = getRandom.getNorepeatArr(1, [0, (this.animalCount)])
        this.animalName = animalNameList(randomArr[ranIndex], this.theme)

//        console.log(randomArr[ranIndex])
//        console.log(this.animalName)

        for (let i = 0; i < this.animalCount; i++) {
          // 循环动物图片静态资源
          let imgResource = require(`../assets/img/home/icon_${this.theme}/icon_${randomArr[i]}.png`)

          // 去重覆盖动物坐标问题.
          let randomX = ''
          let randomY = ''
          for (let i = 0; true; i++) {
            let currNumX = parseInt(getRandom.getNorepeatArr(1, [0, (this.clientWidth - 80)] )[0])
            let currNumY = parseInt(getRandom.getNorepeatArr(1, [0, (this.clientHeight - 80)] )[0])

            // 判断当前随机坐标是否重复标识
            const mark = this.onlyPosition(currNumX, currNumY)
            if (mark) {
              randomX = currNumX
              randomY = currNumY
              break;
            }
          }
          // 去重覆盖动物坐标问题结束.

          let obj = {
            x: parseInt(randomX),
            y: parseInt(randomY),
            deg: getRandom.getNorepeatArr(1, [0, 360])[0],
            src: imgResource,
            animalName: animalNameList(randomArr[i], this.theme)
          }

          // 将当前区域加入黑名单，去重使用
          this.blackList.push({
            x: [obj.x - 60, obj.x + 60],
            y: [obj.y - 60, obj.y + 60]
          })

          aniArr.push(obj)
        }

//        console.log(aniArr)

        this.animalData = aniArr

      },

      // 倒计时计时
      moveTime () {
        // 启动倒计时音效
        $('.time-audio')[0].play()

        this.loopTime = setInterval(() => {
          this.second -= 1

          if (this.second <= 0) {
            clearInterval(this.loopTime)
            this.gradeMark = false // 停止展示倒计时

            // 关闭倒计时音效
            this.closeTimeMoveBg()

            // 闯关失败弹窗
            this.gameFailMark = true

            // 提交成绩
            this.updateGrade()
//            console.log(this.moneyAll)
//            console.log(this.moneyCount)
          }
        }, 1000)

      },

      // 关闭倒计时音效
      closeTimeMoveBg () {
        // 关闭倒计时音效
        let bgAudio = $(".time-audio")[0];
        bgAudio.pause(); // 停止播放背景音乐
        bgAudio.currentTime = 0.0 // 背景音乐时间重置

      },

      // 提交成绩
      async updateGrade () {
        const nickname = window.localStorage.getItem('zooNickname')
        const use_time = this.moneyAll + this.moneyCount || ''
        const time_stamp = this.moneyAll + this.moneyCount || ''

        const data = {
          nickname,
          use_time,
          time_stamp
        }

        try {
          const dataList = await updateUser(data)
//          console.log(dataList)

          // 请求当前数据
          this.getRankingInfo()

        } catch (error) {
          console.log(error)
        }
      },

      // 去重动物坐标重复问题，并返回最终新坐标
      onlyPosition (currNumX, currNumY) {
        let mark = true
        if (this.blackList.length) {
          this.blackList.map((item) => {
            if (currNumX > item.x[0] && currNumX < item.x[1] && currNumY > item.y[0] && currNumY < item.y[1]) {
              mark = false
            }
          })
        }

        return mark

      },

      // 强制横屏
      orientation () {
        var that = this

        // 利用 CSS3 旋转 对根容器逆时针旋转 90 度
        let detectOrient = function() {
          let width = document.documentElement.clientWidth,
            height = document.documentElement.clientHeight

          if( width >= height ){ // 横屏

            let style = {
              width: width + 'px',
              height: height + 'px',
              '-webkit-transform': 'rotate(0)',
              'transform': 'rotate(0)',
              '-webkit-transform-origin': '0 0',
              'transform-origin': '0 0'
            }

            $('.zoo-home').css(style)

            // 获取当前屏幕的宽高
            that.clientWidth = width
            that.clientHeight = height

          } else { // 竖屏
            let style = {
              width: height + 'px',
              height: width + 'px',
              '-webkit-transform': 'rotate(90deg)',
              'transform': 'rotate(90deg)',
              '-webkit-transform-origin': width / 2 + 'px ' + width / 2 + 'px',
              'transform-origin': width / 2 + 'px ' + width / 2 + 'px'
            }

            $('.zoo-home').css(style)

            // 获取当前屏幕的宽高
            that.clientWidth = height
            that.clientHeight = width

          }

        }
        window.onresize = detectOrient;
        detectOrient();
      },

      // 获取zoo的title位置及大小
      getTitle () {
        const titleWidth = $('.title').outerWidth()
        const titleHeight = $('.title').outerHeight()

        this.title = {
          position: [0, 0],
          width: titleWidth,
          height: titleHeight
        }

        // 真正内容可用坐标范围
        this.usedArea = {
          x: [(parseInt(this.clientWidth) - parseInt(titleWidth)), parseInt(this.clientWidth)],
          y: [(parseInt(this.clientHeight) - parseInt(titleHeight)), parseInt(this.clientHeight)]
        }

      }
    },
    components: {

    }

  }

  var doc = {
    vueObj: '', // vue对象

    init (that) {
      this.vueObj = that

      this.helper()
      this.bind()
    },
    helper () {

    },
    bind () {

    },

  }

</script>

<style lang="scss">
  @import "../../../assets/css/pr2rem";
  @import "../assets/css/index";

  .zoo-home {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/img/home/bg.jpg") no-repeat center / cover;
    overflow: hidden;

    .title {
      width: pr(300);
      height: pr(160);
    }

    .real-content {
      position: relative;
      width: 100%;
      height: 100%;

      .abc-img {
        position: absolute;
        width: pr(60);
        height: pr(60);

        &.selected {
          -webkit-animationn: imgMove 1s;
          -moz-animation: imgMove 1s;
          -o-animation: imgMove 1s;
          animation: imgMove 1s;

          @keyframes imgMove{
            0% {
              margin-left: 0;
            }
            15% {
              margin-left: pr(-10);
            }
            30% {
              margin-left: pr(10);
            }
            45% {
              margin: 0;
            }
          }
        }
      }
    }

    // 首页样式
    .home {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);

      .base-body {
        position: absolute;
        width: pr(450);
        height: 100%;
        /*background-color: rgba(255, 255, 255, 0.9);*/
        border-radius: pr(20);
        padding: pr(10);

        .home-title {
          font-size: pr(40);
          color: #fff;
        }

        .checkpointNode {
          & > div {
            position: relative;
            width: pr(100);
            height: pr(50);
            background: #fff;
            margin-bottom: pr(10);

            .cover {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
            }
          }
        }

        .ranking {
          width: pr(67);
          height: pr(67);
          margin: pr(50) 0 pr(10) 0;
        }

        .btn {
          width: pr(180);
          height: pr(50);
          line-height: pr(50);
          text-align: center;
          color: #000;
          font-size: pr(40);
          background: #fff;
          border-radius: pr(40);
        }

      }
    }

    // 昵称弹窗样式
    .nickname-par {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;

      .content {
        position: relative;
        width: pr(450);
        height: pr(70);

        .content-nickname {
          width: pr(200);
          height: pr(70);
          background: rgba(255, 255, 255, 0.6);
          border-radius: pr(100) 0 0 pr(100);
          padding-left: pr(10);

          input{
            width: pr(150);
            height: pr(30);
            line-height: pr(30);
            color: #fff;
            font-size: pr(24);
            background: rgba(255, 255, 255, 0);
          }
        }

        .btn {
          width: pr(80);
          height: pr(70);
          line-height: pr(70);
          text-align: center;
          font-size: pr(30);
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
          right: pr(15);
          width: pr(60);
          height: pr(60);
        }
      }
    }

    .ranking-par {
      position: relative;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;

      .back {
        position: absolute;
        top: pr(20);
        left: pr(20);
        width: pr(30);
        height: pr(30);
      }

      .ranking-me {
        width: pr(200);
        height: pr(300);
        background: rgba(0, 0, 0, 0.3);
        margin-right: pr(20);

        .congratulation {
          width: pr(160);
          height: pr(50);
        }

        .money {
          width: pr(120);
          margin: pr(20) 0 pr(20) 0;

          .abc-img {
            width: pr(50);
            height: pr(50);
            margin-right: pr(10);
          }

          .num {
            font-size: pr(24);
            color: #fff;
          }
        }

        .rank {
          width: pr(120);

          .abc-img {
            width: pr(50);
            height: pr(50);
            margin-right: pr(10);
          }

          .num {
            font-size: pr(24);
            color: #fff;
          }
        }


      }

      .ranking-data {
        width: pr(400);
        height: pr(300);
        background: rgba(0, 0, 0, 0.3);
        padding-top: pr(10);

        .ranking-data-title {
          font-size: pr(28);
          color: #fff;
        }

        .real-info {
          width: 100%;
          height: pr(400);

          .item {
            height: pr(40);
            color: #fff;
            font-size: pr(24);
            margin-bottom: pr(5);

            .order {
              width: pr(50);
              margin-right: pr(30);
              margin-left: pr(30);
            }

            .name {
              text-align: left;
              width: pr(170);
            }

            .money-num {
              width: pr(110);

              img {
                width: pr(40);
                height: pr(40);
                margin-right: pr(10);
              }

              .money-info {
                font-size: pr(24);
                color: #fff;
              }

            }
          }

        }

      }

    }

    /*任务描述*/
    .before-start {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);

      .base-body {
        position: absolute;
        width: pr(450);
        height: pr(200);
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: pr(20);
        padding: pr(10);

        .point-title {
          font-size: pr(20);
        }

        .point-title-all {
          font-size: pr(20);

          .count {
            color: #f71;
          }
        }

        .content {
          font-size: pr(30);
          .point {
            font-size: pr(34);
            color: #F5A623;
          }
        }

        .btn {
          width: pr(150);
          height: pr(50);
          line-height: pr(50);
          background: #F8E71C;
          color: #fff;
          text-align: center;
          border-radius: pr(28);
          font-size: pr(30);
          margin-top: pr(10);
          margin-right: pr(10);
        }

      }
    }

    .money-par {
      position: absolute;
      top: 0;
      right: 0;
      width: pr(100);
      height: pr(50);
      font-size: pr(24);
      color: #fff;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 0 0 0 pr(10);

      .time {
        width: pr(25);
        color: #ff0000;
        font-weight: 600;
        margin-right: pr(5);

        &.hidden {
          opacity: 0;
        }

        &.move {
          -webkit-animationn: timeMove 1s infinite;
          -moz-animation: timeMove 1s infinite;
          -o-animation: timeMove 1s infinite;
          animation: timeMove 1s infinite;

          @keyframes timeMove{
            0% {
              font-size: pr(24);
            }
            50% {
              font-size: pr(40);
            }
            100% {
              font-size: pr(24);
            }
          }
        }

      }

      .grade-count {
        .abc-img {
          width: pr(30);
          height: pr(30);
        }
      }

    }

  }

</style>


