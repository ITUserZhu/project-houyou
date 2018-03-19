/**
 * Created by admin on 2017/7/5.
 */
$(function() {
    var dom = {
        $newRecommendNav: $('.recommend-nav li'),
        $newRecommendItem: $('.recommend-content'),
        $navItem: $('.nav-item')
    };

    // 图片懒加载
    $("img.lazy").lazyload({
        placeholder : "/assets/images/loading.gif", 
        failurelimit : 10,
        effect: "fadeIn",
        threshold : 180
    });
    // 侧边栏初始化
    var sideBar = new esoyu_sideBar({
        item1: {
            selector: '#pc-soft',
            iconClass: 'icon-computer',
            cellText: '电脑软件'
        },
        item2: {
            selector: '#mac-soft',
            iconClass: 'icon-mac',
            cellText: 'MAC软件'
        },
        item3: {
            selector: '#andr-soft',
            iconClass: 'icon-android',
            cellText: '安卓软件'
        },
        goTopIcon: {
            iconClass: 'icon-rocket',
            cellText: '返回顶部'
        },
        watchScroll: true
    });

    // 处理ie8不兼容nth-child选择器
    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.pc-soft .major>li:nth-child(5n)').add('.l-item:nth-child(3n)', '#mac-soft').add('.l-item:nth-child(8n)', '#andr-soft').add('.friend-links a:nth-child(10n)').css('margin-right', '0');

        $('.l-item:nth-child(-n+8)', '#andr-soft').css('margin-top', '0');

    }

    dom.$navItem.each(function(i, ele) {
        $(ele).click(function(e){
            if($(this).hasClass('active')) return;
            var $target = $(e.target).closest('em'),
                _index = $target.index(),
                $targetView = $target.parent().siblings('.views-wrapper').children().eq(_index);
            __commonToggleActive([$target, $targetView]);
         });
    });

    new Swiper('#info-swiper', {
        autoplay: 3000,
        loop : true,
        pagination: '.info-pagi',
        paginationClickable: true
    });

    var $infoList = $('#m-list');
    $infoList.find('li').each(function(i, ele){
        $(this).on('mouseover', function(){
            __commonToggleActive($(this));
        });
    });
    // 默认active
    __commonToggleActive([$('#m-list li').eq(0),$('#andr-lists a').eq(0)]);
    $('.list', '#andr-lists').each(function(i, ele) {
        $(this).on('mouseover', function(){
            __commonToggleActive($(this));
        });
    });
});