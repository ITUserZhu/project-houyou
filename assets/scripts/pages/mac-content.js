/**
 *
 *VIP页选项卡
 *
 * **/
$(function () {
    var pmb = $(".page-main-btn").offset().top + 50;
    var pmb1 = $(".page-main-btn").offset().top - 200;
    $(document).ready(function () {
        $('#n1,#x1').click(function () {
            for (i = 1; i < 6; i++) {
                $("#c" + i).css("display", "block");
            }
            for (i = 1; i < 6; i++) {
                $("#p" + i).css("display", "block");
            }
            for (i = 1; i < 6; i++) {
                $("#n" + i).removeClass("curr");
            }
            $('#n1').addClass("curr");
            $("html,body").scrollTop($("#p1").offset().top - 30);
        });
        $('#n2,#x2').click(function () {
            $("#c1,#p1").css("display", "none");
            $("#c2,#p2").css("display", "block");
            for (i = 1; i < 6; i++) {
                $("#n" + i).removeClass("curr");
            }
            $('#n2,#p2').addClass("curr");
            $("html,body").scrollTop($("#p2").offset().top - 30);
        });
        $('#n3,#x3').click(function () {
            $("#c1,#p1").css("display", "none");
            $("#c2,#p2").css("display", "none");
            $("#c3,#p3").css("display", "block");
            for (i = 1; i < 6; i++) {
                $("#n" + i).removeClass("curr");
            }
            $('#n3').addClass("curr");
            $("html,body").scrollTop($("#p3").offset().top - 30);
        });
        $('#n4,#x4').click(function () {
            $("#c1,#p1").css("display", "none");
            $("#c2,#p2").css("display", "none");
            $("#c3,#p3").css("display", "none");
            $("#c4,#p4").css("display", "block");
            for (i = 1; i < 6; i++) {
                $("#n" + i).removeClass("curr");
            }
            $('#n4').addClass("curr");
            $('#x4').addClass("cur");
            $("html,body").scrollTop($("#p4").offset().top - 30);
        });
        $('#n5,#x5').click(function () {
            $("#c1,#p1").css("display", "none");
            $("#c2,#p2").css("display", "none");
            $("#c3,#p3").css("display", "none");
            $("#c4,#p4").css("display", "none");
            $("#c4,#p4").css("display", "block");
            for (i = 1; i < 6; i++) {
                $("#n" + i).removeClass("curr");
            }
            $('#n5').addClass("curr");
            $('#x5').addClass("cur");
            $("html,body").scrollTop($("#comment_wrapper").offset().top - 30);
        });
    });
    $(window).scroll(function () {
        var wst = $(window).scrollTop() + 60;
        if ($("#p1").offset().top <= wst) {
            $('.page-main-btn2 span').removeClass("cur");
            $("#x1").addClass("cur");
        }
        if ($("#p2").offset().top <= wst) {
            $('.page-main-btn2 span').removeClass("cur");
            $("#x2").addClass("cur");
        }
        if ($("#p3").offset().top <= wst) {
            $('.page-main-btn2 span').removeClass("cur");
            $("#x3").addClass("cur");
        }
        if ($("#p4").offset().top <= wst) {
            $('.page-main-btn2 span').removeClass("cur");
            $("#x4").addClass("cur");
        }
    });
    $(".page-main-btn2 span").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
    });
    $(document).scroll(function () {
        if ($(this).scrollTop() >= pmb) {
            $(".page-main-btn2").css({"top": "57px", "left": "50%"});
            $(".page-main-btn2").css({"display": "block"});
            $(".page-main-btn2 span").css({"top": "3px"})
        } else {
            $(".page-main-btn2").css({});
            $(".page-main-btn2").css({"overflow": "initial", "display": "none"});
            $(".page-main-btn2 span").css({"top": "0"})
        }
    });

    // 报错
    var errStr = '<div class="error-box">'
                +'<p class="error-name">错误反馈</p>'
                +'<p class="error-title">'
                +'请简要描述您遇到的错误，并留下联系方式，我们将尽快予以修正。'
                +'</p>'
                +'<label><input type="radio" value="无法下载" name="info" class="ipt-radio" checked>无法下载</label>'
                +'<label><input type="radio" value="版本不对" name="info" class="ipt-radio">版本不对</label>'
                +'<label><input type="radio" value="版权投诉" name="info" class="ipt-radio">版权投诉</label>'
                +'<label><input type="radio" value="其他" name="info" class="ipt-radio">其他</label>'
                +'<label class="textarea">'
                    +'<textarea class="text-ipt" placeholder="请填写您的问题..."></textarea>'
                +'</label>'
                +'<div class="error-bottom">'
                    +'<input type="button" value="提交" class="ipt">'
                    +'<p class="error_text common_ovh"></p>'
                +'</div>'
                +'<span class="click-toggle">关闭</span>'
            +'</div>';
    $('.error').on('click',function(){
        $('body').append(errStr);
        $('.click-toggle').on('click',function(){
            $('.error-box').remove();
        })
        $('.error-box .ipt-radio').on('change',function() {
            var $radio = $('input:radio[name="info"]:checked').val();
            if($radio == '其他' || $radio == '版权投诉') {
                $('.textarea').fadeIn(400);
                $('label').not('.textarea').animate({left: -100},400);
            }else {
                $('.textarea').fadeOut(400);
                $('label').not('.textarea').animate({left: 0},400);
            }
        })
        
        $('.error-box .ipt').on('click',function(event){
            event.preventDefault();
            var content = $(".text-ipt").val(),
                model_id = $('.mac-topic-download').attr('data-model'),
                val = $('.ipt-radio:checked').val();
            if ((val == '其他'||val =='版权投诉') && !content  ) {
                $('.error_text').text('请描述您的问题！');
                return false;
            }
            
            $.ajax({
                url: '/report',
                type: 'POST',
                data: {
                   content:content,
                   error_type: val,
                   model_id: model_id
                },
                dataType: 'json',
                success: function(data){
                    if(data.code == 200){
                        $(".text-ipt").val('');
                        $('.error_text').text('提交成功，感谢您的反馈').css('color','green')
                        setTimeout(function(){
                            $('.error-box').remove();
                        },1000)
                    }else{
                        $('.error_text').text(data.message)
                    }
                },
                error: function(error){
                    console.log(error)
                }
            });
        })
    });
});
/*
 *
 *内容页浮动块
 *
 * **/
