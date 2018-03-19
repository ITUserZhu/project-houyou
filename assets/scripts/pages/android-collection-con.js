$(function() {
    $("img.lazy").lazyload({
        placeholder : "/assets/images/loading.gif", 
        effect: "fadeIn",
        threshold : 180
    });

    var $topBanner = $('.banner-wrapper'),
        $topNav = $('#top_nav'),
        $sect = $('.sect'),
        $goToTop = $('.check-page'),
        $li = $topNav.find('.nav-wrapper').children('li'),
        $topLi = $('.top_thumb_nav'),
        sectTop = $sect.eq(0).offset().top,
        $recCols = $('.rec-cols'),
        sectPadd = $sect.css('paddingTop').replace('px', '')/1,
        sectHeight = $sect.height() + sectPadd +  $sect.css('paddingBottom').replace('px', '')/1,
        $index = 0,
        $line = $topNav.find('.line .active-line'),
        array = [],
        widthPer = 9.1,
        banner_top = $topBanner.offset().top + $topBanner.height() - $topNav.height();
    if($recCols.length > 0) {
        var recColsTop = $recCols.offset().top;
    }else {
        var recColsTop = $('.common_footer').offset().top;
    }
    __commonToggleActive($li.eq(0));
    $(window).on('scroll',function() {
        var s_top = $(this).scrollTop();
        if(s_top >= banner_top ) {
            $goToTop.fadeIn();
            $topNav.fadeIn();
            if (s_top < recColsTop) {
                $index = Math.ceil((s_top - banner_top)/sectHeight);
                $line.css('width', (($index - 1 )*widthPer) + '%');
                __commonToggleActive($li.eq($index - 1)); 
            }
        }else {
            $topNav.fadeOut();
        }
    })
    $('#back-top').on('click',function() {
        $('html, body').animate({scrollTop: 0}, 400);
    })
    $li.add($topLi).on('click',function() {
        $index = $(this).index();
        $('html, body').animate({scrollTop: banner_top + sectHeight * $index + 10}, 400);
    })

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
    // 兼容ie8的样式更改
    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        sectHeight = 745;
        $('.top_nav .nav-wrapper').css({'marginLeft': '-600px', 'fontSize': '0'}).children('li').css('paddingTop', '10px');
        $('.banner-cover').css('backgroundImage', 'none');
        $('.sect .inner-wrapper img').css('margin', '65px 0 0 -15px');
        $('.top_nav .line').css({'marginLeft': '-560px', 'marginTop': '8px'});
        $(window).on('scroll',function() {
            $('.top_nav .nav-wrapper li.active').find('img').css({'width': '55px', 'height': '55px'}).parent('li').css('fontSize', '12px').siblings().css('fontSize', '0').find('img').css({'width': '45px', 'height': '45px'});
        })  
        $('.sect .details').css({'width':'685px', })  
        $('.sect:nth-of-type(even) .imgs').css({'float': 'right', 'margin-left': '210px'});   
        $('.sect:nth-of-type(even)').css('background','#f0f0f0');
        $('.sect:nth-of-type(odd) .imgs').css({'float': 'left', 'margin-right': '210px'});  
        $('.top_nav .line').css('width','1100px');
        $('.rec-cols .cols-item .top img').each(function(index, el) {
            $(el).load(function() {
                $(el).css({'position': 'absolute', 'left': '50%', 'marginLeft': -($(el).width()/2)})
            });
        });
        $('.rec-cols .cols-item .lists li:nth-child(6n)').css('marginRight', '0');
    }
});
