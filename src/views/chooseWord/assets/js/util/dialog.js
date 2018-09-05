(function(){
	function init(){
		var alertDiv = document.createElement("div") ;
		$(alertDiv).attr("id","alertDiv") ;
		$(alertDiv).addClass("alertDiv") ;
		$(alertDiv).css("display","none") ;

		var html = "" ;
		html += '<div id="alertInnerDiv" class="alertInnerDiv"><div class="frameHead">' ;
		html += '<h1 id="alertTitle"></h1>' ;
		html += '</div><div class="frameBody">' ;
		html += '<div id="alertContent" class="frameMain"></div>' ;
		html += '</div>' ;

		html += '<div id="alertConfirm" class="frameFoot">' ;
		html += '<a id="alertSingle" class="frameBtn rightBtn">确定</a>' ;
		html += '</div>' ;

		html += '</div>' ;
		$(alertDiv).html(html) ;

		document.getElementsByTagName("body")[0].appendChild(alertDiv);
	}

	//弹框调用方法
	function alertDia(title,content,json){
		$("#alertTitle").html(title) ;
		$("#alertContent").html(content) ;
		$("#alertDiv").css("display","block") ;

		if(json && (json.leftEvent || json.rightEvent)){//弹框下面有两个选择按钮
			var html = "";
			if(json.jdType){
				html = '<a id="alertLeft" class="frameBtn leftBtn">'+json.leftText+'</a>' ;
				html += '<a id="alertRight" class="frameBtn rightBtn">'+json.rightText+'</a>' ;
			}else{
				html = '<a id="alertLeft" class="frameBtn leftBtn">'+json.leftText+'</a>' ;
				html += '<a id="alertRight" class="frameBtn rightBtn">'+json.rightText+'</a>' ;
			}
			$("#alertConfirm").html(html) ;


			$(document).on("touchend","#alertLeft",function(){
				$("#alertDiv").css("display","none") ;
				if(json.leftEvent){
					json.leftEvent() ;
				}
			});

			$(document).on("touchend","#alertRight",function(){
				// console.log("1---------") ;
				$("#alertDiv").css("display","none") ;
				if(json.rightEvent){
					json.rightEvent() ;
				}
			}) ;
		}else{//弹框下面一个选择按钮
			$("#alertConfirm").html('<a id="alertSingle" class="frameBtn rightBtn setWidth">知道了</a>') ;
			if(json && json.confirmText){
				$("#alertConfirm").html('<a id="alertSingle" class="frameBtn rightBtn setWidth">'+json.confirmText+'</a>') ;
			}

			$(document).on("touchend","#alertSingle",function(){
				if(json && json.fnback){
					json.fnback() ;
				}else{
					$("#alertDiv").css("display","none") ;
				}
			})

		}	
	}
	window.alertDia = alertDia ;

	//点击弹框以外的区域，消除弹框
	function ifDisapper(evt){
		var obj = evt.target ;
		var flag = true ;

		while(obj.parentNode){
			if(obj.parentNode.id == "alertDiv"){
				flag = false ;
				break ;
			}else{
				obj = obj.parentNode ;
			}
		}

		if(flag){
			$("#alertDiv").css("display","none") ;
			$("#alertDiv").unbind() ;
			$("#alertInnerDiv").css("margin-top","-5rem") ;
		}
	}

	init() ;
})() ;