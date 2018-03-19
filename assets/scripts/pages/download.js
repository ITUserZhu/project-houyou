$(function(){
    __commonToggleActive([$('#tabs .tab').eq(0),$('#tabs').next('.views').children('ul').eq(0)])
    $('#tabs').children().each(function(i, ele){
        var $this = $(this),
            $toggledViews = $this.parent().siblings('.views').children();
        $this.mouseover(function(){
            var _index = $this.index();
            __commonToggleActive([$this, $toggledViews.eq(_index)]);
        });
    });

    // 处理ie8不兼容nth-child选择器
    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.right a:nth-child(8n)', '.cate').css('margin-right', '0');
    }
});