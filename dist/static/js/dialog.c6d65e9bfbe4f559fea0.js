webpackJsonp([17],{"63NN":function(t,e,n){(function(t){!function(){window.alertDia=function(e,n,a){if(t("#alertTitle").html(e),t("#alertContent").html(n),t("#alertDiv").css("display","block"),a&&(a.leftEvent||a.rightEvent)){var i="";a.jdType,i='<a id="alertLeft" class="frameBtn leftBtn">'+a.leftText+"</a>",i+='<a id="alertRight" class="frameBtn rightBtn">'+a.rightText+"</a>",t("#alertConfirm").html(i),t(document).on("touchend","#alertLeft",function(){t("#alertDiv").css("display","none"),a.leftEvent&&a.leftEvent()}),t(document).on("touchend","#alertRight",function(){t("#alertDiv").css("display","none"),a.rightEvent&&a.rightEvent()})}else t("#alertConfirm").html('<a id="alertSingle" class="frameBtn rightBtn setWidth">知道了</a>'),a&&a.confirmText&&t("#alertConfirm").html('<a id="alertSingle" class="frameBtn rightBtn setWidth">'+a.confirmText+"</a>"),t(document).on("touchend","#alertSingle",function(){a&&a.fnback?a.fnback():t("#alertDiv").css("display","none")})},function(){var e=document.createElement("div");t(e).attr("id","alertDiv"),t(e).addClass("alertDiv"),t(e).css("display","none");var n="";n+='<div id="alertInnerDiv" class="alertInnerDiv"><div class="frameHead">',n+='<h1 id="alertTitle"></h1>',n+='</div><div class="frameBody">',n+='<div id="alertContent" class="frameMain"></div>',n+="</div>",n+='<div id="alertConfirm" class="frameFoot">',n+='<a id="alertSingle" class="frameBtn rightBtn">确定</a>',n+="</div>",n+="</div>",t(e).html(n),document.getElementsByTagName("body")[0].appendChild(e)}()}()}).call(e,n("L7Pj"))}},["63NN"]);
//# sourceMappingURL=dialog.c6d65e9bfbe4f559fea0.js.map