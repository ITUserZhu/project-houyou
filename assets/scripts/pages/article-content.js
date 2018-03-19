$(function(){
    __commonToggleActive([$('#tabs>span').eq(0), $('.toggled-view').eq(0)]);
    var $tabs = $('#tabs').children();
    $tabs.each(function(i, ele){
        var $this = $(this);
        $this.click(function(){
            var _index = $this.index(),
                $toggledView = $this.parent().siblings('.views').children().eq(_index);
            __commonToggleActive([$this, $toggledView]);
             // 处理ie8不兼容nth-child选择器
            if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
                $('.col-lists').each(function(index, el) {
                    $(el).find('li:nth-child(6n)').css('marginRight', '0');
                });
                $toggledView.find('.banner img').css('marginLeft', -$toggledView.find('.banner img').width()/2);
            }
        });
    });
   if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.col-lists').each(function(index, el) {
            $(el).find('li:nth-child(6n)').css('marginRight', '0');
        });
        $('.toggled-view').eq(0).find('.banner img').css('marginLeft', -$('.toggled-view').eq(0).find('.banner img').width()/2);
    }
});