$(function(){
    var $softsList = $('#abs-r'),
        $softsListLi = $softsList.find('li'),
        $softsListImgs = $('#abs-t').children(),
        $contentList = $('#banner-content').children(),
        $bgBlur = $('#bg-blur'),
        curListIndex = 0;

    $("img.lazy").lazyload({
        placeholder : "/assets/images/loading.gif", 
        effect: "fadeIn",
        threshold : 180
    });
    // 顶部banner区域点击切换图片、内容、背景图
    $softsList.click(function(e){
        var $target = $(e.target);
        if ($target.is('.prev-btn')) {
            if (curListIndex === 0) return;
            trackCurrentIndex(curListIndex - 1);
        } else if ($target.is('.next-btn')) {
            if (curListIndex === $softsListLi.length - 1) return;
            trackCurrentIndex(curListIndex + 1);
        } else if ($target.is('span')) {
            var index = $target.parent('li').index();
            trackCurrentIndex(index);
        }
    });

    trackCurrentIndex(curListIndex);

    function trackCurrentIndex(index) {
        curListIndex = index;

        // 切换图片及内容
        __commonToggleActive([$softsListLi.eq(curListIndex), $softsListImgs.eq(curListIndex), $contentList.eq(curListIndex)]);

        // 切换外层盒子背景图
        var src = $softsListImgs.eq(curListIndex).attr('src');
        $bgBlur.css({
            'background': 'url(' + src + ') center center no-repeat',
            'background-size': '1200px'
        });

        // ul列表监听curListIndex的值，达到临界值时触发滚动
        var $ul = $softsList.find('ul'),
            liHeight = $softsListLi.eq(0).outerHeight();
        if(curListIndex > 3) {
            var _index = Math.min(curListIndex - 3, $softsListLi.length - 7);
            $ul.css('top', _index * liHeight * -1 + 'px');
        } else {
            $ul.css('top', 0);
        }
    }

    $('.filters').children().each(function(i,ele){
        var $this = $(this);
        $this.click(function(){
            var _index = $this.index(),
                $targetView = $this.parents('.sect').find('.toggled-view').eq(_index);
            __commonToggleActive([$this, $targetView])
        })
    });
    $('.sect.apps-sect').each(function(index, el) {
        __commonToggleActive($(el).find('.apps-lists').children('li').eq(0));
    });

    var softsSwiper = new Swiper('#softs-swiper', {
        slidesPerView: 2,
        
    });
    $('#softs-swiper').on('click', function(e) {
        var $target = $(e.target).closest('i.icon-arrow');
        if ($target.is('.prev-btn')) {
            softsSwiper.swipePrev(); 
        }else if ($target.is('.next-btn')){
            softsSwiper.swipeNext(); 
        }
    })


    var gamesSwiper = new Swiper('#games-swiper', {
        slidesPerView: 2,
    });

    $('#games-swiper').on('click', function(e) {
        var $target = $(e.target).closest('i.icon-arrow');
        if ($target.is('.prev-btn')) {
            gamesSwiper.swipePrev(); 
        }else if ($target.is('.next-btn')){
            gamesSwiper.swipeNext(); 
        }
    })

    var $lists = $('.apps-lists li', '.apps-sect');
    if($lists.length > 0) {
        $lists.each(function(i, ele){
            var $this = $(this);
            $this.on('mouseover', function(){
                __commonToggleActive($this);
            });
        });
    }

    // 兼容ie8的处理
    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.sect .views li:nth-child(6n), .cols-item .lists li:nth-child(6n), .views .toggled-view li:nth-child(6n), .apps-lists li:nth-child(6n), .apps-sect li:nth-child(5n)').css('marginRight', '0');
        $('.views.list .toggled-view li:nth-child(-12n+12)').css('marginBottom', '475px');
        $('.andr-banner .content .left').css('textAlign','center');
        $('.cols-item .top img').each(function(index, el) {
            $(el).load(function() {
                $(el).css({'position': 'absolute', 'left': '50%', 'marginLeft': -($(el).width()/2)})
            });
        });
        $('.andr-banner .content .left img').each(function(index, el) {
           $(el).css('marginLeft', '0'); 
        });
    }
});