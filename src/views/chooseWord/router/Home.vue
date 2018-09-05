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

//  import '../assets/js/games'
//  import '../assets/js/util/dialog'
//  import '../assets/js/util/qmcai'



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
  /*@import "../assets/css/index.scss";*/

  @charset "UTF-8";
  html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}html,body{font-family:sans-serif; height: 100%;}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,q:after{content:''}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}ins,a{text-decoration:none}
  .clear{clear: both;}
  /*body,html{overflow: hidden;}*/
  html{overflow: hidden;/*-webkit-overflow-scrolling : touch*/ }
  body{overflow: auto; -webkit-overflow-scrolling:touch; height: 100%;/*-webkit-overflow-scrolling : touch*/ }
  .body{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; }
  div,nav,ul,li,span,em,a,img,header,footer { -webkit-tap-highlight-color:transparent;}
  a {text-decoration:none;}
  a:link{text-decoration:none;}
  a:visited {text-transform: none;}
  a{text-decoration:none!important;}
  a:focus{text-decoration:none;}
  i{font-style:normal;}
  body{ background:#41005c; }
  .ledougame{ display: block;}
  .ledougame_content{ background:url('../assets/img/bgledou.png') no-repeat center top; background-size:100%; width: 100%;  position: relative; padding-bottom:0.5rem;}
  /*load img*/
  .load_img{width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; }
  .loading_png{ width: 0.64rem; height:0.64rem; position:absolute; top: 50%; left:50%; margin-left: -0.32rem; margin-top: -0.32rem; background: url('../assets/img/load.png'); background-size:0.64rem 0.64rem;}
  .timeout_img{ width: 3.68rem; height:3.30rem; position: absolute; top: 50%; left: 50%; margin-left: -1.8rem;  margin-top:-2.0rem; display: none; background:#ffffff;  }
  .timeout_img_top0{  margin-top:0rem;}
  .timeout_img img{ width: 3.68rem; height:2.30rem; margin: 0 auto;}
  .queshengye_text{ font-size: 0.30rem; color:#999999; text-align: center; width: 100%}
  .loading_png{
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 3s linear infinite;
    -moz-animation: rotate 3s linear infinite;
    -o-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;}
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
  }
  @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
  }
  @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
  }
  @keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
  }/*end*/

  /*弹框页面*/
  .alertDiv,.LalertDiv {
    position:fixed;left:0px;bottom:0px;width:100%;height:100%;min-height:100%;
    z-index: 1200;
    background: rgba(0,0,0,0.6);
  }
  .alertInnerDiv,.LalertInnerDiv{
    opacity:1;position:absolute;visibility:visible;
    width:90%;left:5%;margin-top:-2.5rem;top:50%;
    text-align:center;border:1px #ccc solid;font-size:0.3rem;
    background:white;color:#333;border-radius:.1rem;
    z-index: 1300;
  }
  .frameHead,.LframeHead {height:0.8rem;line-height:0.8rem;background:white;border-radius:.1rem .1rem 0 0;}
  .frameFoot,.LframeFoot {width:100%;height:0.78rem;line-height:0.78rem;}
  .frameBtn {float:left; width:49.8%;color:#666;border-top:1px #e2e2e2 solid;border-radius:0 0 .1rem .1rem;font-size:0.28rem;}
  .leftBtn {border-right:1px #e2e2e2 solid;border-radius:0 0 0 .1rem;}
  .rightBtn {border-radius:0 0 .1rem 0;color: rgb(253, 147, 33);}
  .setWidth {width:100%;}
  .frameHead h1,.LframeHead h1 {width:100%;height:0.8rem;line-height:0.8rem;margin:0;font-size:0.28rem;color:#333;text-align:center;}
  .frameBody {padding:.2rem .6rem;line-height:0.4rem;font-size:0.3rem;border-top:1px #e2e2e2 solid;}
  .frameMain,.LframeMain {text-align:center;}
  .preview{float:right;}
  .one-s-img .tag span.preview{float:right;}
  #scroller {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .dialogue_s{font-size:0.28rem; color: rgb(253, 147, 33);}
  /*end*/
  .paddingheight{ height:4.4rem; width: 100%; }
  .timestart{width: 100%; height:1.55rem; position:relative; background:url('../assets/img/timebg.png') no-repeat center center; background-size:6.11rem auto; }
  .timestart_center{ position: absolute; top: 50%; margin-top: -0.44rem; width: 100%; }
  .timestart p{ font-size: 0.30rem; text-align: center; color:#fff; line-height: 0.42rem; width: 100%;}
  .timestart p i{ color:#fff400;}
  .next_dou{ width: 100%; margin-top: 0.3rem; height: 1.74rem; background: url(../assets/img/nexttable.png) no-repeat center center; background-size: 3.79rem auto;}
  .next_showtime{ width: 100%; margin-top: 0.3rem; height: 1.74rem; position: relative; }
  .next_btn{ width: 100%; margin-top: 0.3rem; height: 1.74rem; position: relative; }
  .showtime{ width:81.06%; height:1.24rem; position: absolute; top: 50%; left: 50%; margin-top: -0.62rem; margin-left: -40.53%; background: url(../assets/img/ljsbg.png) no-repeat center center; background-size:100% auto; }
  .showtime ul{ width: 42.75%; height:1.24rem; position: absolute; right:10%;top: 0; }
  .showtime ul li{ width: 20%; height: 1.24rem; font-size:0.34rem; line-height: 1.24rem; text-align: center; font-weight: bold; color:#fff;  float:left; background:url(../assets/img/numberbg.png) no-repeat center center; background-size: 100% auto;}
  .showtime ul li.desk{ background:url(../assets/img/desk.png) no-repeat center center; background-size:0.06rem  auto;}
  .next_btn a{ position: absolute; top: 50%; margin-top: -0.43rem;  margin-left: -23%; left: 50%;}
  .next_btn a.next_linkB{ width: 46.66%; height: 0.86rem; background:url('../assets/img/blackbtn.png') no-repeat center center; background-size:100% auto; display: block; }
  .next_btn a.next_linkY{ width: 46.66%; height: 0.86rem; background:url('../assets/img/yellowbtn.png') no-repeat center center; background-size:100% auto; display: block;  }
  .next_btn a.next_linkO{ width: 46.66%; height: 0.86rem; background:url('../assets/img/over.png') no-repeat center center; background-size:100% auto; display: block;  }

  .times_table,.times_title{ font-size:0.28rem; color:#fbcdff; text-align: center; line-height: 0.36rem;}
  .times_title{ line-height: 0.66rem;}
  .times_table{ padding-top:0.14rem; }
  .list_content{ width: 100%; height: auto; padding-top: 0.3rem;}
  .userinfo_list{ width:92.5%; margin: 0 auto; background: url('../assets/img/userinfobj.png') no-repeat; background-size:100% auto; height: 5.41rem; }
  .userinfo_title{ width:84.72%;  height:0.9rem; position:relative; margin: 0 auto; text-align: center; color:#ffffff; font-size: 0.30rem; line-height: 0.9rem; }
  .userinfo_title:before{ position:absolute; content:"";background:#d37ef2; height: 1px; width:200%; left: -50%; bottom:0; position: absolute;-webkit-transform:scale(0.5); transform:scale(0.5);  }
  .userinfo_center{ width:84.72%; height:auto;  margin: 0.15rem auto 0 auto;  position:relative;  font-size:0.28rem; color:#fff;}
  .userinfo_center .topbg,.userinfo_center .bottombg{ background:url('../assets/img/topbg.png') no-repeat center top; background-size:100%;   position: absolute;  left: 0;  right: 0; height:0.45rem; }
  .userinfo_center .topbg{ top: 0;}
  .userinfo_center .bottombg{ background:url('../assets/img/bottombg.png') no-repeat center  bottom ; background-size:100%; bottom: 0;  }
  .swiper-container{ height: 4.0rem; overflow: hidden; position: relative; }
  .userinfo_center .swiper-wrapper{ width:93.5%; margin: 0 auto; height: auto; display: block; }
  .userinfo_center .swiper-wrapper .swiper-slide{ line-height:0.50rem; height: 0.50rem; transition: all 0.5s;-webkit-transition: all 0.5s;  -moz-transition: all 0.5s;}
  .defaultli{ position: absolute; top: 0; bottom: 0px; left: 0; right: 0;  text-align: center; }
  .defaultli_text{ font-size:0.3rem; line-height: 0.4rem; width: 100%; height: 0.7rem; margin-top: 1.65rem;}
  .left_text{ float: left;}
  .left_text i{ color:#fff400;}
  .right_text{float:right;}
  .rule{ width:100%; height:auto; padding-top:0.8rem;}
  .rule_title,.rule_center{ width:100%; height:auto;  text-align: center; color:#fff; position:relative; }
  .rule_title_s{ width: 93.33%; height:0.33rem;line-height: 0.30rem; font-size: 0.28rem; margin: 0 auto; text-align: center; color:#fff; position: relative; }
  .rule_title_s:before,.rule_title_s:after{  position:absolute; content:"";background:#fff; height: 1px; width:80%;  top:50%; position: absolute; -webkit-transform:scale(0.5); transform:scale(0.5);   }
  .rule_title_s:before{ left: -20%;}
  .rule_title_s:after{ right: -20%;}
  .rule_center{ margin-top:0.3rem;}
  .rule_center ul{width: 93.33%; margin: 0 auto;   }
  .rule_center ul li{line-height:0.50rem; font-size: 0.26rem; color:#fff; text-align:justify; }
  /*游戏样式*/
  .bigdiv {margin: 0; padding: 0; position:fixed; top: 0; left:0; right:0; bottom:0; overflow: hidden; background:url('../assets/img/bj.png') no-repeat bottom left ; background-size: 100% auto; z-index: 100; }
  .backward{ width: 100%; background:#ccc; opacity: 0.5; position: absolute; top: 0; bottom: 0;left: 0; right: 0; z-index: 100;}
  .backward span{display: inline-block; width: 4rem; height: 4rem; color: #000; font-weight: bold; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;text-align: center; font-size: 3rem;}
  .backward div{width: 100%; height: 4rem; line-height: 4rem; color: #000; font-weight: bold; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;text-align: center; font-size: 1.4rem;}

  .g{ position: relative; width: 100%; height: 100%; overflow:hidden;}
  .ledoucontent{ position:absolute; width: 0; height:1500px; top: 0; left:0; right: 0;  }
  canvas{ position:fixed; top:0; z-index: 5000; }
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
  }
  @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
  }
  @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
  }
  @keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
  }
  .gamenumber{ font-size: 1rem; color:#fff; font-weight: bold; position: absolute; bottom: 0.4rem; left: 0.2rem; }
  /*游戏弹窗样式*/
  .popcontent,.loadingbig{background:url('../assets/img/bgopcity.png'); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 200; overflow: hidden; }
  .popdialogue{ width: 5.66rem; height: 3.62rem; position:absolute; left: 0; right: 0; top: 0; bottom: 0; background: url('../assets/img/Pop.png') no-repeat center center; background-size:100% auto; margin: auto; }
  .poploding{ width: 5.66rem; height: 3.62rem; position:absolute; left: 0; right: 0; top: 0; bottom: 0; background-size:100% auto; margin: auto; margin: auto; font-size: 0.4rem; text-align: center;line-height: 3.62rem; color: #fff; }

  .selectBtn{ width: 3.0rem; height:0.7rem; position: absolute; bottom: 0; left: 50%; margin-left: -1.5rem; display: block;}
  .ledoutext{ width: 100%; position: absolute; bottom:1.24rem; height:0.8rem; line-height:0.8rem; text-align: center; color:#fff; font-size:0.36rem;  }
  .ledoutext i{ color:#fff33b; font-size: 0.36rem;}
  .clearBtn{ width: 0.6rem; height: 0.6rem; position: absolute; right: 0; right:0; display: block; background:url('../assets/img/chazi.png') no-repeat center center; background-size:100% auto; }




</style>
