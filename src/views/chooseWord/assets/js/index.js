/**
 * Created by Lenovo on 2017/9/7.
 */

(function (window, $) {
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
            // this.getDatestatic();//获取服务器时间
            // this.queryHistory();//查询历史记录
            // if(!clientLogin)
            // {
            //     userInfo = $.parseJSON((util.getCookie('userInfo') || '{}'));
            //     this.queryIsJoinGames();//刷新接口状态
            // }
            /**
             * 游戏开始，测试用
             */
            $(".bigdiv").show();
            $("body").addClass("body");
            setTimeout(addel,3200); // 游戏开始方法
            backward(); // 调用倒计时方法
            this.backledou(false)
        
        },
        // /*
        // 历史中奖纪录
        //  */
        // queryHistory:function(swiper){
        //     $(".defaultli").show();
        //     $(".defaultli_text").html("正在加载中");
        //     var jsonParam={
        //         "information": "games",
        //         "command": "queryHistoryRecord",
        //         'start':0,
        //         'size':50,
        //     }
        //     root.getDataByAjax(jsonParam, this.queryHistoryCallback.bindThis(this))
        // },
        // queryHistoryCallback:function(result){
        //     if(result.errorCode=='0000'){
        //         $(".defaultli").hide();
        //         $(".defaultli_text").html("嗨翻春节<br />千万乐豆从天降");
        //         var tpl= _.template($("#userhistory_tpl").html());
        //         this.el.html(tpl(result));
        //         if(!result.data.list.length){
        //             $(".defaultli").show();
        //             $(".defaultli_text").html("嗨翻春节<br />千万乐豆从天降");
        //         }
        //         if(result.data.list.length> 8 && result.errorCode!='1003' && result.errorCode!='1002' && result.data.status=='0' ){
        //             setInterval(function() {
        //                 var messageList = $('#userhistory div');
        //                 var firstEle = messageList[0];
        //                 $(firstEle).css('marginTop', '-0.5rem');
        //                 setTimeout(function() {
        //                     $(messageList[0]).remove();
        //                     $(firstEle).css('marginTop', '0');
        //                     $('#userhistory').append(firstEle);
        //                 }, 600);
        //             }, 5000);
        //
        //         }
        //     }else{
        //         $(".defaultli").show();
        //         $(".defaultli_text").html("嗨翻春节<br />千万乐豆从天降");
        //         alertDia('温馨提示',result.errorCode);
        //     }
        // },
        // /**
        //  * 开始游戏
        //  * @param e
        //  */
        // gamestart:function(e){
        //     _hmt.push(['_trackEvent', '天降乐豆', '点击', '开始游戏']);
        //     if($.isEmptyObject(userInfo)){
        //         window.location.href="login/login.html"
        //     }else{
        //         if(userInfo.mobileId==undefined || userInfo.mobileId ==null){
        //             alertDia('提示','网络有点小问题，请点击重试。');
        //             return;
        //         }else if(userInfo.mobileId==""){
        //             window.location.href = "login/bindMobile.html" ;
        //             return;
        //         }
        //         $(".bigdiv").show();
        //         $("body").addClass("body");
        //         setTimeout(addel,3200);
        //         backward();
        //         this.backledou(false)
        //     }
        // },
        // userIsNameCheck:function(){
        //     var json = {
        //         "command":"user",
        //         "requestType":"userCenter",
        //         "userNo":userInfo.userNo,
        //         "accessToken":userInfo.accessToken
        //     };
        //     root.getInfoByClient(json,this.isNameResult.bind(this));
        // },
        // isNameResult:function(data){
        //     if(data.errorCode == "0000"){
        //         userInfo.mobileId = data.result.mobileId ;
        //         userInfo.certId = data.result.certId ;
        //         util.setCookie("userInfo",JSON.stringify(userInfo),60*24*2) ;
        //     }else{
        //         alertDia("提示",data.message);
        //     }
        // },
        //
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
        // /**
        //  * 提交乐豆接口
        //  */
        // submitJoinGames:function(count){
        //     var jsonParam={
        //         "information": "games",
        //         "command": "submitJoinGames",
        //         "userNo": userInfo.userNo,
        //         "count": count||0
        //     }
        //     root.getDataByAjax(jsonParam, this.submitJoinGamesCallback.bindThis(this))
        // },
        // submitJoinGamesCallback:function(result){
        //
        //     if(result.errorCode=='0000')
        //     {
        //         if(result.data.count!='0')
        //         {
        //             $(".popcontent").show();//乐豆提示
        //             $(".loadingbig").hide();//正在数豆弹窗
        //             $(".LDcont").html(result.data.count); //20乐豆
        //         }else{
        //             this.clearBtn();
        //         }
        //
        //     }else if(result.errorCode=='1003') {
        //         alertDia("温馨提示",result.message)
        //     }else{
        //         //alertDia("温馨提示",result.message)
        //         alertDia("温馨提示", "网络加载失败", {
        //             leftText:"取消",
        //             rightText:"刷新一下",
        //             rightEvent: function () {
        //                // window.location.href="index.html?h5ControlTitle=true&backH5Control=true&clientLogin=true"
        //                 window.location.href=window.location.href;
        //             },
        //             leftEvent:function(){
        //             }
        //         })
        //     }
        // },
        // queryIsJoinGames:function(){
        //     var jsonParam={
        //         "information": "games",
        //         "command": "queryIsJoinGames",
        //         "userNo": userInfo.userNo,
        //     }
        //     root.getDataByAjax(jsonParam, this.queryIsJoinGamesCallback.bindThis(this))
        // },
        // queryIsJoinGamesCallback:function(result){
        //     var that=this;
        //     var date = new Date(systemTime);
        //     var times_q=date.pattern("yyyy/MM/dd")+" "+starttime_q;
        //     var times_h=date.pattern("yyyy/MM/dd")+" "+starttime;
        //     //var times_e=date.pattern("yyyy/MM/dd")+" "+endtime;
        //
        //         if(result.errorCode=='1002') //活动未开始
        //         {
        //             if(date >= new Date(times_q) && date <= new Date(times_h)) {  //活动开始前显示倒计时
        //                 $(".next_dou").hide();//下次降豆时间
        //                 $(".next_btn").hide();   // 立即参显示按钮
        //                 $(".next_linkY").hide(); //黄色按钮
        //                 $(".next_linkB").hide();  //灰色按钮
        //                 $(".next_showtime").show();  //倒计时
        //             }else{
        //                 if(date > new Date("2018/02/16 00:00:00"))
        //                 {
        //                     $(".times_table").html(new Date(date.getTime()).pattern("yyyy年MM月dd")+"日<br />"+starttime+"--"+endtime);
        //                     $(".next_dou").show();//下次降豆时间
        //                     $(".next_showtime").hide();  //倒计时
        //                     $(".next_btn").hide();  // 立即参与
        //                 }else{
        //                     $(".next_dou").hide();//下次降豆时间
        //                     $(".next_btn").show();   // 立即参显示按钮
        //                     $(".next_linkY").hide(); //黄色按钮
        //                     $(".next_linkB").show();  //灰色按钮
        //                     $(".next_showtime").hide();  //倒计时
        //                 }
        //             }
        //         }else if(result.errorCode=='1003'){//活动已经结束
        //
        //             if(date>= new Date(endDate)) //判断是不是最后一天
        //             {
        //                 $(".next_dou").hide();//下次降豆时间
        //                 $(".next_showtime").hide();  //倒计时
        //                 $(".next_btn").show();  // 立即参与
        //                 $(".next_linkB").hide();
        //                 $(".next_linkY").hide();
        //                 $(".next_linkO").show();
        //
        //             }else{
        //                 $(".times_table").html(new Date(date.getTime() + 86400000).pattern("yyyy年MM月dd")+"日<br />"+starttime+"--"+endtime);
        //                 $(".next_dou").show();//下次降豆时间
        //                 $(".next_showtime").hide();  //倒计时
        //                 $(".next_btn").hide();  // 立即参与
        //             }
        //         }else if(result.errorCode=='0000') //可以参加游戏
        //         {
        //             $(".next_showtime").hide();  //倒计时
        //             $(".next_dou").hide();//下次降豆时间
        //             $(".next_linkB").hide();  //灰色按钮
        //             $(".next_btn").show();   // 显示按钮
        //             $(".next_linkY").show(); //黄色按钮
        //         }else if(result.errorCode=='1001'){//今日已经才加过了
        //             $(".times_table").html(new Date(date.getTime() + 86400000).pattern("yyyy年MM月dd")+"日<br />"+starttime+"--"+endtime);
        //             $(".next_dou").show();//下次降豆时间
        //             $(".next_showtime").hide();  //倒计时
        //             $(".next_btn").hide();  // 立即参与
        //         }else if(result.errorCode=='0047'||result.errorCode=='9999'){
        //             alertDia('提示',result.message)
        //         }
        // },
        // /**
        //  * 乐豆弹窗“去看看”  事件
        //  * @param e
        //  */
        // locationhref:function(e){
        //     //$(".next_linkY").hide(); //黄色按钮
        //     //$(".next_linkB").show();  //灰色按钮
        //     $("body").removeClass("body");
        //     $(".bigdiv").hide();  //退出游戏
        //     $(".popcontent").hide();  //退出游戏
        //     window.clearTimeout(window.cleartime);
        //     window.location.href="qmcai://usercenter";
        // },
        // getDatestatic:function(){
        //     root.getTime(function(data){
        //       systemTime=data
        //         var date = new Date(data);
        //         var times_h=date.pattern("yyyy/MM/dd")+" "+starttime;
        //         qmcai.Oaotime(date,times_h,function(e){//倒计时
        //                 qmcai.queryIsJoinGames()
        //         });
        //
        //     })
        //
        // },
        // /**
        //  * 倒计时
        //  * @param now  系统时间
        //  * @param Fun   回调函数
        //  * @constructor
        //  */
        // Oaotime: function (now,endtime,Fun) {
        //     var spanList = $(".showtime");
        //     spanList.oaoTime({'now':now,'endtime':endtime,'Fun':Fun})
        // },
        // /**
        //  * 获取用户信息
        //  * @param userno
        //  * @param accessToken
        //  * @param deviceToken
        //  * @param imei
        //  */
        // clientLogin: function (userno, accessToken, deviceToken, imei) {
        //
        //     if (deviceToken && deviceToken != "") {
        //         util.setCookie("deviceToken", deviceToken, 60 * 24 * 2);
        //     }
        //     if (imei && imei != "") {
        //         util.setCookie("imei", imei, 60 * 24 * 2);
        //     }
        //     //客户端未登录
        //     if (userno == "" || userno == null || accessToken == "" || accessToken == null) {
        //         util.removeCookie("userInfo");
        //         window.userInfo = null;
        //     } else {
        //         userInfo = {
        //             "userNo": userno,
        //             "accessToken": accessToken,
        //             "imei": imei,
        //             "deviceToken": deviceToken
        //         };
        //         util.setCookie("userInfo", JSON.stringify(userInfo), 60 * 24 * 2);
        //         qmcai.userIsNameCheck();
        //     }
        //     qmcai.queryIsJoinGames();
        //
        //
        // },
        // clearBtn:function(){
        //     $("body").removeClass("body");
        //     $(".loadingbig").hide();//正在数豆弹窗
        //     $(".bigdiv").hide();  //退出游戏
        //     $(".popcontent").hide();  //退出游戏
        //     window.clearTimeout(window.cleartime);
        //     qmcai.backledou(true)
        //     this.queryIsJoinGames();//刷新接口状态
        // },
        // headBack: function () {
        //     var that=this;
        //         if($(".bigdiv").css("display")=="block"){
        //             Reciprocal=false;
        //             if(num>0) {
        //                 alertDia("提示", "您真的要离开吗？<br/> 本次获得的乐豆将清零哦<br /><i class='dialogue_s'>（离开后明日8:00前将不能再玩）</i>", {
        //                     leftText: "回到游戏",
        //                     rightText: "无情离开",
        //                     leftEvent: function () {
        //                         Reciprocal = true;
        //                     },
        //                     rightEvent: function () {
        //                         num = 0;
        //                         $("body").removeClass("body");
        //
        //                         $(".bigdiv").hide();  //退出游戏
        //                         window.clearTimeout(window.cleartime);
        //                         qmcai.backledou(true)
        //                         qmcai.submitJoinGames(0)//请求接口  提交游戏所获得的乐豆
        //                     }
        //                 })
        //             }else{
        //                 qmcai.clearBtn();
        //             }
        //
        //         }else{
        //
        //            window.location.href = "qmcai://quit?mainClient=true";
        //
        //         }
        // },
        // appSetJs:function (para) {
        //     var param = JSON.parse(para);
        //     clearTimeout(clearappsetJS)
        //     clearappsetJS=setTimeout(function(){
        //
        //         if(param.type == "2") { //呼起
        //           //  window.location.href= window.location.href;
        //             qmcai.clearBtn();
        //             qmcai.getDatestatic();
        //         }else  if(param.type == "1"){
        //
        //             qmcai.clearBtn();
        //         }
        //     },500);
        // }
    });
    window.isNameResult = qmcai.isNameResult;
    window.clientLogin = qmcai.clientLogin;
    window.headBack = qmcai.headBack;
    window.appSetJs = qmcai.appSetJs;
    window.qmcai= qmcai;
})(window, jQuery)