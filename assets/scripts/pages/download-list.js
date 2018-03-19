$(function(){
    $('.lists-over').children().each(function(i, ele){
        $(this).on('mouseover', function(){
            __commonToggleActive($(this));
        });
    });
    __commonToggleActive($('.lists-over.active').children('li').eq(0));
    $('.filters').children('span').on('click',function(e) {
        $index = $(e.target).index();
        __commonToggleActive([$(e.target), $('.lists-over').eq($index),$('.lists-over').eq($index).children('li').eq(0)]);
    })

    // 处理ie8不兼容nth-child选择器
    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('li:nth-child(odd)', '.ol-soft').css('margin-right', '20px');
    }
});