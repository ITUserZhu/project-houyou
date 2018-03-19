;(function(win, doc, $) {
    'use strict';
    function ProduceData(opts) {
        var self = this;
        this.opts = opts;
        $('document').ready(function() {
            $.ajax({
                url: '/tools/member_point_info',
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    if (data.code === 200) {
                        self._init(data.data);
                    } else {
                        var msg = data.msg || '服务器错误，请刷新重试';
                        alert(msg);
                    }
                },
                error: function(data) {
                    console.log(data.msg)
                }
            });
        });
    }

    $.extend(ProduceData.prototype, {
        _init: function(data) {
            this.data = data;
            this.data = this._formatData(this.data);
            this.options = {
                hooks: ['#box-left-lists', '#membership-type', '#box-right-lists'],
                defaultType: 'vip',
                push: {
                    vip: '98',
                    integral: '50'
                },
                activeClass: 'current',
                configShow: 'all'
            };

            this.options = $.extend(true, this.options, this.opts);
            var defaultType = this.options.defaultType;

            this._createCategories();
            this._renderPage(this.data[defaultType]);
            this._initClickEvent();
            this._getCouponData();
        },
        _getCouponData: function() {
            var self = this;
            $.ajax({
                url: '/coupon_info',
                type: 'POST',
                dataType: 'json',
                data: {page: 0, coupon_status: 0},
                success: function(data) {
                    if (data.code === 200) {
                        self._initCoupon(data.coupon_info);
                    } else {
                        var msg = data.msg || '服务器错误，请刷新重试';
                        self._initCoupon([]);
                        return;
                    }
                },
                error: function(data) {
                    console.log(data.msg)
                }
            });
        },
        _initCoupon: function (data) {
            this.couponData = data;
            this.couponDefaultId = 0;
            this.couponDefaultPrice = 0;
            this._callPay();
            this._aliClick();
        },
        _aliClick: function () {
            var self = this,
                aliBtn = $('.btn-ali');
            aliBtn.on('click', function() {
                var calledId = $('#box-right-lists').find('.current').data('id')
                $('#ali_pay').val(calledId);
                $('#ali_pay_coupon').val(self.couponDefaultId);
            });
        },
        _renderPage: function(obj) {
            var opts = this.options,
                defaultType = opts.defaultType,
                defaultPush = opts.push[defaultType];

            this._createRightNodes(obj);
            this._createLeftNodes(obj);
        },
        _createCategories: function() {
            var opts = this.options,
                data = this.data,
                hooks = opts.hooks,
                defaultType = opts.defaultType;

            if(opts.configShow === 'all') {
                for(var k in data) {
                    var str = '<input type="button" value="' + data[k][0].text + '" data-type="' + data[k][0].type + '" class="vip-type-btn">';
                    $(hooks[1]).append($(str));
                }
            } else {
                for(var i = 0; i < opts.configShow.length; i++) {
                    var key = opts.configShow[i];
                    var str = '<input type="button" value="' + data[key][0].text + '" data-type="' + data[key][0].type + '" class="vip-type-btn">';
                    $(hooks[1]).append($(str));
                }
            }

            this.addActiveClass($('input[data-type="'+ defaultType +'"]'));
        },
        _createRightNodes: function(obj) {
            var len = obj.length,
                hooks = this.options.hooks,
                push = this.options.push,
                defaultPush = push[obj[0].type],
                i;
            $(hooks[2]).children().remove();

            var numKey = obj[0].point_type == 2 ? 'point_money' : 'point_num';

            for(i = 0; i < len; i++) {
                var str = obj[i].limited

                ?
                    '<li class="prices" data-id="' + obj[i].id + '" data-price="' + obj[i].point_money + '"><strong>' + obj[i][numKey] + '</strong>' + '元/' + obj[i].point_name.replace('会员套餐', '') + '</li>'
                : 
                    '<li class="prices" data-id="' + obj[i].id + '" data-price="' + obj[i].point_money + '"><strong>' + obj[i][numKey] + '</strong>' + obj[i].unit + '</li>';     

                $(hooks[2]).append(str);
            }
            // this.addActiveClass($('[data-price="' + defaultPush + '"]'));
            this.addActiveClass($('.prices:first-child', '#box-right-lists'));
        },
        _createLeftNodes: function(obj) {
            var opts = this.options,
                len = obj.length,
                hooks = opts.hooks,
                push = opts.push,
                defaultPush = push[obj[0].type],
                i;
            $(hooks[0]).children().remove();

            var numKey = obj[0].point_type == 2 ? 'point_money' : 'point_num';

            for(i = 0; i < len; i++) {
                var nodes = obj[i].limited

                    ?
                        '<li class="boxes" data-price="' + obj[i]["point_money"] + '"><header class="vip-header" data-type="'  + obj.type + '"><h2 class="vip-type">'  + obj[i].point_name.replace('套餐', '') + '</h2></header><main class="details"><p class="price"><strong>' + obj[i][numKey] + '</strong>' + '元/' + obj[i].point_name.replace('会员套餐', '') + '</p><ul><li class="times">' + obj[i].limited.replace('{ download_limit }', obj[i].download_limit)  + '</li><li class="tech-support">技术指导：<span class="text">' + obj[i].techSupport + '</span>次</li><li class="remote-assistance">远程协助：<span class="text">' + obj[i].times + '</span></li><li class="download-speed">下载速度：<span class="text">' + obj[i].downloadSpeed + '</span></li><li class="accessibility">权限：<span class="text">' + obj[i].authority + '</span></li><li class="QQ-support">QQ服务：<span class="text">' + obj[i].qqGroup + '</span></li><li class="vip-qq-group">' + obj[i].vipQQGroup + '</li></ul></main><footer><input type="button" value="立即订购" data-price="'  + obj[i]['point_money'] + obj[i].unit + '"></footer></li>'

                    :
                        '<li class="boxes" data-price="' + obj[i]["point_money"] + '"><header class="vip-header" data-type="'  + obj.type + '"><h2 class="vip-type">'  + obj[i].gap + '</h2></header><main class="details"><p class="price"><strong>' + obj[i][numKey] + '</strong>' + obj[i].unit + '</p><ul><li class="times">次数限制：20个/天 <span class="tag">同个软件</span></li><li class="tech-support">技术指导：<span class="text">' + obj[i].techSupport + '</span>次</li><li class="remote-assistance">远程协助：<span class="text">' + obj[i].times + '</span></li><li class="download-speed">下载速度：<span class="text">' + obj[i].downloadSpeed + '</span></li><li class="accessibility">权限：<span class="text">' + obj[i].authority + '</span></li><li class="QQ-support">QQ服务：<span class="text">' + obj[i].qqGroup + '</span></li><li class="vip-qq-group">' + obj[i].vipQQGroup + '</li></ul></main><footer><input type="button" value="立即订购" data-price="'  + obj[i]['point_money'] + obj[i].unit + '"></footer></li>';

                $(hooks[0]).append(nodes);
            }

            // this.addActiveClass($('[data-price="' + defaultPush + '"]'));
            this.addActiveClass($('.boxes:first-child', '#box-left-lists'));
        },
        _formatData: function(d) {
            var formatData = {
                vip: [],
                integral: []
            };
            var customData = {
                vip: [
                    {
                        type: 'vip',
                        text: 'VIP会员',
                        gap: '{ vip_type }会员',
                        limited: '次数限制：{ download_limit }个/天',
                        unit: '元/{ point_name }',
                        techSupport: '1',
                        times: '2次',
                        vipQQGroup: 'VIP客户服务群：609014216',
                        downloadSpeed: '100MB',
                        authority: '站内所有软件',
                        qqGroup: '客服1308196398'
                    }
                ],
                integral: [
                    {
                        type: 'integral',
                        text: '积分购买',
                        gap: '积分购买',
                        limited: '',
                        unit: '积分',
                        techSupport: '1',
                        times: '无',
                        downloadSpeed: '80MB',
                        authority: '站内所有积分软件',
                        qqGroup: '客服1308196398',
                        vipQQGroup: 'VIP客户服务群：195690426'
                    }
                ]
            };
            for(var i = 0; i < d.length; i++) {
                if (d[i].point_type == 2) {
                    formatData.vip.push(d[i]);
                } else {
                    formatData.integral.push(d[i]);
                }
            }
            for (var k in formatData) {
                if (k === 'integral') {
                    $.each(formatData[k], function(i, ele) {
                        $.extend(ele, customData[k][0]);
                    });
                } else {
                    $.each(formatData[k], function(i, ele) {
                        $.extend(ele, customData[k][0]);
                    });
                }
            }
            return formatData;
        },
        _initClickEvent: function() {
            var self = this,
                vipTypeBtns = $('.vip-type-btn'),
                $rightBtns = $('li.prices'),
                $boxes = $('li.boxes'),
                $leftBtns = $boxes.find('input'),
                $rightBox = $('#box-right-lists'),
                $leftBox = $('#box-left-lists'),
                timeoutId;
            $.each(vipTypeBtns, function(index, element) {
                $(element).on('click', function() {
                    if($(element).is('.current')) return;
                    var type = $(this).data('type');
                    self._renderPage(self.data[type]);
                    toggleActive($(element));
                    self._layout();
                    self._callPay();
                })
            });
            toggleActive($rightBtns.eq(0));
            $rightBox.on('click', function(e) {
                var $target = ($(e.target).hasClass('prices')) ? $(e.target) : $(e.target).parents('.prices'),
                    index = $target.index();
                if($target.is('.current')) return;
                $('.coupon-wra').removeClass('active');
                $('.discounts').removeClass('active');
                self.couponDefaultId = 0;
                self.couponDefaultPrice = 0;
                self.isChoose = false;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    toggleActive($target);
                    toggleActive($leftBox.children().eq(index));
                    self._layout();
                    self._callPay();
                }, 100);
            });
            $('.vip-box-left').on('click', function(e) {
                var $target = ($(e.target).hasClass('prices')) ? $(e.target) : $(e.target).closest('.boxes'),
                    index = $target.index();
                if($target.is('.current')) return;
                $('.coupon-wra').removeClass('active');
                $('.discounts').removeClass('active');
                self.couponDefaultId = 0;
                self.couponDefaultPrice = 0;
                self.isChoose = false;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function(){
                    toggleActive($target);
                    toggleActive($rightBox.children().eq(index));
                    self._layout();
                    self._callPay();
                }, 100);    
            });
            $('.coupon-wra').on('click', function(e) {
                if($(this).find('.fr').text().replace('张可用 >', '') == 0) {
                    return
                };
                if($(this).hasClass('active')) {
                    if($(e.target).closest('.useCoupon').is('.useCoupon')) {
                        self.couponDefaultId = $(e.target).data('id');
                        self.couponDefaultPrice = $(e.target).data('price');
                        $('.discounts').removeClass('active');
                        self.isChoose = true;
                        $('.coupon-wra').find('.fr').text('￥' + $(e.target).data('price'));
                        self._callPay();
                        e.stopPropagation();
                        return;
                    }
                    if($(e.target).closest('.discounts').is('.discounts')) {
                        e.stopPropagation();
                        return;
                    }
                    $(this).removeClass('active');
                    $('.discounts').removeClass('active');
                    self.couponDefaultId = 0;
                    self.couponDefaultPrice = 0;
                    self.isChoose = false;
                    self._callPay();
                    return;
                }
                $(this).addClass('active');
                $('.discounts').addClass('active');
            });
            $leftBox.on('mousedown', function(e) {
                e.originalEvent.stopPropagation();
                if($(e.target).is('input')) {
                    var $target = $(e.target);
                    $target.css({
                        'top': '2px',
                        'box-shadow': 'none'
                    });
                    var index = $target.parents('.boxes').index();
                    if(this.animated) {
                        $rightBox.children().eq(index).removeClass('tada');
                        this.animated = false;
                    }
                }
            }).on('mouseup', function(e) {
                 e.originalEvent.stopPropagation();
                if($(e.target).is('input')) {
                    var $target = $(e.target);
                    $target.css({
                        'top': 0,
                        'box-shadow': '0 2px 0 0 #cc2a1e'
                    });
                    var index = $target.parents('.boxes').index();
                    $rightBox.children().eq(index).addClass('tada');
                    this.animated = true;
                }
            });

            this._layout();

            function toggleActive( element ) {
                $(element).addClass('current').siblings().removeClass('current');
            }
        },
        _layout: function() {
            var self = this;
            var $leftLists = $('#box-left-lists'),
                $leftChildren = $leftLists.children(),
                $leftCurrent = $leftChildren.filter(function() {
                    return $(this).hasClass( 'current' );
                }),
                // index = $leftChildren.index($leftCurrent),
                index = $leftCurrent.index(),
                len = $leftChildren.length,
                parentWidth = $leftLists.width(),
                childWidth = $leftChildren.width(),
                rate = (parentWidth - childWidth) / len;
            
            for(var i = 0; i < len; i++) {
                var diff = i - index;
                if(diff * 2 < -len)
                    diff = len + diff;
                else if (diff > len / 2)
                    diff = diff - len;

                $leftChildren.eq(i).css({
                    'transform': 'scale(1, ' + (1 - Math.abs(diff) / 10) + ')',
                    'left': parentWidth / 2 + diff * rate,
                    'opacity': 1 - (Math.abs(diff) / 10),
                    'z-index': 5000 - Math.abs(diff)
                })
            }
        },
        _callPay: function() {
            var $calledNode = $('#box-right-lists').find('.current'),
                calledId = $calledNode.data('id'),
                calledPrice = $calledNode.data('price'),
                newCouponArr = new Array,
                couponsH = `<li>
                                <span class="discount-num">￥{ price }</span>
                                <div class="coupon-info">
                                    <p>满{ min_price }可用</p>
                                    <p>{ start_time }-{ end_time }</p>
                                    <span class="useCoupon" data-id="{ id }" data-price="{ p_price }">使用</span>
                                </div>
                            </li>`,
                html = '';
            $.each(this.couponData, function(index, el) {
                if(el.min_consume/1 <= calledPrice) {
                    newCouponArr.push(el);
                    html += couponsH
                        .replace('{ price }', el.coupon_point.replace('.00', ''))
                        .replace('{ min_price }', el.min_consume)
                        .replace('{ start_time }', el.add_time)
                        .replace('{ end_time }', el.end_time)
                        .replace('{ id }', el.id)
                        .replace('{ p_price }', el.coupon_point.replace('.00', ''))
                }
            });
            if(!this.isChoose) {
                $('.coupon-wra').find('.fr').html(newCouponArr.length + '张可用 &gt;');
            }
            $('.discounts').empty().append(html);
            var coupon_price = this.couponDefaultPrice;
            for(var k in this.data) {
                var data = this.data[k];
                data.forEach(function(ele) {
                    if(ele.id == calledId) {
                        var price = (ele['point_money'] - coupon_price).toFixed(2);
                        $('em.pay-price').text(price);
                    }
                });
            }

            var loggedIn = $('#dataLoggedIn').attr('data-loggedIn');
            if (loggedIn != 1) return;

            var curPayNodeIndex = $('.cb-t', '.crb-box').find('.curr').index(),
                method = curPayNodeIndex === 0 ? 1 : curPayNodeIndex === 1 ? 2 : null,
                coupon_id = this.couponDefaultId;
            method && getQrCode(calledId, method, coupon_id);
        },
        addActiveClass: function(obj) {
            $(obj).addClass(this.options.activeClass);
        }
    });
    
    var defaultChargeMethod = 1,
        qrTimeoutId; // 默认充值方式为微信充值
    function getQrCode(id, method, coupon_id) {
        var method = method || defaultChargeMethod;
        $('#weixincode').add('#alipaycode').attr('src', '/assets/images/loadcode.gif');

        if (qrTimeoutId) clearTimeout(qrTimeoutId);
        qrTimeoutId = setTimeout(function(){
            $.ajax({
                url: '/tools/pay_code',
                type: 'POST',
                data: {
                    id: id,
                    method: 1,
                    coupon_relation_id: coupon_id
                },
                dataType: 'json',
                success: function(msg) {
                    if(msg.code != 200) {
                        alert('获取二维码失败，请重试');
                        return;
                    }
                    if(msg.data === false) {
                        alert('请求二维码过于频繁，请稍后再试！');
                        return;
                    }
                    $('#weixincode').prop('src', msg.data);
                },
                error: function(msg) {
                    return;
                }
            });

            // $.ajax({
            //     url: '/tools/pay_ali',
            //     type: 'POST',
            //     data: {
            //         id: id
            //     },
            //     dataType: 'json',
            //     success: function(msg) {
            //         if(msg.code != 200) {
            //             alert('获取二维码失败，请重试');
            //             return;
            //         }
            //         if(msg.data === false) {
            //             alert('请求二维码过于频繁，请稍后再试！');
            //             return;
            //         }
            //         $('#alipaycode').prop('src', msg.data);
            //     },
            //     error: function(msg) {
            //         return;
            //     }
            // });
        }, 1000);
    }

    win.ProduceData = ProduceData;
})(window, document, jQuery);

