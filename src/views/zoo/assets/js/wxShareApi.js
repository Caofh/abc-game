// var wxSdk = require('./common/trans/wxSDK');

import { wxShare } from '@/api/zoo'

var Wx = {
    async init () {
        var apiList = [
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareQZone',
            'onMenuShareQQ',
            'onMenuShareAppMessage',
        ];
        if(api){
            apiList.push.apply(apiList,api);
        };

        const dataList = await wxShare(encodeURIComponent(location.href+'&wxBack=true'))

      console.log(dataList)






        // wxSdk.request('wxSDK', {
        //     type: 'GET',
        //     pathData: {
        //         'url': encodeURIComponent(window.location.href)
        //     },
        //     success: function(res) {
        //         if (res.code == '200') {
        //             wx.config({
        //                 debug:false,
        //                 //debug: !/^www\.sayabc\.com$/i.test(location.hostname), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //                 appId: res.data.app_id, // 必填，公众号的唯一标识
        //                 timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        //                 nonceStr: res.data.nonce_str, // 必填，生成签名的随机串
        //                 signature: res.data.signature, // 必填，签名，见附录1
        //                 jsApiList: apiList
        //             })
        //
        //         }
        //     },
        //     error: function(err) {
        //         console.log(err);
        //     }
        // });
    },
    share:function(opt){
        var shareConfig = {
            'title': opt.title || 'SayABC体验课超值来袭！',
            'desc': opt.content || '100%纯正欧美外教，1对4在线少儿英语课堂，快来抢购吧～',
            'imgUrl': opt.imgUrl || 'https://static.sayabc.com/parentEnd/wx_logo2.png',
            'link' : opt.link || location.href,
            'shareSuccess': opt.shareSuccess || function () {

            }
        };
        console.log('shareConfig',shareConfig);
        wx.ready(function() {
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: shareConfig.title, // 分享标题
                desc: shareConfig.desc, // 分享描述
                link: shareConfig.link.replace(/(info_id=\d+&)|(info_id=\d+)/, ""), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareConfig.imgUrl, // 分享图标
                success: shareConfig.shareSuccess // 分享朋友成功之后的回调函数
            });
            //分享朋友圈
            wx.onMenuShareTimeline({
                title: shareConfig.title, // 分享标题
                link: shareConfig.link.replace(/(info_id=\d+&)|(info_id=\d+)/, ""), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareConfig.imgUrl, // 分享图标
                // success: function() {
                //     // 用户确认分享后执行的回调函数
                //     //_this.wxAdd();
                // }
                success: shareConfig.shareSuccess // 分享朋友圈成功之后的回调函数
            });
        });
    },
    hide:function(api){
        var apiList = [
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:share:qq',
            'menuItem:share:QZone'
        ];
        if(api){
            apiList.push.apply(apiList,api);
        };
        wx.ready(function() {
            wx.hideMenuItems({
                menuList: apiList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        });
    }
}

// export default = Wx;
