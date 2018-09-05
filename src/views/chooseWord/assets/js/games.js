/**
 * Created by Lenovo on 2017/12/19.
 */

import img_3 from '../../assets/img/3.png'
import img_z from '../../assets/img/z.png'
import img_xs from '../../assets/img/xs.png'

(function (window, $) {

    var win = (parseInt($("body").css("width"))) - 60;

    console.log(win)

    var flag=true;
    var ledoucount=0;
    var numz = 4;

    $(".couten").css("height", $(document).height());
    $(".backward").css("height", $(document).height());
    $(".ledoucontent").css({
        'height':$(window).height(),
        "overflow":'hidden'
    })
    var imgpic=new Image()
    // var douimgstr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABuCAMAAADI4meSAAAC9FBMVEUAAAD72An91wf92Af90Af9xgj84An82wj90gX92Ab8wQj9wwf93Qf81wn80wj9xQf9xQf9xwf9yAj83wn9yQb84An9wwj9xAf8xgn9xwj9yAf8yAj83wj91wX9yAb9xwb+2QT65Az83gj+2AP9xAf65Az9xgj8xQf74wz83gf9xgf83wj8yQn8ygn74wv83gf83gj74Qr74gv9yQX8zwr9yAb74Qr9yAf8zAj81gj9xQj/1gL83Qf93Qb64wz8wwj74gv84An/1QL93Af+2QT74gz/1gL84An+1wP+1wL9yQb8zAr84An8yQj9ygf9yQb9zAf+1wP9yQX9yQb84Ar93Af9ygb9yQj74gv83Qj8xgn65A392gj9xQf65A39yAf74Qr9xwb74Qr92wX+1wP65A390Qb65Az9xgb9xgf+2QT83gj9xwb9yQb8wgn+1wP+1wP64wz64wz74Ar8wAn+1wL92gX83Qf+2AT+1QH64wz92wb83gn74Ar/1AH74Qr74gv8vwn73wn65A3++c782gj9wwj8vgnhqjrTkAb9xwf++c3+zAT73wP8xgj8vQn++c/TjwT83AH92wDiqzz93wj+4wb74QXhqDz93gf/0QL++tf75wz+/OL+ygX+0AP/0wLgqDXUkgr80Qj9yQfiqzn8zAjSjgf+1QX/4AH++9795Tj85jLpuCv/5Qj90wj74QH++tr++tP++dH+85/jrjbntS/75B/84R3Ymhn75Qv91wjRjAf84gb+3QX+zgT+/Ob++ML974D86EHlsTPepS/74xj63Qv61gr8zgrbnwrWlAf+9rX961796UzhqTjsvSfaniHwxh/yyhr74hHWlhH9xQjuwwjfpgfYmQfRigf+4Ab83gH+9r399Kb+8pD962f96VjcoSn84yTtwiP21BD64wj94Qj0zwj/3gP+/On++9n++Mn+9ar974j85Cn83xj20RLpuAflswf+8pf97XT0zBbxyQjxxwjmsgjquwfntQcDIGROAAAAdHRSTlMA/goFA9c2IxkI9+5KFQ734qGDdjcm++fRnX54UjArJgz95eTg3M3KycjGvqujm5eAfGpoY15YQDsS/fz79/Xy8e7t6tvX19GflpOKhXNuYldUSUVDPiEe+fLr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";
    // var douimgstr = 'data:image/png;base64,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'
    var douimgstr = 'data:image/png;base64,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'

  $(document).on("touchstart",'.ledoucontent .canvasevent',stopanimation);

    var add = function() {
        var hb = durationValue(randomFloat(9, 1))
        var Wh = durationValue(randomFloat(60, 20)) //随机大小
        var Left = durationValue(randomFloat(win, 0))
        var rot = durationValue(randomFloat(640, -640))+"deg";
        var bfb = durationValue(randomFloat(0.8, 0.3));
        var fadeAndDropDuration = durationValue(randomFloat(3.2, 5.2));
        var canvas;
        num++;
        if(hb=="3")
        {
            imgpic.src = img_3
            Wh=70;

        }else{

            imgpic.src = douimgstr
        }
        imgpic.width=Wh;
        imgpic.height=Wh;
        canvas=convertImageToCanvas(imgpic)
        canvas.id='canvas'+num;

        canvas.setAttribute("class","canvas"+hb+" canvasevent");
        canvas.setAttribute("data-width",Wh);
        $(canvas).css({
            'transition-duration':'0ms',
            '-webkit-transition-duration':'0ms',
            'transition': 'transform 0ms, opacity 0s',
            '-webkit-transition': 'transform 0ms, opacity 0s',
            'transform': 'translate3d('+Left+'px,-60px,0px) rotate(' + Wh + 'deg)',
            '-webkit-transform': 'translate3d('+Left+'px,-60px,0px) rotate(' + Wh + 'deg)',
        });
        $(".ledoucontent").append(canvas);
        setTimeout(function(){
            $(canvas).css({
                'transition-duration': (120-Wh)*100+'ms',
                '-webkit-transition-duration': (120-Wh)*100+'ms',
                'transition': 'transform '+(120-Wh)*100+'ms, opacity 0s',
                '-webkit-transition': 'transform '+(120-Wh)*100+'ms, opacity 0s',
                'transform': 'translate3d('+Left+'px,'+($(document).height()+100)+'px,0px) rotate(' + rot + ')',
                '-webkit-transform': 'translate3d('+Left+'px,'+($(document).height()+100)+'px,0px) rotate(' + rot + ')'
            })
        },200)
        window.cleartime=setTimeout(add,150)//乐豆数量
    }
    /**
     *
     */

    var clearcanvasFun=function() {
        var timeoutcanvs = setTimeout(function () {
            //$(".ledoucontent").find('canvas').first().remove();
            if (!$(".ledoucontent").find('canvas').length) {
                clearTimeout(timeoutcanvs)
                return;
            }
            if (!!$(".ledoucontent").find('canvas').first().get(0) && _inView($(".ledoucontent").find('canvas').first().get(0)) == false) {
                $(".ledoucontent").find('canvas').first().remove();
            }
            clearcanvasFun();

        }, 150)
    }
    //乐豆
    var num = 10;
    //倒数计时
    var backward = function(){

        numz--;
        if(numz>=0){

            if(numz==0){
                $(".tjld_div").hide();
                $(".tjld_span").hide();
                $(".tjld_ks").show();

            }else{
                $(".backward").show();
                $(".tjld_div").hide();
                $(".tjld_span").show();
                $(".tjld_ks").hide();
                $(".backward span").html(numz);
            }
        }else{
            $(".backward").hide();
        }
        var wardtime=setTimeout(backward,1000)
        if(numz<0)
        {
            clearTimeout(wardtime)
            clearcanvasFun();
            numz=4;
        }
    }

    function durationValue(value) {
        return parseInt(value) ;
    }
    function randomFloat(low, high) {
        return low + Math.random() * (high - low);
    }
    function stopanimationend(){
        flag=true;
    }
    var imagestest= new Image();

    function stopanimation(event){
        $(event.currentTarget).removeClass("canvasevent");
        var startTop=$(event.target).offset().top;
        var startLeft=$(event.target).offset().left;
        var wid=$(event.currentTarget).data("width");
        if($(event.currentTarget).hasClass("canvas3"))
        {
            imagestest.src = img_z;
            imagestest.width=wid;
            imagestest.height=wid;
            $(event.currentTarget).attr('width',wid);
            $(event.currentTarget).attr('height',wid);
            $(event.currentTarget).get(0).getContext("2d").drawImage(imagestest, 0, 0,wid,wid);
            $(event.currentTarget).css({
                'opacity':0,
                'transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
                '-webkit-transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
                'transition': 'transform 0s, opacity 2.8s',
                '-webkit-transition': '-webkit-transform 0s, opacity 2.8s'
            })
            setTimeout(function(){
                $(event.currentTarget).remove()
            },2800)
            ledoucount=ledoucount-2;
            if(ledoucount<=0){
                ledoucount=0;
            }
            $(".gamenumber").html(ledoucount);
        }else{

            imagestest.src = img_xs;
            imagestest.width=wid;
            imagestest.height=wid;
            $(event.currentTarget).attr('width',wid);
            $(event.currentTarget).attr('height',wid);
            $(event.currentTarget).get(0).getContext("2d").drawImage(imagestest, 0, 0,wid,wid);
            $(event.currentTarget).css({
                'opacity':0,
                // 'transition-duration':'0ms',
                // '-webkit-transition-duration':'0ms',
                'transition': 'transform 0s, opacity 800ms',
                '-webkit-transition': 'transform 0s, opacity 800ms',
                'transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
                '-webkit-transform': 'translate3d('+startLeft+'px,'+startTop+'px,0px)',
            })
            setTimeout(function(){
                $(event.currentTarget).remove()
            },400)
            ledoucount++
            $(".gamenumber").html(ledoucount);
        }
    }

    function convertImageToCanvas(image,winth,height) {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0,image.width,image.height);

        return canvas;
    }
    var _inView = function(el) {
        if(!el)
        {
            console.error("无效的元素！");
            return false;
        }else{
            var coords = el.getBoundingClientRect();
            return ((coords.top >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(0));

        }
    };
    window.addel=add;
    window.backward=backward;
})(window, jQuery)