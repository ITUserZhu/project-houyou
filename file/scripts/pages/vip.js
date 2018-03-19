'use strict';

$(function () {
	// 二维码点击登录
	var $loginEwm = $('#login-ewm');
	$loginEwm.click(function(event) {
		$('#login-btn').click();
	});

	var $toggleRecharge = $('.toggle-recharge'),
	    $toggleWra = $('.toggle-wra'),
	    wraWidth = $toggleWra.find('.toggle-item.active .details').width(),
	    $payPrice = $('.pay-price');
	var len = $toggleWra.find('.toggle-item.active .wraper').children('li').length,
		curLi = $toggleWra.find('.toggle-item.active .wraper').children('li').eq(0),
	    pIndex = 0,
	    vIndex = 0,
	    getData = {};
	// 初始化默认选项
	__commonToggleActive($toggleWra.find('.toggle-item.active .wraper').children('li').first());
	getData = {
		id: $toggleWra.find('.toggle-item.active .wraper').children('li').first().data('id'),
		price: $toggleWra.find('.toggle-item.active .wraper').children('li').first().data('price'),
	};
	$payPrice.text(getData.price);

	// 切换充值类型
	$toggleRecharge.click(function (e) {
		var $target = $(e.target).closest('a'),
		    index = $target.index();
		__commonToggleActive([$toggleWra.children('.toggle-item').eq(index), $target]);
		__commonToggleActive($toggleWra.find('.toggle-item.active .wraper').children('li').first());
		getData.id = $toggleWra.find('.toggle-item.active .wraper').children('li').first().data('id');
		getData.price = $toggleWra.find('.toggle-item.active .wraper').children('li').first().data('price');
		$payPrice.text(getData.price);
		$coupon.removeClass('active');
		initCallPay();
	});
	$toggleWra.click(function (e) {
		var $target = $(e.target),
		    $targetArr = $target.closest('div.arr'),
		    $ul = $(this).find('.toggle-item.active .wraper');
		len = $ul.children('li').length;
		var checkIndex = $ul.hasClass('point')?pIndex: vIndex;
		if ($targetArr.is('.arr')) {
			if ($targetArr.hasClass('left')) {
				if (checkIndex <= 0) return;
				checkIndex--;
			} else if ($targetArr.hasClass('right')) {
				if (checkIndex >= Math.ceil(len / 3) - 1) return;
				checkIndex++;
			}
			$ul.animate({
				marginLeft: -checkIndex * wraWidth }, 400, function () {
					$ul.hasClass('point')?pIndex=checkIndex: vIndex=checkIndex;
				});
		};

		if ($target.closest('li.item').is('.item')) {
			__commonToggleActive($target.closest('li.item'));
			getData.id = $target.closest('li.item').data('id');
			getData.price = $target.closest('li.item').data('price');
			$payPrice.text(getData.price);
			$coupon.removeClass('active');
			initCallPay();
		};

	});
	var $payType = $('.pay-type'),
	    $payWra = $('.pay-wra');
	$payType.click(function (e) {
		var $target = $(e.target).closest('a'),
		    index = $target.index();
		__commonToggleActive([$payWra.children('.pay-wra-type').eq(index), $target]);

	});
	var $payAli = $('#pay-ali');

	$payAli.click(function(event) {
		$('#ali_pay').val(getData.id);
		$('#ali_pay_coupon').val(getData.coupon_id)
	});

	// 优惠券选择
	var $coupon = $('#coupon'),
		$couponWra = $coupon.find('ul'),
		couponPrice = $coupon.find('.coupon-num em'),
		couponNum = 0;
	$coupon.click(function(e) {
		var $target = $(e.target);
		if(couponPrice.text().replace('张可用','') == 0) return;
		if($target.closest('ul').is('.coupon-wra')) {
			e.stopPropagation();
			couponPrice.text('-'+$target.closest('li').data('price'));
			$couponWra.slideUp();
			$(this).addClass('active');
			$payPrice.text(getData.price - $target.closest('li').data('price'));
			getData.coupon_id = $target.closest('li').data('id');
			getQrCode(getData.id, 1, getData.coupon_id);
			return;
		}
		if($target.is('.arr-down')) {
			e.stopPropagation();
			$couponWra.slideToggle();
			return;
		}
		$(this).toggleClass('active');
		if($(this).hasClass('active')) {
			$couponWra.slideDown();
		}else {
			$couponWra.slideUp();
			couponPrice.text(couponNum + '张可用');
			$payPrice.text(getData.price);
			getData.coupon_id = 0;
			getQrCode(getData.id, 1, getData.coupon_id);
		}
	});

	getCoupon();
	var couponData = [];

	function initCallPay() {
		
		var newCouponArr = new Array,
			couponHtml = '<li data-id="{{ id }}" data-price="{{ d_price }}"><span class="discount-num">￥{{ price }}</span><div class="coupon-info"><p>满{{ min_price }}可用</p><p>{{ s_time }}-{{ e_time }}</p><span class="useCoupon">使用</span></div></li>',
			newHtml = '';
		$.each(couponData, function(index, el) {
			if(el.min_consume/1 <= getData.price) {
                newCouponArr.push(el);
                newHtml += couponHtml
                    .replace('{{ price }}', el.coupon_point.replace('.00', ''))
                    .replace('{{ min_price }}', el.min_consume)
                    .replace('{{ s_time }}', el.add_time)
                    .replace('{{ e_time }}', el.end_time)
                    .replace('{{ id }}', el.id)
                    .replace('{{ d_price }}', el.coupon_point.replace('.00', ''))
            }
		});
		if(!$coupon.hasClass('active')) {
			couponNum = newCouponArr.length;
			couponPrice.text(couponNum + '张可用');
		};
		$couponWra.empty().append(newHtml);

		getQrCode(getData.id, 1, 0);
	};
	
	// 获取优惠券
	function getCoupon() {
		$.ajax({
			url: '/coupon_info',
			type: 'POST',
			dataType: 'json',
			data: {page: 0, coupon_status: 0},
			success: function(data) {
                if (data.code === 200) {
                    couponData = data.coupon_info;
                    initCallPay();
                } else {
                    var msg = data.msg || '服务器错误，请刷新重试';
                    alert(msg);
                    scouponData = [];
                    return;
                }
            },
            error: function(data) {
                console.log(data.msg)
            }
		})
	};

	// 充值请求二维码
	var defaultChargeMethod = 1; // 默认充值方式为微信充值
    function getQrCode(id, method, coupon_id) {
        var method = method || defaultChargeMethod;
        $.ajax({
            url: '/tools/pay_code',
            type: 'POST',
            data: {
                id: id,
                method: method,
                coupon_relation_id: coupon_id
            },
            dataType: 'json',
            beforeSend: function() {
            	$('.wxinqr').attr('src', '/assets/images/loadcode.gif');
            },
            success: function(msg) {
                if(msg.code != 200) {
                    alert('获取二维码失败，请重试');
                    return;
                }
                if(msg.data === false) {
                    alert('请求二维码过于频繁，请稍后再试！');
                    return;
                }
                $('.wxinqr').prop('src', msg.data);
            },
            error: function(msg) {
                return;
            }
        });
    };

});
var sentPayCodeIntervalId;
function ajaxInterval() {
    sentPayCodeIntervalId = setInterval(function(){
        $.ajax({
            url: '/tools/get_pay_ok',
            type: 'GET',
            success: function(msg){
                if(msg.code == 200) {
                    alert("充值成功");
                    setTimeout(function(){
                        window.location.reload();
                    }, 2000);
                }
                return;
            }
        });
    }, 10000);
}
ajaxInterval();