// //刷新付款成功后弹框
// function pay_ok_tips() {
//     var p_userid = getcookie('_userid');
//     if(p_userid){
//         $.ajax({
//             url: "/pay/get_pay_ok" ,
//             success: function (data) {
//                 if(data!=0){
//                     $(".payback-box").show();
//                     $("#pay-type").attr("class", "pay-ok-" + data);
//                     var payok_off = window.clearInterval(payok_on);
//                 }
//             }
//         });
//
//     }
// }
// setInterval("pay_ok_tips()", 10000);//刷新付款成功后弹框
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

!!$(function () {

    $(".c-r-c li").click(function(){

        if ($(".c-r span.on").index() == 0) {
            deanClick($(".c-l .jf li"),$(this).index())
        }else{
            kmlClick($(".c-l .hy li"),$(this).index())
        }

        $(this).siblings().removeClass('on');
        $(this).addClass("on");

        var a = $(this).find("font").attr("money");
        $(".view-right span em").text(a);
    });

    $(".cb-t a").click(function(){
        $(this).addClass("curr").siblings().removeClass("curr");
        var index = $(".cb-t a").index(this);
        $(".cb-b .tt").eq(index).show().siblings().hide();

    });

    $(".yc-c").click(function(){
        $(".c-r-c li.on").removeClass("buy")
        $(".c-r-c li.on").addClass("buy")
    });

    $('.jf-r li.on').click();
});

$(function() {
    $('.pay-code-bg').add('#login-info').click(function() {
        $('#login-btn').trigger('click');
    })
});

