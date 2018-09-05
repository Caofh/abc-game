<template>
  <div class="game-home">

    <!--游戏开始-->
    <div class="bigdiv" style=" display: none;">
      <div class="ledoucontent">

        <div class="backward">
          <span class="tjld_span"></span>
          <div class="tjld_div">天降乐豆</div>
          <div class="tjld_ks" style="display: none">开始</div>
        </div>

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
    <div class="loadingbig" style="display: none;" >
      <div class="poploding">
        正在为您数豆...    </div>
    </div>



  </div>
</template>

<script>
  import { mapState } from "vuex"

//  import '../assets/js/util/zepto.min'
//  import '../assets/js/util/underscore-min'

//  import '../assets/js/util/swiper.min'
//  import '../assets/js/util/oao.timer'
//  import '../assets/js/util/util'
//  import '../assets/js/util/root'

  import '../assets/js/games'
  import '../assets/js/util/dialog'
  import '../assets/js/util/qmcai'



//  import '../assets/js/index'

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

      console.log(this.test)

    },
    watch: {

    },
    mounted () {

      start()

    },
    methods: {

    },
    components: {

    }

  }


  function start () {
    var util = new publicMethod();
    var root = new rootMethod();
    var userInfo ={};
    var clientLogin = util.getUrlParam('clientLogin');
    var param = {};
    param.titleName = "天降乐豆";
    util.sendToClient(param);
    var starttime_q="19:30:00"; //提前30分钟
    var starttime="20:00";   //活动准确开始时间
    var endtime="21:00";    //结束时间
    var endDate="2018/02/15 21:00:00"
    var num=20; //游戏持续时间15秒   5秒等待时间
    var myswiper2;
    var clearnum;
    var systemTime,clearappsetJS;
    var Reciprocal=true;
    var qmcai = new _qmcai({
      el: $("#userhistory"),
      init: function () {
        //this.makeTouchableButton($(".twins_content").get(0));
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
        setTimeout(addel,3200); // 游戏开始方法
        backward(); // 调用倒计时方法
        this.backledou(false)

      },
      /**
       * 倒计时15秒
       */
      backledou:function(obj){
        var that=this;
        console.log(num);
        console.log(obj);
        clearTimeout(clearnum);
        clearnum=setTimeout(function(){
          that.backledou(obj)
        },1000)
        if(num<=0||obj){
          clearTimeout(clearnum);
          num=20
          return;
        }
        if(Reciprocal){
          num--;
        }
        if(num==0){
          $(".loadingbig").show();
          //$("body").removeClass("body");
          window.clearTimeout(window.cleartime);
          $(document).off("touchstart",'.ledoucontent .canvasevent');
          // that.submitJoinGames($(".gamenumber").html())//请求接口  提交游戏所获得的乐豆
        }

      },


    });
    window.isNameResult = qmcai.isNameResult;
    window.clientLogin = qmcai.clientLogin;
    window.headBack = qmcai.headBack;
    window.appSetJs = qmcai.appSetJs;
    window.qmcai= qmcai;
  }

</script>

<style lang="scss">
  @import "../assets/css/normalize.scss";
  @import "../assets/css/swiper.min.scss";
  @import "../assets/css/index.scss";

</style>
