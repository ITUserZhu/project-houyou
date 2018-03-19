$(function () {
	var $fixTop = $('#fix-top'),
	    $contentNav = $('#content-nav'),
	    navTop = $contentNav.offset().top,
	    navHeight = $contentNav.height(),
        $downBtn = $('#download_btn'),
        model_id = $downBtn.data('model'),
        model_title = $downBtn.data('title'),
        res_id = $downBtn.data('id'),
	   $sectionItems = $('.sec-item');

    var imgdefereds = [];
    $('.fr-view img').each(function () {
        var dfd = $.Deferred();
        $(this).bind('load', function () {
            dfd.resolve();
        }).bind('error', function () {
            //图片加载错误，加入错误处理
            // dfd.resolve();
        });
        if (this.complete) setTimeout(function () {
            dfd.resolve();
        }, 1000);
        imgdefereds.push(dfd);
    });

    var $contentH3 = $('.fr-view .intro').length > 0 ? $('.fr-view .intro') : $('.fr-view h3'),
        $imgs = $('.fr-view img'),
        $contentNavLeft = $('#content-nav-left'),
        tabsBase = $('#content-nav').offset().top,
        conHeightArr = [],
        heightArr = [];
    $.when.apply(null, imgdefereds).done(function () {
        if ($contentH3.length > 0) {
            $contentH3.each(function (i, ele) {
                var _text = $(this).text().substr($(this).text().length-4);
                var _h3Top = $(this).offset().top;
                var $span = $('<span>').text(_text);
                $contentNavLeft.append($span);
                conHeightArr.push(Math.ceil(_h3Top - 105));
            });
        };
        $sectionItems.each(function(index, el) {
            heightArr.push(Math.ceil($(el).offset().top - 100));
        });
        if ($imgs.length > 0) {
            $imgs.each(function (i, ele) {
                var $this = $(this);
                $this.on('load', function () {
                    conHeightArr = conHeightArr.map(function (height) {
                        return height += $this.height();
                    });
                    if (i > 0) {
                        heightArr = heightArr.map(function (height) {
                            return height += $this.height();
                        }); 
                    }
                });
            });
        };
        $contentNavLeft.click(function (e) {
            var $target = $(e.target),
                _index = $target.index();
            $('body, html').animate({ scrollTop: conHeightArr[_index] }, 300);
        });
    });

	// 导航栏切换
	var $conNav = $('#content-nav');
	$conNav.on('click', 'li', function (e) {
		// if ($(e.target).hasClass('active')) return;
		$('body, html').animate({
			scrollTop: heightArr[$(this).index()]},
			0);
	});
	// 检测滚动
	$(window).on('scroll', function () {
		var $scrollTop = $(window).scrollTop(),
            currentIndex;
		if ($scrollTop >= navTop) {
			$fixTop.addClass('active');
			$fixTop.next('.content').css('marginTop', navHeight + 42);
		} else {
			$fixTop.removeClass('active');
			$fixTop.next('.content').css('marginTop', '20px');
		};
		for (var i = 0; i < heightArr.length; i++) {
            var height_0 = heightArr[0],
                height_1 = heightArr[i],
                height_2 = heightArr[i+1];
            if(height_0 > $scrollTop) {
                currentIndex = -1;
                break;
            } else if(!height_2 || (height_1 <= $scrollTop && height_2 > $scrollTop)) {
                currentIndex = i;
                break;
            }    
        }
        currentIndex >= 0 ? __commonToggleActive($conNav.children('li').eq(currentIndex)): $conNav.children('li').removeClass('active');

        $scrollTop > tabsBase ? $contentNavLeft.show() : $contentNavLeft.hide();
        if ($contentH3.length > 0) {
            var $contentChild = $contentNavLeft.children();
            var curIndex;
            if ($scrollTop < conHeightArr[0]) {
                $contentChild.removeClass('active');
                return;
            };
            for (var j = 0; j < conHeightArr.length; j++) {
                var height1_1 = conHeightArr[j],
                    height1_2 = conHeightArr[j + 1];
                if (!height1_2 || height1_1 <= $scrollTop && height1_2 > $scrollTop) {
                    curIndex = j;
                    break;
                }
            }
            __commonToggleActive($contentChild.eq(curIndex));
        } else {
            $contentNavLeft.hide();
        }
	});


	// 相关软件
	var $softwra = $('.softwra'),
	    $softUl = $('.softwra').find('ul'),
	    $softWra = $softwra.find('.show-wra'),
	    $softLis = $softUl.children('li'),
	    softLen = Math.ceil($softLis.length / 7),
	    moveWidth = $softWra.width();
	var softMoveIndex = 0,
	    softMoveFlag = false;
	$softUl.width(softLen * moveWidth);
	$softwra.click(function (e) {
		var $target = $(e.target);
		if ($target.closest('div').is('.left-arr')) {
			if (softMoveIndex < 1 || softMoveFlag) return;
			softMoveIndex--;
		};
		if ($target.closest('div').is('.right-arr')) {
			if (softMoveIndex >= softLen - 1 || softMoveFlag) return;
			softMoveIndex++;
		};
		softMoveFlag = true;
		$softUl.animate({
			marginLeft: -softMoveIndex * moveWidth }, 600, function () {
			softMoveFlag = false;
		});
	});

	// 相关文章
	var $relArticleUl = $('.relation-article').find('ul');
	$relArticleUl.on('mouseover', 'li', function (e) {
		var $target = $(e.target).closest('li');
		__commonToggleActive($target);
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

    // 点赞点踩
    var $_upDown = $('.up-down'),
        submitting = 0
        goodNum = $_upDown.find('.sup em').text()/1,
        badNum = $_upDown.find('.unsup em').text()/1;

   	$_upDown.click(function(event) {
   		var $target = $(event.target).closest('span');
   		if($target.is('.sup')) {
   			supOrDwon(goodNum+1, badNum, 1)
   		}else if($target.is('.unsup')) {
   			supOrDwon(goodNum, badNum+1, 0)
   		}
   	});
    function supOrDwon(goodNum, badNum, like) {
        if($_upDown.data('void') != '0' || submitting) return;

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
                    $_upDown.find('.sup em').text(goodNum);
                    $_upDown.find('.unsup em').text(badNum);
                }else{
                    alert(data.msg)
                }
            }
        })
    };

    // 收藏
    var $collect = $('#collect'),
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

    // 点击下载
    var $download_btn = $('#download_btn, .down-btn'),
        tipMsg = '';
    var payHtml = '<div class="recharge" id="recharge">'
            +'<div class="pay" id="recharge-pay">'
            +'<div class="top"><p class="nickname">{{ tips }}</p></div>'
            +'<div class="cont">'
            +'<div class="types-wrapper">'
            +'<div class="types" id="payTypesHook">'
            +'<span class="type-item active">VIP充值</span>'
            +'<span class="type-item">积分充值</span>'
            +'</div>'
            +'<div class="close" id="close">X</div>'
            +'<div class="money-choose">'
            +'<ul class="item-warpper active clearfix" id="vip-hook">'
            // +'<ul class="item-warpper active clearfix" id="vip-hook"><li class="money-item  active" data-id="4"><span class="should-pay"><i>128</i>元</span><span><i class="num">128</i>元/年</span></li><li class="money-item " data-id="2"><span class="should-pay"><i>88</i>元</span><span><i class="num">88</i>元/季</span></li><li class="money-item " data-id="1"><span class="should-pay"><i>58</i>元</span><span><i class="num">58</i>元/月</span></li></ul>'
            +'</ul>'
            +'<ul class="item-warpper clearfix" id="points-hook">'
            +'</ul>'
            +'</div>'
            +'</div>'
            // +'<div><i></i>优惠券 <div class="coupon">3张可用</div></div>'
            +'<div class="money-choose">'
            +'<p class="hr"></p>'
            +'<p class="should-pay-num">支付方式</p>'
            +'<div class="types-wrapper">'
            +'<div class="types pay-type-wrapper">'
            +'<span class="pay-type type-item wechart active"><i class="icon-wechat"></i>微信支付</span>'
            +'<span class="pay-type type-item alipay"><i class="icon-alipay"></i>支付宝</span>'
            +'</div>'

            +'<div class="pay-scan active">'
                +'<div class="ewm">'
                    +'<img src="/assets/images/loadcode.gif" alt="" id="preload-gif">'
                    +'<img src="" id="ewm">'
                +'</div>'
                +'<div class="pay-num">应付金额 ： <span class="num">128</span>元</div>'
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
        $('.container').append(html);
        $('.nickname').text(tipMsg)
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
            data: {model_id: model_id, res_id: res_id, code: code},
            success: function(sucess) {
                if(sucess.code == 200) {
                    window.location.href= sucess.url;
                    return;
                }else {
                    tipMsg = sucess.msg;
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

    $download_btn.on('click', function(){
        $.ajax({
            url: '/tools/download',
            type: 'POST',
            data: {model_id: model_id, res_id: res_id},
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
                // $('#recharge-pay').prepend(showChargeHeader(userData));
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
        });
        $('#vip-hook').empty().append(vipHtml);
        $('#points-hook').empty().append(pointsHtml);
    }

    // var chargeHeaderTemplate = '<div class="top"><img src="{{ avatar }}" class="avatar"><p class="nickname">{{ nickname }}</p></div>';

    // function showChargeHeader(data) {
    //     return chargeHeaderTemplate
    //         .replace('{{ avatar }}', data.headimg)
    //         .replace('{{ nickname }}', data.nickname);
    // }

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
    };


    // 视频添加按钮
    var $videoWra = $('.fr-video');
    var videoImgHtml = '<div class="video-img" id="video-img"><img src="/assets/images/video-pause.png"></div>';
    if($videoWra.length != 0) {

        $videoWra.each(function(i,v) {
            if($(v).find('iframe').length == 0) {
                $(v).append(videoImgHtml);
                var video = $(v).find('video').get(0);
                video.addEventListener('play',function(){  
                    $(this).next('.video-img').find('img').attr('src', '/assets/images/video-play.png').parent().delay(400).stop(true,true).hide(400);  
                });  
                video.addEventListener('pause',function(){  
                    $(this).next('.video-img').find('img').attr('src', '/assets/images/video-pause.png').parent().stop(true,true).show(400);   
                }); 
            }
        });

        $videoWra.on('click','.video-img', function(e) {
            var video = $(this).parent().find('video').get(0);
            if(video.paused) {
                video.play();
            }else {
                video.pause();
            }
        });
        $videoWra.on('click', 'video', function() {
            var video = $videoWra.find('video').get(0);
            if(this.paused) return;
            this.pause();
        });
    }

});