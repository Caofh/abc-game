<template>
  <div :class="['zoo-home']">
    <div class="title"><img src="../assets/img/home/zoo-title.png"></div>

    <div class="abc-img"><img src="../assets/img/home/icon/icon_1.png"></div>

  </div>

</template>

<script>
  import { mapState } from "vuex"
//  import moment from 'moment'
//  import { addUser, updateUser, getUserList, getRandomWords } from '@/api/chooseWord'

  import getRandom from '../assets/js/getRandomArr'



  import '@/assets/js/m'

  export default {
    name: 'Home',
    data(){
      return {
        clientWidth: '', //设备宽度
        clientHeight: '', //设备高度
        title: {}, // 动物园标题的位置及大小


        animalCount_1: 10,
        animalCount_2: 20,
        animalCount_3: 24,

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





      console.log(getRandom.getNorepeatArr(1, 360))

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






      },


      // 强制横屏
      orientation () {
        var that = this

        // 利用 CSS3 旋转 对根容器逆时针旋转 90 度
        let detectOrient = function() {
          let width = document.documentElement.clientWidth,
            height =  document.documentElement.clientHeight

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

    & > .abc-img {
      position: absolute;
      width: pr(80);
      height: pr(80);
    }

  }

</style>


