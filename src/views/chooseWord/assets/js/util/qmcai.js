/**
 * Created by Lenovo on 2017/9/11.
 */

import load from '../../img/load.png'

var qmcai = {};

qmcai.View=function(obj){
  this.initialize=function(){
    this.init();
    this.bind();
    this.loadingPng();

  }
  this.bind=function(){
    var obj=!!this.events?this.events:"";
    var element,fn,arrel,type
    for(var x in obj)
    {
      arrel=x.split(/\s+/);
      fn=eval(obj[x].replace(/\s/g,""));
      type=arrel.slice(0,1)[0];
      element=arrel.slice(1,arrel.length).join(" ");
      // this.addEvent(type,element,fn.bindThis(this));
    }
  }
  /**
   * 旋转的loading
   */
  this.loadingPng=function(){
    var createDiv=$("<div class='load_img' style='display: none;'><div class='loading_png'></div></div>");
    $("body").append(createDiv);
    $("body").append($("<img src='"+load+"' alt='' style='display: none' />"))

  },
    this.isPassive=function() {
      var supportsPassiveOption = false;
      try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () {
            supportsPassiveOption = true;
          }
        }));
      } catch(e) {}
      return supportsPassiveOption;
    };
  this.addEvent=function (type,el, fn, capture) {
    $(document).on(type,el,fn)
  };
  this.removeEvent=function (type, el, fn) {
    $(document).off(type,el,fn)
  };
  /**
   * 绑定this指向
   * @param thisObj   当前this
   * @returns {*}     执行事件并返回当前this
   */
  Function.prototype.bindThis = function(thisObj) {
    var _func = this;
    var _params = Array.prototype.slice.call(arguments, 1);
    if (!Function.prototype.bind) {

      if (typeof this !== "function") {
        throw new TypeError("当前this不是一个function");
      }
      // 获取函数调用者（bindThis方法的第一个参数）
      var  _this = thisObj;
      // 返回一个函数，外部变量通过持有这个函数引用保存_func,_this,_params这三个闭包变量,并随时执行函数以调用下面语句。
      return function(){
        var _localParams = Array.prototype.slice.call(arguments);
        _params = _params.concat(_localParams);
        _func.apply(_this, _params); // 实现函数调用
      };
    }
    else {
      return _func.bind(thisObj);
    }
  };
  /**
   * 时间格式化扩展
   * @param fmt
   * @returns {*}
   */
  Date.prototype.pattern=function(fmt) {
    var o = {
      "M+" : this.getMonth()+1, //月份
      "d+" : this.getDate(), //日
      "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
      "H+" : this.getHours(), //小时
      "m+" : this.getMinutes(), //分
      "s+" : this.getSeconds(), //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S" : this.getMilliseconds() //毫秒
    };
    var week = {
      "0" : "/u65e5",
      "1" : "/u4e00",
      "2" : "/u4e8c",
      "3" : "/u4e09",
      "4" : "/u56db",
      "5" : "/u4e94",
      "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
  _.templateSettings={
    evaluate : /\{{([\s\S]+?)\}}/g,
    interpolate : /\{{=([\s\S]+?)\}}/g,
    escape : /\{{-([\s\S]+?)}}/g
  };
  /**
   *滑动时阻止touchend事件触发
   * @param ele   滑动区域的父元素
   * @returns {boolean}  false 阻止
   */
  this.makeTouchableButton=function(ele) {
    if (!ele) {
      console.error("MIGlobals.makeTouchableButton 无效的元素！");
      return false;
    }
    ele.addEventListener("touchstart", function(evt){
      this.setAttribute("data-moved", "n");
      var p = evt.touches[0];
      this.setAttribute("data-touch-start-clientx", p.clientX);
      this.setAttribute("data-touch-start-clienty", p.clientY);
    });
    ele.addEventListener("touchmove", function(evt){
      if (this.getAttribute("data-moved") == "y") return false;

      var p = evt.touches[0];
      var startClientX = parseInt(this.getAttribute("data-touch-start-clientx"), 10);
      var startClientY = parseInt(this.getAttribute("data-touch-start-clienty"), 10);
      var deltax = p.clientX - startClientX;
      var deltay = p.clientY - startClientY;
      if (Math.abs(deltax) > 10 || Math.abs(deltay) > 10) {
        this.setAttribute("data-moved", "y");
      }
    });
    ele.addEventListener("touchend", function(evt) {

      if (this.getAttribute("data-moved") == "y") {
        evt.stopImmediatePropagation();
        return false;
      }
    });

  }
  _.mixin({
    bubbleSort :function (array){
      var _array = array.concat();

      for (var i = 0, len = _array.length; i < len; i++)
        for (var j = 0; j < len - 1 - i; j++)
          if (_array[j] > _array[j + 1])
            this.swap(_array, j, j + 1);
      return _array;
    },
    swap:function(array, a, b) {
      var tmp = array[a];
      array[a] = array[b];
      array[b] = tmp;
    }
  });
  _.extend(this,obj);
  this.initialize();
}


export default qmcai