$(function(){
    // 动态获取内容图片添加到截图
    var arr_img = [],
        check_img = $('.banner-swiper');
    $.each($('.fr-view').find('img').not('.dl-img'), function(index, item) {
        if($(item).hasClass('fr-bordered')){
            arr_img.push($(item).clone());
            return;
        }else {
            arr_img.push($(item))
        }
    });
    $("img.lazy").lazyload({
        placeholder : "/assets/images/loading.gif", 
        effect: "fadeIn",
        threshold : 180
    });
    $.each(arr_img, function(index, el) {
        $('<li class="swiper-slide"></li>').append($('<div class="img-wrapper"></div>').append($(el))).appendTo(check_img)
    });
    var Andrfalg = true;
    var header_swiper = new Swiper('#swiper', {
        slidesPerView: 3,
        loop: true,
        autoplay: 3000,
        onSlideChangeStart: function(swiper){
            checkAct();
        },
        onSlideChangeEnd: function(swiper){
          Andrfalg = true;
        }
    });

    $('#swiper').on('click', function(e) {
        if(Andrfalg) {
           var $target = $(e.target).closest('i.icon-arrow');
            if ($target.is('.prev-btn')) {
                header_swiper.swipePrev(); 
                Andrfalg = false;
            }else if ($target.is('.next-btn')){
                header_swiper.swipeNext(); 
                Andrfalg = false;
            } 
        }
        
    })
    checkAct()
    function checkAct() {
        var $Swiperlis = $('#swiper').find('li'),
            $SwiperLen = $Swiperlis.length,
            actIndex;
        $Swiperlis.each(function(index, el) {
            if ($(el).hasClass('swiper-slide-active')) {
               actIndex = $(this).index(); 
            }
        });
        if( actIndex >= $SwiperLen - 1) {
            actIndex = -1;
        }
        __commonToggleActive($('#swiper').find('li').eq(actIndex + 1))
    }

    $('.check-btn').on('click',function(e){
        var $target = $(e.target).closest('span'),
            $index = $target.index();
        __commonToggleActive([$('.dl-btns').children('a').eq($index), $target]);
    })
    $('.banner').find('li.swiper-slide').hover(function(e) {
        var $target = $(e.target).closest('li');
        header_swiper.stopAutoplay();
        $target.stop(true,false).animate({top: '-150px'}, 400);
    },function(e) {
        var $target = $(e.target).closest('li');
        header_swiper.startAutoplay();
        $target.stop(true,false).animate({top: '0'}, 400);
    })

    var softs_swiper = new Swiper('#softs-swiper', {
        slidesPerView: 4
    });
    $('#softs-swiper').on('click', function(e) {
        var $target = $(e.target).closest('i.icon-arrow');
        if ($target.is('.s-prev-btn')) {
            softs_swiper.swipePrev(); 
        }else if ($target.is('.s-next-btn')){
            softs_swiper.swipeNext(); 
        } 
                
    })

    var banner_top = $('.footnotes').offset().top + $('.footnotes').height(),
        $topNav = $('#top_nav'),
        navArr = [],
        curIndex = 0;  
    $topNav.find('li').not('.pc-down, .phone-down').each(function(index, el) {
        navArr.push($('#'+$(el).attr('data-nav')).offset().top - 60);       
    });
    navShow(navArr)
    $('.waving-break').on('click',function() {
        var newArr = [];
        $(this).toggleClass('active');
        $(this).parent('.container').toggleClass('active');;
        $topNav.find('li').not('.pc-down, .phone-down').each(function(index, el) {
            newArr.push($('#'+$(el).attr('data-nav')).offset().top - 65); 
        });
        navShow(newArr)
    })
    function navShow(arr) {
        $(window).on('scroll',function() {
            var s_top = $(this).scrollTop();
            if(s_top >= banner_top ) {
                $topNav.fadeIn();
                for(var i = 0; i < arr.length; i++) {
                    var height_1 = arr[i],
                        height_2 = arr[i+1];
                    if(height_1 > s_top) {
                        break;
                    }
                    if(!height_2 || (height_1 <= s_top && height_2 > s_top)) {
                        curIndex = i;
                        break;
                    }
                }
                __commonToggleActive($topNav.find('li').eq(curIndex));
                
            }else {
                $topNav.fadeOut();
            }
        })
    }
    $topNav.on('click',function(e) {
        var $target = $(e.target).closest('li').not('.pc-down, .phone-down'),
            posTo = $target.attr('data-nav');
        $('body,html').animate({
            scrollTop: $('#'+ posTo).offset().top - 60 }, 400);
    });

    // 广告地址
    var d_title = keywords.split(','),
        d_down_link;
    d_down_link = 'http://url.7wkw.com/down/'+ d_title[0].replace(/[ ]/g, '') +'@301_'+ soft_id +'.exe';
    $('#down-one').attr('href', d_down_link);
    $('#down-one-other').attr('href', d_down_link);

    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('li:nth-child(5n)', '.ranking').css('margin-right', '0');
    }


    
    // 处理ie8
    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.banner .s-container .swiper-slide, .rl-softs .swiper-slide .img-wrapper').css('backgroundImage', 'none');
        $('.banner .s-container .swiper-slide, .rl-softs .swiper-slide .img-wrapper').find('img').css({'position': 'relative','left': '-50%', 'top': '-50%'})
        $('#code').hide();
        $('.top_nav .banner-cover').css({'backgroundImage': 'none', 'filter': 'none', 'backgroundColor': '#666'});
        $('.top_nav .nav-wrapper li.active').css('color','#08a')
    }else {
        // 二维码
        $("#code, #code2").qrcode({
            width: 100,
            height:100,
            text: $("link[rel=alternate]").attr("href")
        }); 
    }
});