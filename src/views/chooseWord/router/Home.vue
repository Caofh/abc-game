<template>
  <div class="game-home">

    <!--游戏开始-->
    <div class="bigdiv" style=" display: none;">
      <div class="ledoucontent">

      </div>

      <div class="gamenumber">0</div>

    </div>

    <!--游戏结果浮层-->
    <div v-if="resultShow" class="popcontent">
      <div class="popdialogue">
        <a href="javascript:;" class="clearBtn"></a>
        <div class="ledoutext">拼对3个单词用时&nbsp;<i class="LDcont">300</i>&nbsp;秒</div>
        <a @click="look" href="javascript:;" class="selectBtn"></a>
      </div>
    </div>

    <!--排行榜浮层-->
    <div v-if="rankingList" class="loadingbig">
      <div class="poploding">
        排行榜
      </div>
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
        clearnum: '',
        num: 30, //游戏持续时间15秒
        Reciprocal: true, // 是否允许设置游戏时长开关
        rankingList: false, // 显示排行榜标识
        resultShow: false, // 游戏结果显示

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
      this.start()

    },
    methods: {
      // 显示榜单
      look () {
        this.rankingList = true
      },

      // 初始化
      start () {
        let that = this // 外部vue对象，用于在下面new qmcai.View({})对象中使用

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

//            console.log(that.num);
//            console.log(obj);

            if(that.num <= 0 || obj){
              clearTimeout(this.clearnum);
              that.num = 20
              return;
            }

            if(that.Reciprocal){
              that.num--;
            }

            if(that.num == 0){
              // 显示结果排行榜
              that.resultShow = true

              // 清除添加字母方法的定时
              game.clearAdd()

              $(document).off("touchstart",'.ledoucontent .canvasevent');
            }

            clearTimeout(this.clearnum);
            this.clearnum = setTimeout(() => {
              this.backledou(obj)
            }, 1000)

          },

        });

      }

    },
    components: {

    }

  }

</script>

<style lang="scss">
  @import "../../../assets/css/pr2rem";
  @import "../assets/css/index";

</style>
