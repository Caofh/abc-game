import axios from 'axios'

var log = (function () {

  var _fun = function (spec) {

    spec = spec || {};

    var iTimeOut = spec.reqTimeout || 30000;
    var pageSign = spec.pageSign || window.pageSign;
    if (!pageSign) {
      pageSign = window.pageSign = Math.random().toString().slice(-10);
    }
    var deviceId = localStorage.getItem('deviceId') ;
    if (!deviceId) {
      deviceId = Math.random().toString().slice(2) + Math.random().toString().slice(2);
      localStorage.setItem('deviceId', deviceId);
    }

    var qos = {


      getQosCache: function(event_id) {
        var oQosCache = localStorage.qosCache || '{}';
        try {
          oQosCache = JSON.parse(oQosCache);
        } catch (error) {
          oQosCache = {};
        }

        return event_id ? oQosCache[event_id] : oQosCache;
      },
      saveQosCache: function(oQos) {
        var oQosCache = this.getQosCache();
        if (!oQos.event_id) {
          throw new Error('oQos.event_id do not is null ');
        }
        oQosCache[oQos.event_id] = oQos;
        localStorage.qosCache = JSON.stringify(oQosCache);
      },

      delQosCache: function(event_id) {
        // console.log('delQos : ', event_id);
        if (event_id) {
          var oQosCache = this.getQosCache();
          if (event_id.forEach) {
            event_id.forEach(function (id) {
              delete oQosCache[id];
            });
          }else{
            delete oQosCache[event_id];
          }

          this.cacheQosIntoDb(oQosCache);
        }
      },

      cacheQosIntoDb: function(oCache) {
        oCache = oCache || {};
        var iLimit = 200;
        var oQosNew = {};
        var aQosId = Object.keys(oCache);
        if (aQosId.length > iLimit) {
          aQosId = aQosId.slice(-iLimit); // cache 超过 200 条时，将之前的去掉
          aQosId.forEach(function(k) {
            oQosNew[k] = oCache[k];
          });
          oCache = oQosNew;
        }
        localStorage.qosCache = JSON.stringify(oCache);
      },

      createAndCacheQos: function(oData, notSignLoading) {
        try {

          if (!this.checkRepeat(oData)) {
            return;
          }
          // console.log('qosData: ', oData);
          var data = this.createData(oData);
          data.event_id = pageSign + '_' + Math.random().toString().slice(2) + '_' + (+new Date());
          // console.log('qos_add_base_data:', data)

          if (!notSignLoading) {
            data.loading = +new Date();
          }
          this.saveQosCache(data);

          console.log(" logToQos: ", data.sub_event, data, Object.assign({}, data.extra, {stack: new Error().stack}));
          delete data.loading;

        } catch (error) {

        }
        return data;
      },

      checkRepeat: function (oData) {
        var checkRepeat = this.checkRepeat;
        var bOK = true;
        var sD = oData.sub_event || oData.subEvent;
        var me = this;
        checkRepeat.iMStartTime = checkRepeat.iMStartTime || 0;

        if (checkRepeat.num
          && sD == checkRepeat.tmp
          && +new Date() - checkRepeat.iMStartTime < 10000
        ) {
          checkRepeat.num++;
          if (checkRepeat.num > 15) {
            if (checkRepeat.timer) {
              bOK = false;
            }else{
              checkRepeat.timer = setTimeout(function() {
                checkRepeat.num = 1;
                delete checkRepeat.timer;
              }, 60000);
            }
          }

        }else if(sD != checkRepeat.tmp){
          clearTimeout(checkRepeat.timer);
          delete checkRepeat.timer;
          checkRepeat.num = 1;
        }
        checkRepeat.tmp = sD;
        checkRepeat.iMStartTime = +new Date();

        return bOK;
      },

      killQosCache: function(does, iG) {
        iG = iG || 10;// 一次 kill 掉缓存池里的 iG 条监控
        var oQosCache = this.getQosCache();
        var aQosId = Object.keys(oQosCache).reverse();
        var aKillQos = aQosId.filter( function (uuid) {
          return !oQosCache[uuid].loading;
        }).slice(-iG);

        aKillQos.forEach(function(uuid) {
          var oQos = oQosCache[uuid];
          oQos.loading = +new Date();
          if (!oQos.event_id) {
            delete oQosCache[uuid];
          }
        });
        this.cacheQosIntoDb(oQosCache);
        aKillQos.forEach(function(uuid) {
          // console.log('killQos : ', uuid);
          var oQos = oQosCache[uuid];
          delete oQos.loading;
          does(oQos);
        });
      },


      resetQosCacheLoading: function() {
        // console.log('resetQosCacheLoading');

        var oQosCache = this.getQosCache();
        var aRestQos = Object.keys(oQosCache).filter(function(uuid){
          return oQosCache[uuid].loading < (+new Date() - iTimeOut);
        });
        // console.log(aRestQos);

        aRestQos.forEach(function(uuid) {
          delete oQosCache[uuid].loading;
        });
        this.cacheQosIntoDb(oQosCache);
      },

      logErr: function(err, notSignLoading) {
        var me = this.logErr;
        try {
          me.logedArr = me.logedArr || [];
          me.logedArr = me.logedArr.slice(-10);// 最新10条中有一条一样的错误数据，就不重复提交
          var stack = (err && err.stack) || '';
          var sErrContent = stack + location.href;
          if (!me.logedArr.some(function(sEd) {
              return sEd === sErrContent;
            })) {
            this.createAndCacheQos({
              event: 'SYS',
              subEvent: 'FE_ERR',
              eventType: 'SYS',
              extra: {
                url: location.href,
                msg: location.pathname,
                info: err && (err.message || err.toString()),
                desc: stack.slice(0, 500),
              }
            }, notSignLoading);
            me.logedArr.push(sErrContent);
          }
        } catch (error) {}
      },

      mixClassData: function(oData) {
        var oRoomInfo = {};
        if (window.globalParams && window.globalParams.get) {
          oRoomInfo = window.globalParams.get('room_info') || {};
        }
        oData.extra = oData.extra || {};
        oData.extra.lesson_id = oData.extra.lesson_id || oRoomInfo.sn || getUrlParam('lesson_no');
        if (oData.extra.lesson_id) {
          if (oRoomInfo && 'lessonPageIndex' in oRoomInfo) {
            oData.extra.status = oRoomInfo.lessonPageIndex;
          }
        }else{
          delete oData.extra.lesson_id;
        }

        if (oRoomInfo) {
          oData.user_id = oData.user_id || oRoomInfo.userid;
          oData.classroom_id = oData.classroom_id || getUrlParam('classroom_id') || oRoomInfo.roomid;
          oData.user_type = oData.user_type || oRoomInfo.role;
          if (oData.user_type == 1) {
            oData.user_type = 'teacher';
          }else if (oData.user_type == 3) {
            oData.user_type = 'fireman';
          }else if (oData.user_type == 2 || oData.user_type == 0) {
            oData.user_type = 'student';
          }
        }

        oData.device_id = oData.device_id || deviceId || '';
        oData.extra.url = oData.extra.url || location.pathname;

        return oData;
      },

      buildEvt: function (eventData) {

        var data = {
          event: eventData.event, // 事件
          event_type: eventData.eventType, //事件类型
          sub_event: eventData.subEvent, // 子事件
          user_id: eventData.userId || eventData.uid,  // 用户 id
          web_page_version: "dddd", // 前端页面版本
          extra: eventData.extra ? eventData.extra : {} //其他信息搜集，针对不同的业务场景
        };

        return data;
      },

      createData: function(eventData) {
        var data;
        var baseData = {
          event: eventData.event, // 事件
          event_type: eventData.eventType, //事件类型
          sub_event: eventData.subEvent, // 子事件
          event_time: eventData.eventTime || +new Date(), // 事件创建时间
          user_agent: window.navigator.userAgent, // user agent
          device_id:  eventData.deviceId || this.deviceId || "", // 设备信息
          screen_width: window.screen.width, // 屏幕宽度
          screen_height: window.screen.height, // 屏幕高度
          os: this.platformMatch()[1],  // 操作系统
          browser: this.match()[1], // 浏览器
          event_id: eventData.event_id,
        };
        data = this.buildEvt(eventData);

        for (const k in baseData) {
          data[k] = data[k] || baseData[k];
        }

        return data;
      },
      match: function () {
        // If an UA is not provided, default to the current browser UA.
        var ua = window.navigator.userAgent.toLowerCase()

        var match = /(edge)\/([\w.]+)/.exec(ua) ||
          /(opr)[/]([\w.]+)/.exec(ua) ||
          /(chrome)[ /]([\w.]+)/.exec(ua) ||
          /(iemobile)[/]([\w.]+)/.exec(ua) ||
          /(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
          /(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
          /(webkit)[ /]([\w.]+)/.exec(ua) ||
          /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
          /(msie) ([\w.]+)/.exec(ua) ||
          ua.indexOf('trident') >= 0 && /(rv)(?::|)([\w.]+)/.exec(ua) ||
          ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
          []
        return match
      },
      platformMatch: function () {
        var ua = window.navigator.userAgent.toLowerCase()

        var platformMatch = /(ipad)/.exec(ua) ||
          /(ipod)/.exec(ua) ||
          /(windows phone)/.exec(ua) ||
          /(iphone)/.exec(ua) ||
          /(kindle)/.exec(ua) ||
          /(silk)/.exec(ua) ||
          /(android)/.exec(ua) ||
          /(win)/.exec(ua) ||
          /(mac)/.exec(ua) ||
          /(linux)/.exec(ua) ||
          /(cros)/.exec(ua) ||
          /(playbook)/.exec(ua) ||
          /(bb)/.exec(ua) ||
          /(blackberry)/.exec(ua) ||
          []
        return platformMatch
      }
    };

    var c = function (spec) {
      this.url = spec.url;
      this.listUrl = spec.listUrl;
      this.ajax = spec.ajax;
      spec.buildEvt && (this.buildEvt = spec.buildEvt);
      this.deviceId = deviceId;
    };
    c.prototype = qos;
    var oQos = new c(spec);

    var monitor = {

      qos(oData) {
        if (oData && oData.subEvent) {
          oData = oQos.createAndCacheQos(oData, true);
        }
      },

      reqQos(oData) {
        if (!oData) {
          return;
        }
        if (!oData.forEach) {
          oQos.ajax(oQos.url, oData)
            .then((res) => {
              if (res.result == 'CREATED' || res.result == 'EXCEPTION') {
                oQos.delQosCache(oData.event_id);
                // console.log(" 统计成功 === ", oData);
              }
            })
            .catch((err) => {
              // console.log(err)
            })
          ;
        }else{
          oQos.ajax(oQos.listUrl, oData)
            .then((res) => {
              if (res.result == 'CREATED' || res.result == 'EXCEPTION') {
                oQos.delQosCache(oData.map(o=>o.event_id));
                // console.log(" 统计成功 === ", oData);
              }
            })
            .catch((err) => {
              // console.log(err)
            })
          ;
        }

      }

    };

    if (!_fun.inited) {

      setInterval(function () {// 将超时（iTimeOut）的请求重新放入待发池
        oQos.resetQosCacheLoading();
      },iTimeOut+5);


      setInterval(function () {
        var aQos = [];
        oQos.killQosCache(function (oQ) {
          aQos.push(oQ);
        },20);
        aQos.length && monitor.reqQos(aQos);
      },spec.reqGap || 10000);

      _fun.inited = true;
    }

    return {
      fire: function (evt) {// 立刻发出log
        var oR;
        if (evt.forEach) {
          oR = evt.map(function (oQ) {
            oQosData = oQos.createAndCacheQos(oQ);
            return oQosData;
          });
        }else{
          oR = oQos.createAndCacheQos(evt);
        }
        monitor.reqQos(oR);
      },
      log: function (evt) {// 建立log，会定期发出
        monitor.qos(evt);
      }
    };
  };

  return _fun;
})();



// 使用测试环境的Qos数据库
var targetUrl = '//qos-test.esfilter.sayabc.com/api/v1/es/qos' // 测试环境
var targetListUrl = '//qos-test.esfilter.sayabc.com/api/v1/es/qos/bulk' // 测试环境

var oLog = log({
  url: targetUrl,
  listUrl: targetListUrl,
  ajax: function (url, data) {
    // console.log('url', url)

    return  axios.post(
      url,
      JSON.stringify(data),
      { headers: {'Content-Type': 'application/json;charset=UTF-8' } }
    ).then(r=>r.data);

  },
  buildEvt: function (eventData) {

    var data = {
      web_page_version: '',
      event_type: eventData.event_type || eventData.eventType || 'ABC_GAME',
      extra: eventData.extra ? eventData.extra : {} //其他信息搜集，针对不同的业务场景
    };


    return data;
  }
});

// oLog.fire();


export default oLog;


