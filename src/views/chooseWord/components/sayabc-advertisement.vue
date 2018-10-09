<template>
  <div class="sayabc-Advertisement-body">
    <div @click="close" class="close abc-img"><img src="../assets/img/home/close.png"/></div>

    <div class="header abc-flex-x-center">
      <div class="abc-img"><img src="../assets/img/home/sayabc.png"></div>
      <div class="title">美国小学在家上</div>
    </div>

    <div class="video">
      <div class="title">美国国家地理学习 权威教材独家授权</div>
      <div class="video-content">
        <video id="video" src=" http://static.sayabc.com/video/National_Geographic_Learning_480p2.mp4" controls="controls"
               poster="../assets/img/home/cover-map.jpeg"></video>
      </div>
    </div>

    <div class="ad-img-1 abc-img">
      <img src="../assets/img/home/advertisement-img.jpeg">
    </div>

    <div class="introduce">
      <div class="abc-img">
        <img src="../assets/img/home/advertisement-img-1.jpeg">
      </div>

      <div class="content">
        SayABC创始团队来自知名国际教育机构，对互联网教育和中国少儿英语学习有深刻的理解。我们关注中国孩子的英语教育问题，
        致力通过生动有趣的课堂体验让英语成为孩子探索世界的钥匙。
      </div>

    </div>

  </div>

</template>

<script>
  import { mapState } from "vuex"
  import '@/assets/js/m'

  export default {
    name: 'Advertisement',
    props: ['show', 'hide'],
    data(){
      return {
      }
    },
    computed: {
      ...mapState([
        'resourceUrl' // 静态资源路径，服务器静态资源的host
      ]),
    },
    created () {

    },
    watch: {

    },
    mounted () {
      // doc操作初始化
      doc.init(this)

    },
    methods: {
      show () {
        this.show()
      },

      close () {
        this.hide()
      }

    },
    components: {

    }

  }

  var doc = {
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

  // 0.4秒动画设置，用于下面被继承
  .trans {
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .sayabc-Advertisement {
    /*继承0.4秒动画设置*/
    @extend .trans;

    position: fixed;
    top: 100%;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #94BA41;
    z-index: 999;
    padding: pr(20);

    .up-show {
      position: absolute;
      width: pr(60);
      height: pr(60);
      top: pr(-60);
      left: pr(60);
    }

    .sayabc-Advertisement-body {
      position: relative;
      width: 100%;
      height: 100%;
      overflow-y: scroll;

      .close {
        position: absolute;
        width: pr(50);
        height: pr(50);
        top: pr(20);
        right: pr(20);
        z-index: 1000;
      }

      .header {
        .abc-img {
          width: pr(120);
          height: pr(120);
        }

        .title {
          font-size: pr(60);
          color: #fff;
          margin-left: pr(20);
        }
      }

      .video {
        margin-top: pr(20);

        .title {
          font-size: pr(40);
          color: #fff;
          margin: pr(10) auto;
        }

        .video-content {
          width: pr(700);
          margin: 0 auto;

          video {
            width: 100%;
          }
        }
      }

      .ad-img-1 {
        margin: pr(10) auto;
        width: pr(700);
        height: pr(430);
      }

      .introduce {
        margin: pr(20) 0;
        .abc-img {
          margin-bottom: pr(10);
          width: pr(700);
          height: pr(550);
        }

        .content {
          font-size: pr(40);
          color: #fff;
        }
      }
    }

  }

</style>
