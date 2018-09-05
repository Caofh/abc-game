/**
 * Created by Lenovo on 2017/9/15.
 */
$(function() {

    $.fn.oaoTime= function (obj) {
           this.each(function () {
                var dateStr = obj.endtime||$(this).attr("data-time");
                var endDate = new Date(dateStr.replace(/-/g, "/"));//取得指定时间的总毫秒数
                //now是在动态页面中取得服务器的时间，如果没有定义使用客户端时间
                if (obj.now == undefined) {
                    obj.now = new Date().getDate()
                }
                var tms = (endDate -new Date(obj.now))+3000;//得到时间差
                if (tms < 0) {
                    //alert("时间过期了");
                    return;
                }
                $.oaoTime.timers.push({tms: tms, content: $(this),callback:obj.Fun});
            });
        $.oaoTime.start();
        }

//倒计时的插件
    $.oaoTime = {
//倒计时容器，所有需要倒计时的时间都需要注册到这个容器中，容器中放的是一个object，object描述了倒计时的结束时间，以及显示时间的jquery对象(例如div)
        timers: [],
//全局的一个倒计时状态，init表示初始化状态，start表示运行中状态，stop表示停止状态
        status: 'init',
//计算时间并定时刷新时间的方法，核心代码
        takeCount: function () {
//如果定时器没有启动不执行
            if (this.status != 'start')return;
            setTimeout("$.oaoTime.takeCount()", 1000);
            var timers = this.timers;
            for (var i = 0, j = timers.length; i < j; i++) {
//计数减一
                timers[i].tms -= 1000;

//console.info(timers[i].tms);
//计算时分秒
                var days = Math.floor(timers[i].tms / (1000 * 60 * 60 * 24));
                var hours = Math.floor(timers[i].tms / (1000 * 60 * 60)) % 24;
                var minutes = Math.floor(timers[i].tms / (1000 * 60)) % 60;
                var seconds = Math.floor(timers[i].tms / 1000) % 60;

                if (days < 0)days = 0;
                if (hours < 0)hours = 0;
                if (minutes < 0)minutes = 0;
                if (seconds < 0) seconds = 0;
                if(hours<10)
                {
                    hours="0"+hours;
                }
                if(minutes<10)
                {
                    minutes="0"+minutes;
                }
                if(seconds<10)
                {
                    seconds="0"+seconds;
                }
               // var newTimeText = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
                var newTimeText = hours + ":" + minutes + ":" + seconds + "";
                $(".showtime_1").html(minutes.toString().split('')[0]);
                $(".showtime_2").html(minutes.toString().split('')[1]);
                $(".showtime_3").html(seconds.toString().split('')[0]);
                $(".showtime_4").html(seconds.toString().split('')[1]);

                // if(timers[i])
                // {
                //     timers[i].content.html(newTimeText);
                // }

                if(hours=="00"&&minutes=="00"&&seconds=="00")
                {
                    console.log("--------------------------时间到、执行回调------------"+seconds+"------------")
                    if(typeof timers[i].callback == 'function'){
                        timers[i].callback(timers[i].content)
                        this.timers.splice(i,1);
                    }
                }
            }
           //
        },
        //启动倒计时
        start: function () {
            if (this.status == 'init') {
                this.status = 'start';
                this.takeCount();
            }
        },
        //停止倒计时
        stop: function () {
            this.status = 'stop';
        }
    };

});

