<template>
  <div :class="['zoo-home', {'horizontal': true}]">
    <!--<img class="bg" src="../assets/img/home/bg_2.png">-->
    this is the zoo

  </div>

</template>

<script>
  import { mapState } from "vuex"
//  import moment from 'moment'
//  import { addUser, updateUser, getUserList, getRandomWords } from '@/api/chooseWord'
  import { orientation } from '../assets/js/fun'



  import '@/assets/js/m'

  export default {
    name: 'Home',
    data(){
      return {
        horizontal: false

      }
    },
    computed: {
      ...mapState([
        'resourceUrl' // 静态资源路径，服务器静态资源的host
      ]),
    },
    created () {
//      const windowStatus = orientation() // 横屏还是竖屏
//      if (!windowStatus) {
//
//      }



    },
    watch: {

    },
    mounted () {
      // 强制横屏
      this.orientation()


      // 初始化
      this.start()

      // doc操作初始化
      doc.init(this)




    },
    methods: {
      // 页面初始化(模拟背景闪屏效果)
      async start () {

      },


      orientation () {
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

          }

        }
        window.onresize = detectOrient;
        detectOrient();
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
    width: 100%;
    height: 100%;
    background: url("../assets/img/home/bg.jpg") no-repeat center / cover;

  }





</style>


