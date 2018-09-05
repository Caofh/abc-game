(function($){
	var util = new publicMethod() ;
	var rootMethod = function(){} ;
	var createDiv;
	if(util.getUrlParam("channel") != ""){
		util.setCookie("channel",util.getUrlParam("channel"),60*24) ;
	}
	if(util.getUrlParam("imei") != ""){
		util.setCookie("imei",util.getUrlParam("imei"),60*24) ;
	}
	var productName = util.getUrlParam("productName") ;
	if(productName != "") {
		util.setCookie("productName",productName,60*24*30) ;
	} else {
		productName = util.getCookie("productName") ;
	}
	if(util.getUrlParam("version") != ""){
		util.setCookie("version",util.getUrlParam("version"),60*24) ;
	}
	var version = util.getCookie("version") ;

	var platform = 'html';

	var floagajax=true;
	var host = window.location.host ;
	var url = "http://192.168.1.11";
    //var url = "http://219.143.144.194:4011";

	var pointUrl = url+'/support/bdapi/activity/bean' ;//埋点统计url
	if (host.indexOf("1.11") < 0 && host != "" && host.indexOf(":") <= 0) {
		url = document.location.protocol + "//" + window.location.host;
		pointUrl = document.location.protocol+"//"+window.location.host+"/support/bdapi/activity/bean";
	}
	rootMethod.prototype = {
		url:url,
		pointUrl:pointUrl,

		//js请求
		getDataByAjax:function(param,quizlist){
			var information=param.information;
			var command = param.command;
			param.platform = platform;
			param.version = version;
			param.productName = productName;
			param = JSON.stringify(param) ;
			$(".load_img").show();
			//var accesstokenurl= this.url_zixun+"/"+information+"/sharporder/"+command+"?parameter="+param;
			var accesstokenurl= this.pointUrl+"/"+information+"/"+command+"?parameter="+param;
			$.ajax({
				type:"GET",
				async:true,
				timeout:30000,
				url :accesstokenurl,
				dataType:"jsonp",
			    jsonp:"callback",
				beforeSend: function (XMLHttpRequest) {
					// 禁用按钮防止重复提交

				},
				success:function(result){
					console.log("success");
					$(".load_img").hide();
					quizlist(result);
				},
				error:function(){
					console.log("error");
					$(".load_img").hide();
					var r = {"errorCode":"0047","message":"当前网络较慢,请稍后再试"} ;
					quizlist(r);

				},
				//complete:function(XMLHttpRequest,status){
                //
				//	$(".load_img").hide();
				//	//请求完成后最终执行参数
				//	if(status=='abort'||status=='timeout'){//超时,status还有success,error等值的情况
				//		console.log("complete");
				//		var r = {"errorCode":"0047","message":"当前网络状态不佳，请稍后再试。"};
				//		quizlist(r);
				//	}
				//}
			});
		},
		getTime:function(quizlist) {

			var htsrc = url + '/qmch/systemTime';

			var ajax = $.ajax({
				type:"GET",
				async:true,
				url :htsrc,
				dataType:"jsonp",
				jsonp:"callback",
				success:function(result){
					quizlist(result);
				},
				error:function(){
					var r = 1503632533362;//8月25号中午11点42分的时间，周五
					quizlist(r);
				}
			});
		},
		getInfoByClient:function(param,quizlist){  //查询用户信息通用接口

			if(util.getCookie("channel")){
				param.channel = util.getCookie("channel") ;
			}else{
				param.channel = "" ;
			}
			param.productName = productName ;
			if(util.androidOrIphone() && util.getCookie("deviceToken")){
				param.token = util.getCookie("deviceToken") ;
			}else{
				param.token = "" ;
			}
			if(util.getCookie("imei")){
				param.imei = util.getCookie("imei") ;
			}else{
				param.imei = "" ;
			}
			if(util.getCookie("nowPlatForm")){
				param.platform = util.getCookie("nowPlatForm") ;
			}
			param.version = version ;
			if(util.getCookie("userInfo")){
				param.userNo = util.parse(util.getCookie("userInfo")).userNo ;
			}
			param = JSON.stringify(param) ;
			param = encodeURI(encodeURI(param)) ;
			var accesstokenurl = url + "/qmch/generalRequest?parameter="+param ;
			$.ajax({
				type:"GET",
				async:false,
				timeout:10000,
				url :accesstokenurl,
				dataType:"jsonp",
				jsonp:"callBackMethod",
				success:function(result){
					if(result.errorCode == "1005") {
						var json = {
							"type":"11",
							"postMessage":result.message
						};
						util.jsSetApp(json);
						return ;
					}
					quizlist(result);
				},
				error:function(){
					var r = {"errorCode":"0047","message":"当前网络状态不佳，请稍后再试。"};
					quizlist(r);
				},
				complete:function(XMLHttpRequest,status){
					//请求完成后最终执行参数
					if(status=='timeout'){//超时,status还有success,error等值的情况
						//ajaxTimeOut.abort(); //取消请求
						var r = {"errorCode":"0047","message":"当前网络状态不佳，请稍后再试。"};
						quizlist(r);
					}
				}
			});
		}

	}
	window.rootMethod = rootMethod ;

	function clientBack(){
		headBack() ;
	}
	window.clientBack = clientBack ;
})(jQuery) ;