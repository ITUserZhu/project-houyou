$(function() {
    var $checkNav = $('.nav'),
        $rank = $('.rank-item'),
        $leftnava = $('.left-nav.active');
        $leftnav = $('.left-nav');

    var $item = $('.rank-item.active').children('li.lis'),
        newArr = [];
    $checkNav.click(function(e) {
        var _index = $(e.target).index();
        __commonToggleActive([$(e.target), $rank.eq(_index), $leftnav.eq(_index)]);

        $item = $('.rank-item.active').children('li.lis');
        getHeightArr();

    })
    

    getHeightArr();

    function getHeightArr() {
        newArr = [];
        $.each($item,function(index, el) {
            if($(el).length > 0) {
                newArr.push($(el).offset().top)
            }
        });
    }

    $leftnav.on('click', 'li', function(event) {
        event.preventDefault();
        var _index = $(this).index();
        $('body, html').animate({scrollTop: newArr[_index]}, 300); 
    });


    $(window).on('scroll',function() {
        var scrollTop = $(document).scrollTop();
        for (var i = 0; i < newArr.length; i++) {
            var height_0 = newArr[0],
                height_1 = newArr[i],
                height_2 = newArr[i+1];
            if(height_0 > scrollTop) {
                currentIndex = -1;
                break;
            } else if(!height_2 || (height_1 <= scrollTop && height_2 > scrollTop)) {
                currentIndex = i;
                break;
            }    
        }
        currentIndex >= 0 ? $('.left-nav.active').children('li').removeClass('active').eq(currentIndex).addClass('active'): $('.left-nav.active').children('li').removeClass('active');
    })
});
