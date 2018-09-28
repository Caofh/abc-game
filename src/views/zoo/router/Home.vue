<template>
  <div :class="['zoo-home']">
    <!--<div class="title"><img src="../assets/img/home/zoo-title.png"></div>-->

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
        <div class="point-title">第{{progress || 1}}关</div>
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
        <div class="point-title">闯关失败，您当前共获得{{moneyCount || 0}}个金币</div>

        <div class="abc-flex-x-center">
          <div @click="restartGame" class="btn">
            Restart
          </div>
          <div @click="restartGame" class="btn">
            排行榜
          </div>
        </div>
      </div>
    </div>

    <!--倒计时及金币数量-->
    <div class="money-par abc-flex-x-center">
      <div :class="['time', {'hidden': !gradeMark}]">{{second || 0}}</div>

      <div class="grade-count abc-flex-x-center">
        <div class="abc-img"><img src="../assets/img/home/money.png"></div>
        <div>{{ moneyCount || 0 }}</div>
      </div>
    </div>

    <!--随机的动物图片-->
    <div v-if="gradeMark" class="real-content">
      <div @click="chooseAnimal(item)" v-for="(item, index) in animalData" class="abc-img"
           :style="{'left': item.x + 'px', 'top': item.y + 'px', '-webkit-transform': 'rotate('+item.deg+'deg)', 'transform': 'rotate('+item.deg+'deg)'}">
        <img :src="item.src">
      </div>
    </div>

  </div>

</template>

<script>
  import { mapState } from "vuex"
//  import moment from 'moment'
//  import { addUser, updateUser, getUserList, getRandomWords } from '@/api/chooseWord'

  import getRandom from '../assets/js/getRandomArr'
  import { checkpoint, animalNameList } from '../assets/js/fun'



  import '@/assets/js/m'

  export default {
    name: 'Home',
    data(){
      return {
        clientWidth: '', //设备宽度
        clientHeight: '', //设备高度
        title: {}, // 动物园标题的位置及大小
        usedArea: {}, // 真正内容的可用坐标范围

        progress: '', // 游戏主进度(关数，共12关)
        animalName: '', // 当前任务的动物名称
        animalCount: '', // animal数量
        second: '', // 游戏读秒
        moneyCount: 0, // 金币数
        animalData: [], // 动物数据
        blackList: [], // 动物图片黑名单

        beforeGameMark: true, // 任务描述标识
        gamingMark: false, // 游戏过程中，下一关的文案提示
        gradeMark: false, // 成绩显示标识标识
        gameFailMark: false, // 闯关失败标识

        loopTime: '', // 倒计时定时变量
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

    },
    watch: {

    },
    mounted () {
      // 初始化
      this.start()

      // doc操作初始化
      doc.init(this)




    },
    methods: {
      // 页面初始化(模拟背景闪屏效果)
      async start () {
        // 强制横屏
        this.orientation()

        // 获取zoo的title位置及大小
        this.getTitle()

        // 配置游戏关卡:第一关
        this.confGame(1)

        // 获取当前关卡配置
//        const gameConfig = checkpoint(12)
//        console.log(gameConfig)

//        setInterval(() => {
//          let a = checkpoint(2)
//          console.log(a)
//
//
////          this.progress++
////          console.log(this.progress)
////          this.confGame(5)
//        }, 2000)

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

        // 重置分数
        this.moneyCount = 0

        // 配置游戏关卡:第一关
        this.confGame(1)

      },

      // 配置游戏关卡初始化(progress:第几关)
      confGame (progress) {
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

      // 点击动物方法
      chooseAnimal (item) {
        console.log(item)
        const name = item.animalName || ''
        console.log(this.animalName)
        if (name === this.animalName) {
          console.log('答对了')

          clearInterval(this.loopTime)

          console.log('progress', this.progress)
          if (this.progress < 12) {

            // 根据当前通关数，设置金币
            const moneyCount = this.setMoney(this.progress)
            this.moneyCount = moneyCount

            // 配置游戏关卡
            this.progress++
            this.confGame(this.progress)

            // 显示过关提示
            this.gamingMark = true

          } else {
            console.log('超过12关')

          }


          console.log(this.progress)
        } else {
          console.log('答错了')
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
        const randomArr = getRandom.getNorepeatArr(this.animalCount, [1, 39])
        // 随机生成当前需选择的动物文案
        const ranIndex = getRandom.getNorepeatArr(1, [0, (this.animalCount)])
        this.animalName = animalNameList(randomArr[ranIndex])

        for (let i = 0; i < this.animalCount; i++) {
          // 循环动物图片静态资源
          let imgResource = require(`../assets/img/home/icon/icon_${randomArr[i]}.png`)

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
            animalName: animalNameList(randomArr[i])
          }

          // 将当前区域加入黑名单，去重使用
          this.blackList.push({
            x: [obj.x - 60, obj.x + 60],
            y: [obj.y - 60, obj.y + 60]
          })

          aniArr.push(obj)
        }

        this.animalData = aniArr

      },

      // 倒计时计时
      moveTime () {
        this.loopTime = setInterval(() => {
          this.second -= 1

          if (this.second <= 0) {
            clearInterval(this.loopTime)

            // 闯关失败弹窗
            this.gameFailMark = true
          }
        }, 1000)

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

          }
          else{ // 竖屏
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
      width: pr(80);
      height: pr(50);
      font-size: pr(24);
      color: #fff;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 0 0 0 pr(10);

      .time {
        &.hidden {
          opacity: 0;
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


