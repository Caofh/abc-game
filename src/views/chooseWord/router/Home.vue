<template>
  <div class="game-home">

    <!--游戏开始-->
    <div class="bigdiv" style=" display: none;">
      <div class="ledoucontent">

      </div>

      <div class="gamenumber">0</div>

    </div>
    <div class="popcontent" style="display: none;">
      <div class="popdialogue">
        <a href="javascript:;" class="clearBtn"></a>
        <div class="ledoutext">获得&nbsp;<i class="LDcont">20</i>&nbsp;个乐豆</div>
        <a href="javascript:;" class="selectBtn"></a>
      </div>
    </div>


    <!--数豆浮层-->
    <div class="loadingbig" style="display: none;" >
      <div class="poploding">
        正在为您数豆...    </div>
    </div>



  </div>
</template>

<script>
  import { mapState } from "vuex"

  import '@/assets/js/m'
  import game from '../assets/js/games'
  import qmcai from '../assets/js/util/qmcai'

  export default {
    name: 'Home',
    data(){
      return {

      }
    },
    computed: {
      ...mapState([
        'test' // 当前选中的tab
      ])
    },
    created () {

//      console.log(this.test)

    },
    watch: {

    },
    mounted () {
      // 初始化
      start()

    },
    methods: {

    },
    components: {

    }

  }

  function start () {
    var clearnum;
    var num = 30; //游戏持续时间15秒   5秒等待时间
    var Reciprocal = true;

    // 初始化页面
    new qmcai.View({
      el: $("#userhistory"),
      init: function () {
        this.render();

      },
      events: {
        "touchend .next_linkY":"this.gamestart",
        "touchend .selectBtn":"this.locationhref",
        "touchend .clearBtn":"this.clearBtn"
      },
      render: function (){
        /**
         * 游戏开始，测试用
         */
        $(".bigdiv").show();
        $("body").addClass("body");

        setTimeout(game.add, 1000); // 游戏开始方法
        this.backledou(false) // 15s后游戏结束

      },
      /**
       * 游戏倒计时
       */
      backledou:function(obj){

        var that = this;
//        console.log(num);
//        console.log(obj);

        if(num <= 0 || obj){
          clearTimeout(clearnum);
          num=20
          return;
        }

        if(Reciprocal){
          num--;
        }

        if(num == 0){
          $(".loadingbig").show();

          // 清除添加字母方法的定时
          game.clearAdd()

          $(document).off("touchstart",'.ledoucontent .canvasevent');
        }

        clearTimeout(clearnum);
        clearnum = setTimeout(function(){
          that.backledou(obj)
        },1000)

      },


    });

  }

</script>

<style lang="scss">
  @import "../../../assets/css/pr2rem";
  @import "../assets/css/index";

</style>