$(function () {
    var top = $(".page-main-tab").offset().top;
    $(document).scroll(function () {
        if ($(this).scrollTop() > top) {
            $(".page-float").css({"display": "block"});
        } else {
            $(".page-float").css({"display": "none"});
        }
    });
});

$(function() {
    // 缓存dom树
    var dom = {
        $_heart: $('.icon-heart'),
        $_text : $('.collect-text'),
        $_textBox: $('.col-text-big'),
        $_navItem : $('.info-item'),
        $dataModelHook: $('.mac-topic-download'),
        $_star: $('.star-item'),
        $_starWrapper: $('#grade-star'),
        $_addVip: $('.vip-download'),
        $addBig: $('#add-col-big'),
        data :{
            title: $('.mac-topic-download').attr('data-title'),
            cat_id: $('.mac-topic-download').attr('data-cate')/1,
            res: $('.mac-topic-download').attr('data-model') + '-' + $('.mac-topic-download').attr('data-res'),
            is_click: false
        }
    }
    // 收藏
    function collect (data) {
        $.ajax({
            url: '/collection',
            type: 'POST',
            data: data,
        })
            .done(function(msg) {
                switch (msg.message) {
                    case '已收藏':
                        dom.$_text.text('已收藏')
                        dom.$_textBox.text('已收藏')
                        dom.$_heart.css('animation-play-state','paused')
                        break;
                    case '未收藏':
                        dom.$_text.text('点击收藏')
                        dom.$_textBox.text('点击收藏')
                        dom.$_heart.css('animation-play-state','running')
                        break;
                    case '收藏成功':
                        dom.$_text.text('已收藏')
                        dom.$_textBox.text('已收藏')
                        dom.$_heart.css('animation-play-state','paused')
                        break;
                    case '取消收藏':
                        dom.$_text.text('点击收藏')
                        dom.$_textBox.text('点击收藏')
                        dom.$_heart.css('animation-play-state','running')
                        break;
                    case '用户未登陆':
                        if (!data.is_click) {
                            dom.$_text.text('点击收藏')
                            dom.$_textBox.text('点击收藏')
                            dom.$_heart.css('animation-play-state','running')
                        }else {
                            dom.$_text.text('点击收藏')
                            dom.$_textBox.text('点击收藏')
                            dom.$_heart.css('animation-play-state','running')
                            $('#login-btn').click();
                        }
                        break;
                    default:
                        dom.$_text.css({'right': '-116px','width': '120px'}).text('收藏失败，请重试');
                        break;
                }
            })
            .fail(function(error) {
                console.log(error);
            })
    }
    collect(dom.data);

    dom.$_heart.add(dom.$addBig).on('click',function(){
        dom.data.is_click = true;
        collect(dom.data);
    });

    // 加入会员
    dom.$_addVip.on('click',function() {
        $.ajax({
            url: '/member_login',
            type: 'POST'
        })
            .done(function(data) {
                if(data.code == 200) {
                    location.href = '/Mac/vip'
                }else {
                    $('.login-btn').click();
                }
            })
            .fail(function(error) {
                console.log(error);
            })
    })

    // 菜单切换
    dom.$_navItem.on('click',function() {
        __commonToggleActive(this)
    });

    /*// 页面加载时向后端提交点击量+1
    $.ajax({
        url: '/tools/stat/' + dom.$dataModelHook.attr('data-model') + '/' + dom.$dataModelHook.attr('data-res'),
        type: 'GET',
        success: function(msg) {
            return;
        }
    });*/

    // 点赞点踩
    var $_upDown = $('.up-down'),
        $_like = $('.like'),
        $_dislike = $('.dislike'),
        submitting = 0,
        model_id = dom.$dataModelHook.attr('data-model'),
        res_id = dom.$dataModelHook.attr('data-res'),
        goodNum = $('.like').data('num'),
        badNum = $('.dislike').data('num');

    $_like.find('.num').text(goodNum);
    $_dislike.find('.num').text(badNum);
    function zan(goodNum, badNum, like) {
        if($_upDown.data('void') != '0') {
            return false;
        }
        if(submitting) {
            return false;
        }
        $.ajax({
            url: '/tools/res_support',
            type: 'POST',
            dataType: 'json',
            data: {model_id: model_id, res_id: res_id, like: like},
            beforeSend: function(){
                submitting = 1;
            },
            success:function(data) {
                if(data.code == 200) {
                    $_upDown.data('voted', '1').unbind();
                    $_like.find('.num').text(goodNum);
                    $_dislike.find('.num').text(badNum);
                }else{
                    alert('您已评价过')
                }
            }
        })
    }

    $_like.on('click', function() {
        zan(goodNum+1, badNum, 1)
    })
    // 点踩
    $_dislike.on('click', function() {
        zan(goodNum, badNum+1, 0)
    })

    // 点击下载
    var download_btn = $('#download_btn, .float-btn'),
        down_id = dom.$dataModelHook.attr('data-model'),
        down_res = dom.$dataModelHook.attr('data-res'),
        wran_block = $('.tips-cover'),
        down_text = $('.tips-content'),
        down_off = $('.off'),
        down_one = $('.choose-one'),
        down_two = $('.choose-two'),
        btn_one = $('.btn-point'),
        btn_two = $('.btn-vip');

    down_off.on('click', function() {
        btn_one.unbind('click');
        btn_two.unbind('click');
        wran_block.fadeOut();
    })

    var payHtml = '<div class="recharge" id="recharge">'
            +'<div class="pay" id="recharge-pay">'
            +'<div class="cont">'
            +'<div class="types-wrapper">'
            +'<div class="types" id="payTypesHook">'
            +'<span class="type-item active">VIP充值</span>'
            +'<span class="type-item">积分充值</span>'
            +'</div>'
            +'<div class="close" id="close">X</div>'
            +'<div class="money-choose">'
            +'<ul class="item-warpper active clearfix" id="vip-hook">'
            +'</ul>'
            +'<ul class="item-warpper clearfix" id="points-hook">'
            +'</ul>'
            +'</div>'
            +'</div>'
            +'<div class="money-choose">'
            +'<p class="should-pay-num">充值方式 ：</p>'
            +'<div class="types-wrapper">'
            +'<div class="types pay-type-wrapper">'
            +'<span class="pay-type type-item wechart active">微信支付</span>'
            +'<span class="pay-type type-item alipay">支付宝</span>'
            +'</div>'

            +'<div class="pay-scan active">'
                +'<div class="ewm">'
                    +'<img src="/assets/images/loadcode.gif" alt="" id="preload-gif">'
                    +'<img src="" id="ewm">'
                +'</div>'
                +'<div class="pay-num">应付金额 ： <span class="num"></span>元</div>'
                +'<div class="intro-img">'
                    +'<img src="/assets/images/wechat-tutorial.png" class="active">'
                +'</div>'
            +'</div>'
            +'<div class="pay-scan">'
                +'<div class="ali-logo">'
                    +'<img src="/assets/images/ali-pay-logo.png" alt="">'
                    +'<span class="intro">支付宝扫码，安全、快捷</span>'
                    +'<span class="pay-num">支付：<em class="p-text-orange pay-price">50</em>元</span>'
                +'</div>'
                +'<form action="/pay_ali" method="post" accept-charset="utf-8">'
                    +'<input name="id" value="9" type="hidden" id="ali_pay">'
                    +'<button class="btn-ali">立即订购</button>'
                +'</form>'
            +'</div>'

            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>';

    function vipOrPoint(type) {
        vipChargeData = {
            'vip': [],
            'points': []
        };
        $('#recharge').remove();
        loadVipData(type);
        var html = addPayBox();
        $('.page').append(html);
        $('#close').on('click', function() {
            $('#recharge').remove();
            clearTimeout(timeoutId);
        });
        var vip_point = type == 1? '#points-hook' : '#vip-hook';
        __commonToggleActive($(vip_point));
        chooseNum(type);
    }

    function quest(code) {
        $.ajax({
            url: '/tools/download_by_point',
            type: 'POST',
            dataType: 'json',
            data: {model_id: down_id, res_id: down_res, code: code},
            success: function(sucess) {
                if(sucess.code == 200) {
                    window.location.href= sucess.url;
                    return;
                }else {
                    switch(sucess.code) {
                        case '102':
                        case '103':
                            vipOrPoint(0);
                            ajaxInterval();
                            break;
                        default:
                            break;
                    }
                }
            }
        })
    }

    download_btn.on('click', function(){
        $.ajax({
            url: '/tools/download',
            type: 'POST',
            data: {model_id: down_id, res_id: down_res},
        })
            .done(function(data) {
                if(data.code == 200){
                    window.location.href = data.url;
                }else {
                    switch(data.code) {
                        case 104:
                            $('#login-btn').click();
                            break;
                        case 501:
                            $('#login-btn').click();
                            break;
                        case 101:
                            vipOrPoint(0);
                            ajaxInterval();
                            break;
                        case 102:
                            quest(102);
                            break;
                        case 103:
                            quest(103);
                            break;
                        default:
                            break;
                    }
                }
            })
            .fail(function(error) {
                console.log(error);
            });
    })

    var timeoutId;
    function ajaxInterval() {
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId = setInterval(function(){
            $.ajax({
                url: '/tools/get_pay_ok',
                type: 'GET',
                success: function(msg){
                    if(msg.code == 200) {
                        alert("充值成功");
                        window.location.reload();
                    }
                    return;
                }
            });
        }, 10000);
    }



    function addPayBox(data) {
        var payBoxHtml = $(payHtml);

        payBoxHtml.click(function(e) {
            var $target = $(e.target);
            if ($target.is('.type-item') && !$target.is('.pay-type')) {
                var _index = $target.index(),
                    $itemWrapper = $('.item-warpper', '#recharge').eq(_index);
                __commonToggleActive([$target, $itemWrapper]);
                $itemWrapper.find('.money-item.active').click();
            } else if ($target.is('.money-item') || $target.closest('.money-item').length > 0) {
                $target = $target.closest('.money-item');
                var id = $target.attr('data-id'),
                    $payType = $('.pay-type.active'),
                    method = 1;
                for(var key in vipChargeData) {
                    var data = vipChargeData[key];
                    data.forEach(function(ele) {
                        if(ele.id == id) {
                            $('.pay-price').text(ele['point_money']);
                        }
                    });
                }
                __commonToggleActive($target);
                getQrCode(id, method);
            } else if ($target.is('.pay-type')) {
                var _index = $target.index();
                for(var key in vipChargeData) {
                    var data = vipChargeData[key];
                    data.forEach(function(ele) {
                        if(ele.id == $('.item-warpper.active').find('.money-item.active').attr('data-id')) {
                            $('.pay-price').text(ele['point_money']);
                        }
                    });
                }
                __commonToggleActive([$target, $('.pay-scan').eq(_index)]);
            } else if ($target.is('.btn-ali')) {
                $('#ali_pay').val($('.item-warpper.active').find('.money-item.active').attr('data-id'));
            }
        });

        return payBoxHtml
    }

    var vipChargeData = {
        'vip': [],
        'points': []
    };
    function loadVipData(pointType) {
        $.ajax({
            url: ' /tools/member_point_info_AND_user_info',
            type: 'POST',
            data: {
                point_type: pointType
            },
            dataType: 'json',
            success: function(msg) {
                if(!msg['data'] || typeof msg['data'] !== 'object') {
                    alert('服务器错误，请刷新页面重试');
                    return;
                }
                var data = msg.data.member_point_info,
                    userData = msg.data.user_info;
                for(var i = 0, len = data.length; i < len; i++) {
                    if(typeof data[i] != 'object') return;

                    switch(data[i]['point_type']) {
                        case 1:
                            vipChargeData.points.push(data[i]);
                            break;
                        case 2:
                            vipChargeData.vip.push(data[i]);
                            break;
                        default:
                            break;
                    }
                }
                showVipData(vipChargeData);
                $('#recharge-pay').prepend(showChargeHeader(userData));
                var vip_point = pointType == 1? '#points-hook' : '#vip-hook';
                var ewm_id = $(vip_point).find('.active').data('id');
                getQrCode(ewm_id, defaultChargeMethod)
            }


        })
    }

    var chargeTemplate = '<li class="money-item { activeClass }" data-id="{ id }" >'
        +'<span class="should-pay"><i>{ shouldPay }</i>元</span>'
        +'<span><i class="num">{ charge }</i>{ pointType }</span>'
        +'</li>';
    function showVipData(data) {
        var _chargeTemplate, vipHtml = '', pointsHtml = '';
        $.each(data['vip'], function(i, ele){
            var activeClass = i === 0 ? ' active' : '';

            _chargeTemplate = chargeTemplate
                .replace('{ activeClass }', activeClass)
                .replace('{ id }', ele.id)
                .replace('{ shouldPay }', ele['point_money'])
                .replace('{ pointType }', '元/' + ele['point_name'].replace('会员套餐', ''))
                .replace('{ charge }', ele['point_money']);
            vipHtml += _chargeTemplate;
        });
        $.each(data['points'], function(i, ele) {
            var activeClass = i === 0 ? ' active' : '';

            _chargeTemplate = chargeTemplate
                .replace('{ activeClass }', activeClass)
                .replace('{ id }', ele.id)
                .replace('{ shouldPay }', ele['point_money'])
                .replace('{ pointType }', '积分')
                .replace('{ charge }', ele['point_num']);
            pointsHtml += _chargeTemplate;
        });
        $(vipHtml).add($(pointsHtml)).click(function(e) {
            var _index = $(this).index();
            console.log(index);
        });
        $('#vip-hook').empty().append(vipHtml);
        $('#points-hook').empty().append(pointsHtml);
    }

    var chargeHeaderTemplate = '<div class="top"><img src="{{ avatar }}" class="avatar"><p class="nickname">{{ nickname }}</p></div>';

    function showChargeHeader(data) {
        return chargeHeaderTemplate
            .replace('{{ avatar }}', data.headimg)
            .replace('{{ nickname }}', data.nickname);
    }

    var defaultChargeMethod = 1;//默认微信
    function getQrCode(id, method) {
        var methods = method || defaultChargeMethod;
        $.ajax({
            url: '/tools/pay_code',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                method: method
            },
            beforeSend: function() {
                $('#preload-gif').show();
            },
            success: function(msg) {
                if(msg.code != 200) {
                    alert('获取二维码失败，请刷新页面重试！');
                    return;
                }

                $('#ewm').attr('src', msg.data);
                for(var key in vipChargeData) {
                    var data = vipChargeData[key];
                    data.forEach(function(ele) {
                        if(ele.id == id) {
                            $('.pay-num .num').text(ele['point_money']);
                        }
                    });
                }

                $('#preload-gif').hide();
            },
            error: function(msg) {
                alert('获取二维码失败，请刷新页面重试！');
                return;
            }
        })
    }

    function chooseNum(type) {
        var vip_point = type == 1? '#points-hook' : '#vip-hook';
        $(vip_point).on('click',function(e) {
            var $_target = $(e.target);
            if($_target.hasClass('money-item')||$_target.closest('.money-item').length > 0) {
                $_target = $_target.closest('.money-item');
                if($_target.hasClass('active')) return;
                __commonToggleActive($_target);
                var id = $_target.data('id'),
                    $methodHook = $('.pay-type-wrapper').find('.pay-type').filter('.active'),
                    method = 1;
                getQrCode(id, method)
            }
        });
    }

    var nav_lis = $('.info-item-container').find('li'),
        lis_len = $('.info-item-container').find('li').length;
    $.each(nav_lis, function(index, el) {
        $(this).css('width', (100/lis_len)+'%')
    });
});

