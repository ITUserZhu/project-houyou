/**
 * Created by admini on 2017/3/15.
 */
//首页banner
$(function(){
    var Sfalg = true;
    var mySwiper = new Swiper('.swiper-container',{
        loop:true,
        slidesPerView : 3,
        offsetSlidesAfter : 2,
        speed:800,
        pagination : '.pagination',
        autoplay:3000,
        spaceBetween: 50,
        paginationClickable :true,
        onSlideChangeStart: function(swiper) {
            $('.swiper-container').find('.swiper-slide-active').next('li').addClass('active').siblings().removeClass('active');
        },
        onSlideChangeEnd: function(swiper){
          Sfalg = true;
        }
    });
    $('.swiper-container').find('.swiper-slide-active').next('li').addClass('active').siblings().removeClass('active');
    $('.swiper-container').on('click', function(e) {
        if(Sfalg) {
            var $target = $(e.target).closest('span.icon-arrow');
            if ($target.is('.prev-btn')) {
                mySwiper.swipePrev(); 
                Sfalg = false;
            }else if ($target.is('.next-btn')){
                mySwiper.swipeNext(); 
                Sfalg = false;
            }
        }
        $(this).find('.swiper-slide-active').next('li').addClass('active').siblings().removeClass('active');
    })
    var winWidth = $(window).width(),
        baseHeight = 200,
        percent = baseHeight / winWidth,
        $swiperContainer = $('#swiper-container');
    $(window).on('load resize', function(){
        var newSize = Math.max($(window).width(), 1200),
            newHeight = parseInt(newSize * percent);
        $swiperContainer.height(newHeight);
        mySwiper.reInit();
    });

    var $rankLists = $('.rank-list');
    $rankLists.each(function() {
        var $lis = $(this).children();
        $lis.each(function(i, ele){
            $(ele).on('mouseover', function(){
                __commonToggleActive($(ele));
            });
        });
    });
});
//首页排行轮播
$(function(){
    $(".lsr1").on("click",".lsr-btn li",function(){
        var ind=$(".lb1 li").index(this);
        var $imgWidth = $(".lsr-main ul").width();
        index=ind;
        $(this).addClass("on-btn").siblings().removeClass("on-btn");
        $(this).parent().prev(".lsr-main").stop().animate({"left":-$imgWidth*ind});
    });
    $(".lsr2").on("click",".lsr-btn li",function(){
        var ind=$(".lb2 li").index(this);
        var $imgWidth = $(".lsr-main ul").width();
        index=ind;
        $(this).addClass("on-btn").siblings().removeClass("on-btn");
        $(this).parent().prev(".lsr-main").stop().animate({"left":-$imgWidth*ind});
    });
});
// 最新更新切换播放
var $svg = $('.point-page svg'),
    $conWra = $('.con-wra'),
    $newitem = $conWra.children('dd.l-u');

var pNum = 282.783,
    pTimer;
$svg.on('click',function() {
    var index = $(this).index();
    if(index == 0) {
        $conWra.animate({
            left: 0},
            400);
    }else {
        $conWra.animate({
            left: '-1200px'},
            400);
    }
    clearInterval(pTimer);

    $(this).find('.p-p-r').css('stroke-dashoffset', 0)
    $(this).siblings().find('.p-p-r').css('stroke-dashoffset', 282.783)
});
runRound($svg.first());
function runRound(el) {
    var index = el.index();
    pTimer = setInterval(function(){
        pNum --;
        el.find('.p-p-r').css('stroke-dashoffset', pNum);
        if(pNum <= 0) {
            clearInterval(pTimer);
            pNum = 282.783;
            el.find('.p-p-r').css('stroke-dashoffset', pNum);
            if(index == 0) {
                $conWra.animate({
                    left: '-1200px'},
                    400);
                runRound($($svg.eq(1)))
            }else {
                $conWra.animate({
                    left: 0},
                    400);
                runRound($($svg.eq(0)))
            }
        }
    },20)
}




/*首页装机必备添加title*/
$('.m-a-txt').each(function(i){
	$('.m-area').eq(i).attr('title',$(this).html());
})

$(function(){
        var $nav = $('#nav-hook').children(),
            constWidth = $('#list-keyboard').width(),
            transform = 'transform' || '-webkit-transform' || '-ms-transform' || '-moz-transform' || '-o-transform';
        $.each($nav, function(index, element) {
            $(element).on('click', function() {
                if($(this).hasClass('active')) return;
                triggerAnimation($(this).find('[class*="icon-software"]'));
                toggleClass($('#list-' + $(this).data('nav')));
                $('.active').find('[class*="icon-software"]').css({
                    fontSize: 20
                });
                toggleClass($(this));
            })
        });

        function triggerAnimation(el) {
            $(el).css({
                fontSize: 0
            });
            $(el).animate({
                fontSize: 32
            }, 200);
            $(el).animate({
                fontSize: 30
            }, 200);
        }

        function toggleClass(el) {
            $(el).addClass('active').siblings().removeClass('active');
        }
    });