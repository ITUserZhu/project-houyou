$(function() {
	var $join_entry = $('.join-entry'),
		$ipt = $join_entry.find('.ipt-num'),
		leftNum = $ipt.attr('data-leftNum');
		
	$ipt.on('keyup', function() {
		var num = Number($(this).val());
		if(num <= 0 ) {
			$(this).val(1)
		}else if (num > leftNum) {
			$(this).val(leftNum)
		}
	});
	$join_entry.on('click', function(e) {
		var $target = $(e.target).closest('a'),
			_this = $(this);
		curNum = Number($ipt.val());

		if($target.is('.reduce-btn')) {
			curNum--;
			if(curNum < 1 ) {
				curNum++;
				return;
			}
			$ipt.val(curNum);
			return;
		};
		if($target.is('.add-btn')) {
			curNum++;
			if(curNum > leftNum ) {
				curNum--;
				return;
			}
			$ipt.val(curNum);
			return;
		}
		if($target.is('.other-num')) {
			$ipt.val($target.text());
			return;
		}
	});

	var $recode_list = $('#recode_list'),
        recodeTimer;
    
    $recode_list.hover(function(){
        clearInterval(recodeTimer); 
    }, function(){ 
        recodeTimer = setInterval(function(){
            moveTo($recode_list)
        },1500)
    }).trigger('mouseleave'); 

    // 滚动逻辑
    function moveTo(obj) {
        if($(obj).find('ul').children().length > 6) {
            $(obj).find("ul:first").animate({
                marginTop: "-59px"
            }, 1000, function (){
                $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
            }); 
        }
    };

    var $joinBtn = $('.join-now'),
    	$iptHide = $('#is-login'),
    	is_login = $iptHide.attr('data-login'),
    	is_join = $iptHide.attr('data-join'),
    	term = $iptHide.attr('data-term'),
    	$coupon = $('.coupon-item'),
    	$payWra = $('#pay-wra'),
    	$tipWra = $('#join-tips'),
    	loadImg = '/assets/images/loadcode.gif';

	$coupon.click(function(event) {
		if(is_login == 0) {
			$('#login-btn').click();
			return;
		}
		if(is_join == 0) {
			$('#join-tips').fadeIn();
			return;
		}
	});
    $joinBtn.click(function(event) {
    	var data = {
    		people_num: $ipt.val()
    	};
    	is_login == 0? $('#login-btn').click(): getCode(data);
    });
    
    function getCode(data) {
    	$.ajax({
    		url: '/tools/luck_draw',
    		type: 'POST',
    		data: data,
    		beforeSend: function() {
    			$payWra.find('.tips em').text($ipt.val());
    			$payWra.find('.pay-price').text($ipt.val());
    			$('#weixincode').attr('src', loadImg);
    		},
    		success: function(res) {
    			if (res.code == 200) {
    				$payWra.fadeIn();
    				$('#weixincode').attr('src', res.data);
    				ajaxInterval();
    			}else {
    				alert(res.msg)
    			}
    		},
    		error: function(error) {
    			alert(error)
    		}
    	})
    };
    

    $payWra.on('click', function(e) {
    	var _this = $(this);
    	if($(e.target).closest('span').is('.close-pay')) {
    		$(this).fadeOut();
    		return;
    	};
    	if($(e.target).closest('a').is('.type-btn')) {
    		__commonToggleActive([$(e.target), _this.find('.pay-item').eq($(e.target).index())])
    		return;
    	};
    	if($(e.target).closest('button').is('.btn-ali')) {
    		$('#ali_pay_num').val($ipt.val());
    	}
    });
    $tipWra.on('click', function(e) {
    	var _this = $(this);
    	if($(e.target).closest('span').is('.close-tip')) {
    		$(this).fadeOut();
    		return;
    	};
    	if($(e.target).closest('a').is('.tip-join')) {
    		$(this).fadeOut();
    		getCode({
    			people_num: $ipt.val()
    		});
    		return;
    	};
    });

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