'use strict';

$(function () {
    // 点击弹出大图
    var bigImgItem = $('.other-pic').children('ul'),
        $conImg = $('.con-img'),
        $poppedUp = $('#popped-up'),
        $poppedImgWra = $('#popped-img-wra');

    bigImgItem.clone().appendTo('#popped-img-wra');
    var imgItemWidth = $poppedImgWra.find('li').width(),
        imgItemLen = $poppedImgWra.children('ul').children('li').length;
    $poppedImgWra.children('ul').width(imgItemWidth * imgItemLen);

    $conImg.click(function (event) {
        var _index = $(this).index();
        $poppedImgWra.children('ul').css('marginLeft', -_index * imgItemWidth + 'px');
        __commonToggleActive($poppedImgWra.children('ul').children('li').eq(_index), 'cur');
        $poppedUp.fadeIn();
    });
    // 弹出大图切换功能
    $poppedUp.click(function (event) {
        var $target = $(event.target).closest('div'),
            _index = $poppedImgWra.find('li.cur').index();

        if ($target.is('.close')) {
            $poppedUp.fadeOut();
            return;
        } else if ($target.is('.prev-btn')) {
            _index--;
            if (_index < 0) {
                return;
            };
        } else if ($target.is('.next-btn')) {
            _index++;
            if (_index > imgItemLen - 1) {
                return;
            };
        }
        $poppedImgWra.children('ul').animate({
            marginLeft: -_index * imgItemWidth + 'px'
        }, 400);
        __commonToggleActive($poppedImgWra.children('ul').children('li').eq(_index), 'cur');
    });

    // 内容图片切换
    var $conImgWra = $('.img-wra'),
        $conImgUl = $conImgWra.find('ul'),
        conImgLen = $conImgUl.children('li').length,
        conImgWidth = $conImgWra.find('.img').width(),
        $wraAtlas = $('.other-pic'),
        $AtlasUl = $wraAtlas.find('ul'),
        switcherWidth = $wraAtlas.find('li').outerWidth() / 1 + 12,
        atlasIndex = 0,
        $nextAtlasWra = $('.next-atlas');

    $conImgWra.click(function(e) {
        var _index = $(this).find('li.active').index();
        var $target = $(e.target).closest('div');
        if($target.is('.prev-btn')) {
            if(_index < 1) {
                $conImgWra.hide();
                $nextAtlasWra.show();
                return;
            };
            _index--;
        }else if ($target.is('.next-btn')) {
            if(_index > conImgLen - 2) {
                $conImgWra.hide();
                $nextAtlasWra.show();
                return;
            };
            _index++;
        }
        
        atlasIndex = Math.floor(_index/6)
        $AtlasUl.animate({
            marginLeft: -atlasIndex * (switcherWidth * 6) + 'px'
        }, 400);

        __commonToggleActive([$conImgUl.children('li').eq(_index), $AtlasUl.children('li').eq(_index)]);
        $conImgUl.animate({
            marginLeft: -_index * conImgWidth + 'px'
        }, 400);
    });

    // 更多图片切换
    
    $AtlasUl.width($wraAtlas.find('li').length * switcherWidth);

    $wraAtlas.click(function (event) {
        if($(event.target).closest('li').length > 0) {
            $conImgWra.show();
            $nextAtlasWra.hide();
            var _index= $(event.target).closest('li').index();
            __commonToggleActive([$(event.target).closest('li'), $conImgUl.children('li').eq(_index)])
            $conImgUl.stop().animate({
                marginLeft: -_index * conImgWidth + 'px'
            }, 400);
            return;
        }
        var $target = $(event.target).closest('div'),
            len = Math.ceil($wraAtlas.find('li').length / 6);
        if ($target.is('.arr-left')) {
            atlasIndex--;
            if (atlasIndex < 0) {
                atlasIndex++;
                return;
            };
        } else if ($target.is('.arr-right')) {
            atlasIndex++;
            if (atlasIndex > len - 1) {
                atlasIndex--;
                return;
            }
        }
        $AtlasUl.animate({
            marginLeft: -atlasIndex * (switcherWidth * 6) + 'px'
        }, 400);
    });


    // 收藏
    var $collect = $('#collect'),
        model = $('#model'),
        model_id = model.data('model'),
        res_id = model.data('id'),
        model_title = model.data('title'),
        colData = {
            title: model_title,
            model_id: model_id,
            res_id: res_id,
            is_click: false
        };
    $collect.on('click',function(){
        colData.is_click = true;
        collect(colData);
    });

    collect(colData);

    function collect (data) {
        $.ajax({
            url: '/collection',
            type: 'POST',
            data: data,
        })
        .done(function(msg) {
            switch (msg.message) {
                case '已收藏':
                    $collect.find('em').text('已收藏')
                    $collect.find('i').css('color','red')
                    break;
                case '未收藏':
                    $collect.find('em').text('点击收藏')
                    $collect.find('i').css('color','#fff')
                    break;
                case '收藏成功':
                    $collect.find('em').text('已收藏')
                    $collect.find('i').css('color','red')
                    break;
                case '取消收藏':
                    $collect.find('em').text('点击收藏')
                    $collect.find('i').css('color','#fff')
                    break;
                case '用户未登陆':
                    if (!data.is_click) {
                        $collect.find('em').text('点击收藏')
                        $collect.find('i').css('color','#fff')
                    }else {
                        $collect.find('em').text('点击收藏')
                        $collect.find('i').css('color','#fff')
                        $('#login-btn').click();
                    }
                    break;
                default:
                    break;
            }
        })
        .fail(function(error) {
            console.log(error);
        })
    };
    setTimeout(function() {
        $.ajax({
            url: '/tools/stat/' + model_id + '/' + res_id,
            type: 'GET',
            success: function(msg) {
                return;
            }
        });
    },1000)
});