$(function() {
    var storageName = '__orsoon-prompt-box__',
        showFlag = getLocalStorage() ? false : true;

    if (showFlag) createPromptBox() && bindEvents();

    function createPromptBox () {
        var $pBox = $('<div class="prompt-box" id="promptBox">').css({
            display: 'none',
            position: 'fixed',
            height: '120px',
            background: 'rgba(0,0,0,.5)',
            bottom: '20px',
            left: '0',
            right: '0',
            zIndex: '1000',
            fontSize: '16px',
            color: '#fff'
        });

        var $container = $('<div class="container">').css({
            boxSizing: 'border-box',
            width: '1200px',
            margin: '0 auto',
            position: 'relative',
            padding: '20px'
        });

        var $imgWrapper = $('<div class="img-wrapper"><img src="/assets/images/prompt.png"></div>').css({
            float: 'left',
            marginRight: '30px'
        });

        var $content = $('<div>');

        var $p_1 = $('<p class="lines">').text('安装软件提示文件损坏怎么处理？打开dmg文件提示损坏怎么处理？来自不信任的开发者怎么处理？'),
            $em = $('<a href="http://www.orsoon.com/news/187368.html" class="yellow-text">').text('点此查看解决方法'),
            $p_2 = $('<p class="lines">').text('VIP会员联系客服QQ：1308196398');
        $p_1.add($p_2).css('line-height', '36px');
        $em.css({
            color: '#fff',
            textDecoration: 'underline'
        });
        $p_1.append($em);
        $content.append($p_1, $p_2);

        var $closeBtn = $('<div class="close-btn" id="promptCloseBtn" title="关闭">').text('X').css({
            position: 'absolute',
            padding: '5px',
            top: '5px',
            right: '15px',
            cursor: 'pointer',
            fontSize: '22px'
        });

        $container.append($imgWrapper, $content, $closeBtn).appendTo($pBox);

        $('body').append($pBox);

        return true;
    }

    function bindEvents() {
        var pBox = $('#promptBox'),
            pCloseBtn = $('#promptCloseBtn');

        pBox.css('display', 'block');

        pCloseBtn.on('click', function() {
            pBox.remove();
            setLocalStorage();
        });
    }

    function getLocalStorage() {
        var _storage = localStorage.getItem(storageName), elapsed;

        if (!_storage) return false;

        elapsed = Date.now() - _storage;
        if (elapsed / 1000 / 3600 / 24 >= 1) {
            setLocalStorage('');
            return false
        }

        return true;
    }

    function setLocalStorage(d) {
        var logTime = d || +new Date();
        localStorage.setItem(storageName, logTime);
    }
});
