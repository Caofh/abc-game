webpackJsonp([4],{"71K3":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("8O0P");var r=n("rxcl"),i=n.n(r);n("IvJb").default.component(i.a.name,i.a);var o={name:"gameStart",methods:{beginGame:function(){console.log(this,"this is "),this.$router.push("userInfo")}}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"box"},[e("div",{staticClass:"begin"},[e("mt-button",{staticClass:"begin-button",on:{click:this.beginGame}},[this._v("PLAY")])],1)])},staticRenderFns:[]};var a={name:"GameStart",components:{gameStart:n("C7Lr")(o,s,!1,function(t){n("bl3h")},"data-v-7428b3c4",null).exports}},u={render:function(){var t=this.$createElement;return(this._self._c||t)("gameStart",{tag:"components"})},staticRenderFns:[]};var c=n("C7Lr")(a,u,!1,function(t){n("7s6M")},"data-v-5b4873a9",null);e.default=c.exports},"7s6M":function(t,e){},"8O0P":function(t,e){},ULuq:function(t,e){},bl3h:function(t,e){},rxcl:function(t,e,n){t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=211)}({0:function(t,e){t.exports=function(t,e,n,r,i){var o,s=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,s=t.default);var u,c="function"==typeof s?s.options:s;if(e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns),r&&(c._scopeId=r),i?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},c._ssrRegister=u):n&&(u=n),u){var l=c.functional,d=l?c.render:c.beforeCreate;l?c.render=function(t,e){return u.call(e),d(t,e)}:c.beforeCreate=d?[].concat(d,u):[u]}return{esModule:o,exports:s,options:c}}},109:function(t,e){},132:function(t,e,n){var r=n(0)(n(54),n(178),function(t){n(109)},null,null);t.exports=r.exports},17:function(t,e){t.exports=n("ULuq")},178:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"mint-button",class:["mint-button--"+t.type,"mint-button--"+t.size,{"is-disabled":t.disabled,"is-plain":t.plain}],attrs:{type:t.nativeType,disabled:t.disabled},on:{click:t.handleClick}},[t.icon||t.$slots.icon?n("span",{staticClass:"mint-button-icon"},[t._t("icon",[t.icon?n("i",{staticClass:"mintui",class:"mintui-"+t.icon}):t._e()])],2):t._e(),t._v(" "),n("label",{staticClass:"mint-button-text"},[t._t("default")],2)])},staticRenderFns:[]}},20:function(t,e,n){"use strict";var r=n(132),i=n.n(r);Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"default",function(){return i.a})},211:function(t,e,n){t.exports=n(20)},54:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(17),e.default={name:"mt-button",methods:{handleClick:function(t){this.$emit("click",t)}},props:{icon:String,disabled:Boolean,nativeType:String,plain:Boolean,type:{type:String,default:"default",validator:function(t){return["default","danger","primary"].indexOf(t)>-1}},size:{type:String,default:"normal",validator:function(t){return["small","normal","large"].indexOf(t)>-1}}}}}})}});
//# sourceMappingURL=4.d32787c4b77c42945690.js.map