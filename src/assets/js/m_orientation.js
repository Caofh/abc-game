
(function() {
    var html = document.documentElement;
    var setFontSize = function() {
      let width = oriChange() // 获取当前屏幕宽度，适配横屏游戏.

        html.style.fontSize = width / 10 + 'px';
        width = null;
    };
    setFontSize();
    window.addEventListener('resize',function(){
        setFontSize();
    })
    window.addEventListener('orientationchange', function() {
        setFontSize();
    });
})();

// 横竖屏幕切换，适配横屏游戏.
function oriChange () {
  let now_width = document.documentElement.clientWidth,
    now_height = document.documentElement.clientHeight

  let width = ''

  if ( now_width >= now_height ) { // 横屏
    width = now_width || document.getBoundingClientRect().width;
  } else {
    width = now_height || document.getBoundingClientRect().height;

    return width
  }
}