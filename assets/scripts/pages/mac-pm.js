$(function() {
    'use strict';

    var dom = {
        $sideNav: $('#pm_side-nav'),
        $payHook: $('#payments-hook'),
        $payMethod: $('#pay-method-hook').find('.method'),
        $tutImg: $('.tut-img-wrapper'),
        $changeAvatar: $('#change-avatar'),
        $avatarsBox: $('#avatars-box'),
        $avatarsHook: $('#avatars-hook'),
        $avatars: $('#avatars-box').find('img'),
        $reportRadios: $('#report-radios-hook'),
        $reportUrl: $('#report-url-hook'),
        $cmContent: $('.cm-content'),
        $msgTable: $('#msgs-table'),
        $checkAll: $('#check-all'),
        $msgPagi: $('#msgs-pagination'),
        $likesPagi: $('#likes-pagination'),
        $likesHook: $('#likes-hook'),
        $downloadsHook: $('#downloads-hook'),
        $footprintHook: $('#footprint-hook'),
        $preloadGif: $('#preload-gif'),
        $qrcodeHook: $('#qrcode-hook'),
        $vipCharge: $('#vip-charge'),
        $paymentsType: $('.payments-type', '#payments-hook'),
        $shouldPayHook: $('#should-pay-hook'),
        $memberTypes: $('.member-type', '#member-type-toggle'),
        $recordsTable: $('#records-table-hook'),
        $recordsFilters: $('#records-filters'),
        $recordsPagi: $('#records-pagination'),
        $spentTable: $('#spent-table'),
        $spentPagi: $('#spent-pagination')
    };

    var reg = {
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        url: /[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
    };

    var vipChargeData = {
        'vip': [],
        'points': []
    };


    var defaultLikesPerPage = 20,
        defaultMsgPerPage = 10,
        defaultRecordsPerPage = 20,
        defaultReportedMsgPerPage = 10,
        defaultSpentHistoryPerPage = 20;

    var likesUrl = '/member_favorite',
        deleteLikesUrl = '/del_favorite',
        downloadUrl = '/member_download',
        deleteDownloadUrl = '',
        footprintUrl = '/tools/footprint',
        deleteFootprintUrl = '/tools/footprint_del',
        reportedUrl = '/error_report_list',
        spentHistoryUrl = '/pay_spend';

    var wechatMethod = 1,
        alipayMethod = 2,
        defaultInitialPay = wechatMethod; // 微信支付对应1，支付宝对应2；

    var chargeHistoryCache; // 充值记录缓存数据

    var sentPayCodeIntervalId; // 二维码支付状态轮询间隔

    /**
     * 监控url的hash变化，根据url/#/后的路由展示不同的内容
     */
    var msgAjaxSent = false,
        likesAjaxSent = false,
        downloadAjaxSent = false,
        footprintAjaxSent = false,
        reportedAjaxSent = false,
        vipAjaxSent = false;

    $(window).on('load hashchange', function() {
        var href = window.location.href,
            lastHashIndex = href.lastIndexOf('/#/');

        if (lastHashIndex <= 0 || lastHashIndex === href.length - 3) {
            window.location.href = '/mac/pm/#/uc-overall';
            hashChangeEvents();
        } else {
            hashChangeEvents();
        }

        function hashChangeEvents() {
            var targetHref = href.substr(lastHashIndex + 3),
                targetView = targetHref.split('-');

            var $activeShowItem = $('.active-show_item');
            $activeShowItem.each(function(i, ele){
                if ($(this).is('.' + targetView[1])) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });

            __commonToggleActive($('.toggled-view.' + targetView[0]));

            targetView[1] && __commonToggleActive($('.toggled-view.' + targetView[0]).find('.' + targetView[1]));

            targetView[2] && __commonToggleActive($('.third-layer.' + targetView[2]));

            switch(targetHref) {
                case 'uc-msgs':
                    var music = document.getElementById("myaudio"); 
                    music.pause();
                    $('.new-info-num').remove();
                    if(!msgAjaxSent) {
                        loadMessage(1);
                        msgAjaxSent = true;
                    }
                    break;
                case 'uc-reported':
                    if(!reportedAjaxSent) {
                        loadReportedData(1);
                        reportedAjaxSent = true;
                    }
                    break;
                case 'uc-tel':
                    getCodeImg($('#auth_code'));
                    break;
                case 'uc-info':
                    break;
                case 'cm':
                case 'cm-likes':
                    if(!likesAjaxSent) {
                        loadUserLikes(1, likesUrl);
                        likesAjaxSent = true;
                    }
                    break;
                case 'cm-download':
                    if(!downloadAjaxSent) {
                        loadUserLikes(1, downloadUrl);
                        downloadAjaxSent = true;
                    }
                    break;
                case 'cm-footprint':
                    if(!footprintAjaxSent) {
                        loadUserLikes(1, footprintUrl);
                        footprintAjaxSent = true;
                    }
                    break;
                case 'vip':
                case 'vip-charge':
                case 'vip-charge-vip':
                case 'vip-charge-points':
                    // ajaxInterval();
                    // if(!vipAjaxSent) {
                    //     loadVipData(0);
                    //     vipAjaxSent = true;
                    // }
                    break;
                case 'vip-records':
                    loadChargeHistory();
                    break;
                case 'vip-spent':
                    loadSpentHistory();
                    break;
                default:
                    break;
            }

            if (targetHref.indexOf('vip') < 0 || targetHref.indexOf('records') > 0 || targetHref.indexOf('spent') > 0) {
                clearInterval(sentPayCodeIntervalId);
            }
        }
    });

    /**
     * 点击个人资料中的编辑按钮，启用昵称和邮箱的自定义编辑
     */
    $('.edit-nickname').click(function(e) {
        e.stopPropagation();
        var input = $(this).siblings('input'),
            _val = input.val();
        // if(!_val) {
        //     alert('内容不能为空！');
        //     input.focus();
        //     return;
        // }
        input.toggle().siblings('span').toggle();
        $(this).siblings('#confirm-email-btn').hide();
    });

    // 点击页面的任意地方关闭编辑框
    // $(document).click(function(e) {
    //     $('.editCont').css('display', '').siblings('span').css('display', '');
    //     dom.$avatars.removeClass('active');
    //     dom.$avatarsBox.hide();
    // });

    // 个人资料栏点击保存按钮时保存用户编辑的个人信息
    $('#info-save-btn').click(function(e) {
        e.preventDefault();
        var self = this;
        if($(this).hasClass('grey')) {
            return;
        }
        var headimg = $('#change-avatar').find('img').attr('src'),
            nickname = $('#nickname-hook').val().trim(),
            email = $('#email-hook').val().trim(),
            emailOriginal = $('#email-hook').attr('data-origin'),
            sex = $('#sex-hook').val(),
            job = $('#job-hook').val(),
            province = $('#prov-hook').val(),
            city = $('#city-hook').val(),
            address = $('#address-hook').val();

        if(!nickname) {
            alert('昵称不能为空');
            return;
        }


        sex == '男' ? sex = 1 : (sex == '女' ? sex = 2 : sex = 0);

        var data = {
            headimg: headimg,
            nickname: nickname,
            email: email,
            sex: sex,
            job: job,
            province: province,
            city: city,
            address: address
        };

        $.ajax({
            url: '/edit_user_info',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200) {
                    alert('保存修改成功');
                    $(self).addClass('grey');
                } else {
                    alert(msg.msg);
                }
            }
        });
    });

    // 验证邮箱按钮
    $('#confirm-email-btn').click(function(e) {
        var email = $(this).siblings('input').val();
        if(!email || !reg.email.test(email)) {
            alert('邮箱不存在或邮箱地址不符合规范，请重新输入！');
            return;
        }
        $.ajax({
            url: '/email_checked',
            type: 'POST',
            data: {
                email: email
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200) {
                    alert('已向指定邮箱发送验证码，请移步邮箱查看！');
                }
            }
        });
    });

    // 编辑按钮启用后，输入框输入新内容页面同步更新（未提交服务器）
    $('.editCont').on('keyup change', function(e) {
        e.stopPropagation();
        if(e.keyCode === 13 && $(this).val().length > 0) {
            var _val = __commonHtmlParse($(this).val());
            $(this).hide().siblings('span').html(_val).show();
        } else if (e.keyCode === 13 && $(this).val().length === 0) {
            alert('内容不能为空');
        }
        var $target = $(e.target);
        $target.siblings('span').text($target.val());
        $('#info-save-btn').removeClass('grey');
    });

    // 个人信息修改后’保存修改‘按钮移除置灰
    $('#extra-info').find('select').add($('#extra-info').find('input')).on('keyup change', function(e) {
        $('#info-save-btn').removeClass('grey');
    });

    // 问题提交
    var reportedFlag = false;
    $('#report-btn').click(function(e) {
        e.preventDefault();
        if(reportedFlag) {
            alert('已提交报告，请勿重复提交');
            return;
        }
        var $radios = $('input', '#report-radios-hook'),
            $url = $('input', '#report-url-hook'),
            $textarea = $('textarea', '#report-cont-hook'),
            $alertText = $('.alert-text', '#report-cont-hook'),
            reportType;

        $radios.each(function(i, ele) {
            if($(ele).prop('checked')) {
                reportType = __commonHtmlParse($(ele).attr('value'));
            }
        });

        if(reportType != '其他') {
            var reportUrl = __commonHtmlParse($('input', '#report-url-hook').val().trim());
        }

        var reportCont = __commonHtmlParse($textarea.val().trim());

        if(!reportType) {
            $alertText.text('请选择问题类型！').show();
            return;
        } else if(reportType != '其他' && !reportUrl) {
            $alertText.text('请输入页面的网址！').show();
            $url.focus();
            return;
        } else if(reportType != '其他' && !reg.url.test(reportUrl)) {
            $alertText.text('网址格式不符，请重新输入！').show();
            return;
        } else if(!reportCont) {
            $alertText.text('请详细描述问题！').show();
            return;
        } else {
            $alertText.hide();
        }

        $.ajax({
            url: '/error_report',
            type: 'POST',
            data: {
                'error_type': reportType,
                'url': reportUrl,
                'content': reportCont
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200) {
                    alert('提交服务器成功');
                    reportedFlag = true;
                    $radios.each(function(i, ele) {
                        $(ele).prop('checked', false);
                    });
                    $url.val('');
                    $textarea.val('');
                } else {
                    $alertText.text(msg.msg).show();
                }
            }
        });
    });

    // 问题类型按钮 单选效果实现及其他
    dom.$reportRadios.click(function(e) {
        var $target = $(e.target);
        $target.siblings('input').prop('checked', false);
        $target.is('#report-others') ? dom.$reportUrl.hide() : dom.$reportUrl.show();
    });

    // 站内消息
    $('#msgs-table').click(function(e) {
        switch(e.target.id) {
            case 'check-all':
                toggleCheckAll();
                break;
            case 'delete-checked':
                deleteChecked();
                break;
            default:
                if($(e.target).is('input[type="checkbox"]')) {
                    $('#check-all').prop('checked', '');
                    return;
                }
                break;
        }

        function toggleCheckAll() {
            var $checkBoxes = $('#msgs-table').children('tbody').find('input[type="checkbox"]'),
            checked = $('#check-all').prop('checked');
            $checkBoxes.each(function(i, ele) {
                $(ele).prop('checked', checked);
            })

        }

        function deleteChecked() {
            if(confirm('确认删除已勾选的信息？')) {
                var $checkBoxes = $('#msgs-table').children('tbody').find('input[type="checkbox"]');
                var idArr = [], eleArr = [];
                $checkBoxes.each(function(i, ele) {
                    if($(ele).prop('checked')) {
                        var $tr = $(ele).closest('tr'),
                            id = $tr.attr('data-id');
                            // type = $tr.attr('data-type');
                        // if(type != 0) {
                            $tr.remove();
                            idArr.push(id);
                            eleArr.push(ele);
                        // }
                    }
                });
                if(idArr.length === 0) {
                    alert('请先选择需要删除的元素！');
                    return false;
                }
                deleteMessage(idArr, eleArr);
                $('#check-all').prop('checked', false);
            }
        }
    });

    // 站内消息翻页
    $('.ajax-pagi').click(function(e) {
        var $target = $(e.target);
        if($target.hasClass('disabled') || $target.hasClass('active')) return;

        var len = $(this).find('.num').length,
            $num = $(this).find('.num'),
            active = $(this).find('.active'),
            curIndex = $num.index(active),
            curNum = Number(active.text()),
            context = '#' + $(this)[0].id,
            total = $(this).attr('data-total');

        switch($target[0].className) {
            case 'prev':
                if(curNum == 1)
                    return;
                turnPage(curNum - 1, context);
                break;
            case 'next':
                if(curNum == total)
                    return;
                turnPage(curNum + 1, context);
                break;
            case 'num':
                turnPage($target.text(), context);
                break;
            default:
                break;
        }
    });

    // 内容管理
    dom.$cmContent.each(function(i, ele) {
        $(ele).click(function(e) {
            var $target = $(e.target);
            if($target.hasClass('remove-btn')) {
                var $cmItem = $target.closest('.cm-content-item'),
                    id = $cmItem.attr('data-id'),
                    context = $cmItem.parent().attr('id');

                if(confirm('是否确认移除？')) {
                    deleteLikes(id, $cmItem, context);
                }
            }
        });
    });

    // 更换头像按钮
    dom.$changeAvatar.click(function(e) {
        e.stopPropagation();
        if(!dom.$avatarsHook.children().length) {
            var imgs = [
                "/assets/images/avatarImg-1.jpg",
                "/assets/images/avatarImg-2.jpg",
                "/assets/images/avatarImg-3.jpg",
                "/assets/images/avatarImg-4.jpg",
                "/assets/images/avatarImg-5.jpg",
                "/assets/images/avatarImg-6.jpg",
                "/assets/images/avatarImg-7.jpg",
                "/assets/images/avatarImg-8.jpg"
            ],
                html = '';
            for(var i = 0, len = imgs.length; i < len; i++) {
                var img = $('<img />').attr('src', imgs[i]);
                html += img[0].outerHTML;
            }
            dom.$avatarsHook.append(html);
        }
        dom.$avatarsBox.show();
    });

    dom.$avatarsBox.click(function(e) {
        e.stopPropagation();
        var $target = $(e.target);
        if($target.is('img')) {
            __commonToggleActive($target);
        } else if($target.is('#change-avatar-btn')) {
            var $imgs = dom.$avatarsHook.children();
            $imgs.each(function(i, ele) {
                if($(ele).hasClass('active')) {
                    var _src = ele.src;
                    $('.avatar-img-hook').each(function(index, element) {
                        $(this).attr('src', _src);
                    });
                    $('#info-save-btn').removeClass('grey');
                } else {
                    return;
                }
            });
            dom.$avatarsBox.hide();
        } else if($target.is('.close-btn')) {
            $(this).hide();
        }
    });

    // 软件收藏a链接跳转前判断资源是否已删除
    dom.$likesHook.click(function(e){
        if (!$(e.target).is('.remove-btn')) {
            var $li = $(e.target).closest('li');
            if(!$li.length)
                return;
            e.preventDefault();
            var id = $li.attr('data-id'),
                href = $(e.target).closest('a').attr('href');
            $.ajax({
                url: '/check_res',
                type: 'POST',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function(msg){
                    if(msg.code == 404) {
                        alert(msg.msg);
                        $li.remove();
                    } else {
                        window.location = href;
                    }
                }
            });
        }
    });

    // vip充值点击切换二维码
    dom.$vipCharge.click(function(e) {
        var $target = $(e.target);

        if($target.hasClass('member-type')) {
            var _index = $target.index();
            var id = dom.$paymentsType.eq(_index).find('.active').attr('data-id'),
                $methodHook = dom.$payMethod.filter('.active'),
                method;
            method = $methodHook.is('#wechat-pay') ? wechatMethod : alipayMethod;
            getQrCode(id, method);
        } else if($target.hasClass('payment') || $target.closest('.payment').length > 0) {
            $target = $target.closest('.payment');
            __commonToggleActive($target);

            var id = $target.attr('data-id'),
                $methodHook = dom.$payMethod.filter('.active'),
                method;
            method = $methodHook.is('#wechat-pay') ? wechatMethod : alipayMethod;
            getQrCode(id, method);
        } else if($target.hasClass('method') || $target.closest('.method').length > 0) {
            $target = $target.closest('.method');
            if($target.hasClass('active')) return;
            __commonToggleActive($target);

            var targetId = $target.id;
            __commonToggleActive(dom.$tutImg.find('.' + targetId));

            var method, id;
            method = $target.is('#wechat-pay') ? wechatMethod : alipayMethod;
            id = dom.$paymentsType.filter('.active').children('.active').attr('data-id');
            getQrCode(id, method);
        }
    });

    // 过滤条件点击
    dom.$recordsFilters.click(function(e) {
        filterChargeHistory();
    });

    // 充值记录翻页
    dom.$recordsPagi.click(function(e) {
        var $target = $(e.target);
        var curIndex = $(this).find('.active').text();
        if($target.hasClass('active') || $target.hasClass('disabled')) return;
        switch($target[0].className) {
            case 'prev':
                ajaxTurnPage(+curIndex - 1);
                break;
            case 'next':
                ajaxTurnPage(+curIndex + 1);
                break;
            case 'num':
                ajaxTurnPage($target.text());
                break;
        }

        function ajaxTurnPage(index) {
            showChargeHistory(chargeHistoryCache, index);
        }
    });

    // 消费记录检索项条件更改后’搜索‘按钮移除置灰
    $('#spent-filters').find('select').add($('#spent-filters').find('input')).on('keyup change', function(e) {
        $('#spent-search').removeClass('grey');
    });

    // 消费记录搜索功能
    $('#spent-search').click(function(){
        var timeVal = $(this).siblings('#spent-time').val(),
            typeVal = $(this).siblings('#spent-type').val(),
            userInput = $(this).siblings('#spent-content').val();

        var data = {
            'add_time': timeVal,
            'spend_type': typeVal,
            msg: userInput
        };

        for(var key in data) {
            data[key] = __commonHtmlParse(data[key]);
        }

        loadSpentHistory(1, data);
    });

    // 省市联动
    var setProv, setCity;
    $('.prov', '#city').attr('value') ? setProv = $('.prov', '#city').attr('value') : setProv = '';
    $('.city', '#city').attr('value') ? setCity = $('.city', '#city').attr('value') : setCity = '';
    $('#city').citySelect({
        url: '/assets/scripts/static/city.min.js',
        prov: setProv,
        city: setCity,
        required: false
    });

    /**
     * ajax获取站内信息内容，默认每页获取10条数据
     * @type {number} 站内信息页码数
     */
    function loadMessage(pageNum) {
        $.ajax({
            url: '/member_notify',
            type: 'POST',
            data: {
                page_size: defaultMsgPerPage,
                page: pageNum
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200 && typeof msg['data'] === 'object') {
                    var data = msg.data.info,
                        total = msg.data.total,
                        pagiTotal = Math.ceil(total/defaultMsgPerPage),
                        curMsgLength = $('#msgs-pagination').children().length;
                    data.length > 0 ? showMessage(data) : $('#no-msg-show').show();
                    total >= defaultMsgPerPage && ((pageNum % 10 == 0) || (pagiTotal != curMsgLength)) && createPagi(pagiTotal, pageNum, dom.$msgPagi);

                    total < defaultMsgPerPage && dom.$msgPagi.remove();
                    dom.$msgPagi.length > 0 && dom.$msgPagi.attr('data-total', pagiTotal);
                } else {
                    dom.$msgTable.children().not('#no-msg-show').remove();
                    $('#no-msg-show').show();
                }
            },
            error: function(msg) {
                alert('服务器错误，请重试！');
            }
        });
    }

    /**
     * 信息内容拼接并插入站内信息表格的tbody中
     * @type {string}
     */
    // var messageTemplate = '<tr data-id="{{ id }}" data-type="{{ type }}"><td class="checkbox"><input type="checkbox"></td><td class="preview"><p class="msg-preview"><span class="msg-type">通知：</span><span class="msg-title">{{ content }}</span></p><p class="msg-time">{{ time }}</p></td><td></td></tr>';
    var messageTemplate = '<tr data-id="{{ id }}"><td class="preview"><p class="msg-preview"><span class="msg-type">系统消息：</span><span class="msg-title">{{ content }}</span></p><p class="msg-time">{{ time }}</p></td></tr>';
    function showMessage(data) {
        var html = '';
        $.each(data, function(i, ele) {
            if(typeof ele === 'object') {
                var _msgTemp = messageTemplate
                                .replace('{{ id }}', ele.id)
                                .replace('{{ content }}', ele.content)
                                .replace('{{ type }}', ele['to_member_id'])
                                .replace('{{ time }}', format (ele['send_time'] * 1000));
                html += _msgTemp;
            }
            dom.$msgTable.find('tbody').empty().append(html);
        });
    }


    /**
     * 会员中心——内容管理——删除信息操作
     * @param idArr 待删除的信息id组成的数组
     */
    function deleteMessage(idArr, ele) {
        var pageNum = dom.$msgPagi.find('.num.active').text() || 1,
            len = dom.$msgTable.find('tbody').children().length;
        pageNum = len > 0 ? pageNum : pageNum - 1;
        $.ajax({
            url: '/del_notify',
            type: 'POST',
            data: {
                id: JSON.stringify(idArr)
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200) {
                    alert('删除成功');
                    $('#msgs-pagination').length > 0 ? loadMessage(pageNum) : $(ele).each(function(i, ele) {
                        $(ele).remove();
                    });
                    return true;
                }
            },
            error: function(msg) {
                alert('操作失败！请重试！');
            }
        });
    }

    function createPagi(totalPage, pageNum, hook) {
        if(totalPage == 1) {
            $(hook).empty();
            return;
        }

        var prevTemplate = '<a href="javascript:;" class="prev" target="_self">&lt;&lt;</a>',
            nextTemplate = '<a href="javascript:;" class="next" target="_self">&gt;&gt;</a>';

        var pagiNumHtml = '', i, numActive;
        if(totalPage <= 10 || (totalPage > 10 && pageNum < 10)) {
            for(i = 1; i <= Math.min(totalPage, 10); i++) {
                i == pageNum ? numActive = 'num active' : numActive = 'num';
                var _numTemp = '<a href="javascript:;" class="' + numActive + '" value="' + i + '" target="_self">' + i + '</a>';

                pagiNumHtml += _numTemp;
            }
        } else {
            var numFloor = Math.floor(pageNum / 10) * 10,
                numCeil = Math.min(numFloor + 10, totalPage);

            for(i = numFloor; i <= numCeil; i++) {
                i == pageNum ? numActive = 'num active' : numActive = 'num';
                var _numTemp = '<a href="javascript:;" class="' + numActive + '" value="' + i + '" target="_self">' + i + '</a>';

                pagiNumHtml += _numTemp;
            }
        }
        $(hook).empty().append(prevTemplate, pagiNumHtml, nextTemplate);

        return true;
    }

    function turnPage(num, context) {
        var $target = $('.num', context).filter(function() {
            return $(this).text() == num;
        });

        var url;
        switch(context) {
            case '#likes-pagination':
                url = likesUrl;
                loadUserLikes(num, url);
                break;
            case '#downloads-pagination':
                url = downloadUrl;
                loadUserLikes(num, url);
                break;
            case '#footprint-pagination':
                url = footprintUrl;
                loadUserLikes(num, url);
                break;
            case '#msgs-pagination':
                loadMessage(num);
                dom.$checkAll.prop('checked', false);
                break;
            case '#reported-pagination':
                loadReportedData(num);
                break;
            case '#spent-pagination':
                loadSpentHistory(num);
                break;
            case '#discount-pagination':
                couponRqData.page = num;
                getCoupon(couponRqData);
                break;
            default:
                break;
        }

        __commonToggleActive($target);
    }

    // ajax获取用户收藏、渲染、删除
    // 用户收藏

    function loadUserLikes(pageNum, url) {
        var boxHook, pagiHook;

        url == likesUrl ? (boxHook = dom.$likesHook) && (pagiHook = $('#likes-pagination')) : (url == downloadUrl ? ((boxHook = dom.$downloadsHook) && (pagiHook = $('#downloads-pagination'))) : (boxHook = dom.$footprintHook) && (pagiHook = $('#footprint-pagination')));

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                page_size: defaultLikesPerPage,
                page: pageNum
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200 && typeof msg['data'] === 'object') {
                    var data = msg.data.data,
                        total = msg.data.total,
                        pagiTotal = Math.ceil( total / defaultLikesPerPage ),
                        curMsgLength = pagiHook.children().length;

                    data.length > 0 ? showLikes(data, boxHook) : boxHook.siblings('.no-data-show').show();
                    total >= defaultLikesPerPage && ((pageNum % 10 == 0) || (pagiTotal != curMsgLength)) && createPagi(pagiTotal, pageNum, pagiHook);

                    total < defaultLikesPerPage && pagiHook.remove();
                    boxHook.attr('data-total', pagiTotal);
                } else {
                    boxHook.empty();
                    boxHook.siblings('.no-data-show').show();
                }
            },
            error: function(msg) {
                alert('服务器错误，请重试！');
            }
        });
    }

    var likesTemplate = '<li class="cm-content-item" data-id="{{ id }}" data-res="{{ res }}"><a  href="{{ url }}"><div class="img-wrapper"><img src="{{ imgSrc }}"></div><h2 class="item-title">{{ title }}</h2><p class="time">{{ time }}</p><span class="download-btn">下载</span></a><span class="remove-btn"></span></li>';
    function showLikes(data, hook) {
        var html = '';
        $.each(data, function(i, ele) {
            if(typeof ele === 'object') {
                var _msgTemp = likesTemplate
                    .replace('{{ imgSrc }}', ele.thumb)
                    .replace('{{ title }}', ele.title)
                    .replace('{{ time }}', formatDate(ele['add_time'] * 1000, 'Y-m-d'))
                    .replace('{{ url }}', ele.url);

                if(hook == dom.$footprintHook) {
                    _msgTemp = _msgTemp
                        .replace('{{ id }}', ele.key)
                        .replace('{{ res }}', '');
                } else {
                    _msgTemp = _msgTemp
                        .replace('{{ id }}', ele.id)
                        .replace('{{ res }}', ele.res);
                }
                if(hook == dom.$downloadsHook) {
                    _msgTemp = _msgTemp.replace('<span class="remove-btn"></span>', '');
                }
                html += _msgTemp;
            }

            hook.empty().append(html);
        });
    }

    function deleteLikes(id, ele, context) {
        var deleteUrl, loadUrl, pagiHook, boxHook,
            data = {
                id: id
            };
        switch(context) {
            case 'likes-hook':
                loadUrl = likesUrl;
                deleteUrl = deleteLikesUrl;
                pagiHook=$('#likes-pagination');
                boxHook = dom.$likesHook;
                break;
            case 'downloads-hook':
                loadUrl = downloadUrl;
                deleteUrl = deleteDownloadUrl;
                pagiHook = $('#downloads-pagination');
                boxHook = dom.$downloadsHook;
                break;
            case 'footprint-hook':
                loadUrl = footprintUrl;
                deleteUrl = deleteFootprintUrl;
                pagiHook = $('#footprint-pagination');
                boxHook = dom.$footprintHook;
                data = {
                    key: id
                };
                break;
        }

        var pageNum = pagiHook.find('.num.active').text() || 1,
            len = boxHook.children().length;
        pageNum = len > 0 ? pageNum : pageNum - 1;

        $.ajax({
            url: deleteUrl,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200) {
                    alert(msg.msg);
                    pagiHook.length > 0 ? loadUserLikes(pageNum, loadUrl) : $(ele).remove();
                    return true;
                } else {
                    alert('删除失败，请重试。');
                }
            }
        });
    }

    var defaultInitialHook = '#vip-hook';
    function loadVipData(pointType) {
        $.ajax({
            url: ' /tools/member_point_info',
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
                var data = msg['data'];
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

                var $curActivePayType = dom.$memberTypes.filter('.active'),
                    _index =$curActivePayType.index(),
                    id = dom.$paymentsType.eq(_index).find('.active').attr('data-id'),
                    $methodHook = dom.$payMethod.filter('.active'),
                    method;
                method = $methodHook.is('#wechat-pay') ? wechatMethod : alipayMethod;
                getQrCode(id, method);
                return true;
            },
            error: function(msg) {

            }
        });
    }

    // var chargeTemplate = '<div class="payment active"><span class="should-pay">{{ shouldPay }}元</span><p class="payment-cost"><em>{{  shouldPay }}</em>元/年</p><p class="package-desc">下载限制：5次/天</p></div>';
    var chargeTemplate = '<div class="payment{{ activeClass }}" data-id="{{ id }}"><span class="should-pay">{{ shouldPay }}元</span><p class="payment-cost"><em>{{ charge }}</em>{{ pointType }}</p></div>';
    function showVipData(data) {
        var _chargeTemplate, vipHtml = '', pointsHtml = '';

        $.each(data['vip'], function(i, ele){
            var activeClass = i === 0 ? ' active' : '',
                unit;

            switch(ele['package']) {
                case 1:
                    unit = '月';
                    break;
                case 2:
                    unit = '季';
                    break;
                case 3:
                    unit = '半年';
                    break;
                case 4:
                    unit = '年';
                    break;
            }

            _chargeTemplate = chargeTemplate
                .replace('{{ activeClass }}', activeClass)
                .replace('{{ id }}', ele.id)
                .replace('{{ shouldPay }}', ele['point_money'])
                .replace('{{ pointType }}', '元/' + unit)
                .replace('{{ charge }}', ele['point_money']);
            vipHtml += _chargeTemplate;
        });

        $.each(data['points'], function(i, ele) {
            var activeClass = i === 0 ? ' active' : '';

            _chargeTemplate = chargeTemplate
                .replace('{{ activeClass }}', activeClass)
                .replace('{{ id }}', ele.id)
                .replace('{{ shouldPay }}', ele['point_money'])
                .replace('{{ pointType }}', '积分')
                .replace('{{ charge }}', ele['point_num']);
            pointsHtml += _chargeTemplate;
        });

        $('#vip-hook').empty().append(vipHtml);
        $('#points-hook').empty().append(pointsHtml);
    }

    // 调用充值二维码
    var defaultChargeMethod = 1,
        codeTimeoutId; // 默认充值方式为微信充值
    function getQrCode(id, method) {
        var method = method || defaultChargeMethod;
        dom.$preloadGif.show();
        if (codeTimeoutId) {
            clearTimeout(codeTimeoutId);
        }
        codeTimeoutId = setTimeout(function(){
            $.ajax({
                url: '/tools/pay_code',
                type: 'POST',
                data: {
                    id: id,
                    method: method
                },
                dataType: 'json',
                success: function(msg) {
                    if(msg.code != 200) {
                        alert('获取二维码失败，请刷新页面重试！');
                        vipAjaxSent = false;
                        return;
                    }
                    if(msg.data === false) {
                        alert('请求二维码过于频繁，请稍后再试！');
                        vipAjaxSent = false;
                        return;
                    }
                    dom.$qrcodeHook.prop('src', msg.data);
                    for(var key in vipChargeData) {
                        var data = vipChargeData[key];
                        data.forEach(function(ele) {
                            if(ele.id == id) {
                                dom.$shouldPayHook.text(ele['point_money']);
                            }
                        });
                    }
                    dom.$preloadGif.hide();
                },
                error: function(msg) {
                    alert('获取二维码失败，请刷新页面重试！');
                    vipAjaxSent = false;
                    return;
                }
            });
        }, 2000);
    }

    // 加载充值记录
    function loadChargeHistory() {
        $.ajax({
            url: '/tools/pay_account',
            type: 'POST',
            success: function(msg) {
                if(msg.code != 200) {
                    alert('获取数据失败，请刷新页面重试！');
                    return;
                }
                chargeHistoryCache = msg.data;
                showChargeHistory(chargeHistoryCache);
            }
        });
    }

    // 加载已提交问题列表
    function loadReportedData(pageNum) {
        var pageNum = pageNum || 1;
        $.ajax({
            url: reportedUrl,
            type: 'POST',
            data: {
                page_size: defaultReportedMsgPerPage,
                page: pageNum
            },
            dataType: 'json',
            success: function(msg) {
                if(msg.code == 200) {
                    var data = msg.data;
                    if(data && typeof data == 'object') {
                        showReportedList(data.info);
                        var totalPage = Math.ceil(data.total / defaultReportedMsgPerPage);
                        totalPage > 1 && createPagi(totalPage, pageNum, $('#reported-pagination')) && $('#reported-pagination').attr('data-total', totalPage);
                    }
                }
            }
        });
    }

    var reportedTemplate = '<tr><td class="url" colspan="2"><a href="{{ url }}">{{ url }}</a></td><td>{{ type }}</td><td class="content" colspan="2">{{ content }}</td><td>{{ time }}</td></tr>';
    function showReportedList(data) {
        var html = '';
        $.each(data, function(i, ele) {
            var _reported = reportedTemplate
                .replace('{{ url }}', ele.url)
                .replace('{{ url }}', ele.url)
                .replace('{{ type }}', ele['error_type'])
                .replace('{{ content }}', ele.content)
                .replace('{{ time }}', formatDate(ele['add_time'] * 1000, 'Y-m-d'));
            html += _reported;
        });

        $('#reported-table').find('tbody').empty().append(html);
    }

    var recordsTemplate = '<tr><td>{{ content }}</td><td>{{ time }}</td><td>{{ type }}</td><td>{{ money }}元</td><td>{{ points }}</td></tr>';
    function showChargeHistory(data, pageNum) {
        var pageNum = pageNum || 1;
        if(data.length) {
            var html = '';
            $.each(data, function(i, ele) {
                if(i >= (pageNum - 1) * defaultRecordsPerPage && i < pageNum * defaultRecordsPerPage) {
                    var content = ele.type == 1 ? '购买积分' : '升级VIP',
                        type = ele.payment == '微信支付' ? '微信' : ele.payment == '支付宝支付' ? '支付宝' : '其它充值',
                        points = ele.type == 1 ? ele['point_name'] : '0积分';
                    var _recordsTemplate = recordsTemplate;
                    _recordsTemplate = _recordsTemplate
                        .replace('{{ content }}', content)
                        .replace('{{ time }}', formatDate(ele['add_time'] * 1000, 'Y-m-d'))
                        .replace('{{ type }}', type)
                        .replace('{{ money }}', ele['money'])
                        .replace('{{ points }}', points);
                    html += _recordsTemplate;
                }
            });
            dom.$recordsTable.empty().append(html);

            if(data.length > defaultRecordsPerPage) {
                var totalPage = Math.ceil(data.length / defaultRecordsPerPage);
                createPagi(totalPage, pageNum, $('#records-pagination'));
            } else {
                $('#records-pagination').empty();
            }
        } else {
            var noDataTd = '<tr class="no-data-show"><td colspan="5">没有相关数据</td></tr>';
            dom.$recordsTable.empty().append(noDataTd);
        }
    }

    function filterChargeHistory() {
        var $selects = dom.$recordsFilters.find('select');
        var _data = [],
            conditions = {};

        $selects.each(function(i, ele) {
            var filterType = $(this).attr('filter-type'),
                value = $(this).val();
            switch(filterType) {
                case 'time':
                    filterTime(value);
                    break;
                case 'payment':
                    filterPay(value);
                    break;
                case 'type':
                    filterMember(value);
                    break;
                default:
                    break;
            }
        });

        function filterTime(days) {
            var targetTime = days != 'all' ? (Date.now() / 1000 - days * 24 * 3600) : 0;
            chargeHistoryCache.forEach(function(ele) {
                ele['add_time'] >= targetTime && _data.push(ele);
            });

        }

        function filterPay(val) {
            if(val === 'all') {
                return _data;
            }
            var tempData = [];
            _data.forEach(function(ele, i) {
                ele['payment'] == val && tempData.push(ele);
            });

            _data = tempData;
        }

        function filterMember(val) {
            if(val === 'all') {
                return _data;
            }

            var tempData = [];
            _data.forEach(function(ele) {
                ele['type'] == val && tempData.push(ele);
            });

            _data = tempData;
        }

        showChargeHistory(_data);
    }

    // 消费历史纪录
    function loadSpentHistory(pageNum, data) {
        var pageNum = pageNum || 1;
        var data = $.extend({
                page_size: defaultSpentHistoryPerPage,
                page: pageNum
            }, data);
        $.ajax({
            url: spentHistoryUrl,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(msg) {
                if(msg.code == 200) {
                    if(msg.message) {
                        dom.$spentTable.find('tbody').empty().append('<tr><td colspan="6">' + msg.message + '</td></tr>');
                        return;
                    }
                    var data = msg.data;
                    typeof data == 'object' && showSpentHistory(data.info);
                    if(data.total > defaultSpentHistoryPerPage) {
                        var totalPage = Math.ceil(data.total / defaultSpentHistoryPerPage);
                        dom.$spentPagi.attr('data-total', data.total);
                        createPagi(totalPage, pageNum, dom.$spentPagi);
                    }else {
                        dom.$spentPagi.empty();
                    }
                } else {

                }
            }
        })
    }

    var spentHistoryTemplate = '<tr><td colspan="3">{{ content }}</td><td>{{ time }}</td><td>{{ type }}</td><td>{{ points }}</td></tr>';
    function showSpentHistory(data) {
        var html = '';
        $.each(data, function(i, ele) {
            var type,points,content;
            switch(ele['spend_type']) {
                case 3:
                    type = 'VIP免费下载';
                    points = '原价 ' + ele.value + ' 积分';
                    content = '下载软件<a href="{{ link }}" class="url">'+ ele.msg.substring(5, ele.msg.length - 1) +'</a> ';
                    break;
                case 2:
                    type = '积分下载';
                    points = ele.value + ' 积分';
                    content = '下载软件<a href="{{ link }}" class="url">'+ ele.msg.substring(5, ele.msg.length - 1) +'</a> ';
                    break;
                case 4:
                    type = '积分抽奖';
                    points = ele.value + ' 积分';
                    content = ele.msg;
                    break;
            }
            var _spentTemp = spentHistoryTemplate
                    .replace('{{ content }}', content)
                    .replace('{{ link }}', ele.url)
                    .replace('{{ time }}', formatDate(ele['add_time'] * 1000, 'Y-m-d'))
                    .replace('{{ type }}', type)
                    .replace('{{ points }}', points);

            html += _spentTemp;
        });
        dom.$spentTable.find('tbody').empty().append(html);
    }

    // 定时发送ajax请求，查询支付状态
    function ajaxInterval() {
        sentPayCodeIntervalId = setInterval(function(){
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

    /**
     * 格式化时间
     * @param time传入的时间戳，单位必须是毫秒
     * @returns {string}
     */
    function formatDate(time, format) {
        var date = new Date(time),
            y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            min = date.getMinutes();
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;
        h = h > 9 ? h : '0' + h;
        min = min > 9 ? min : '0' + min;
        return format ? format.replace('Y', y).replace('m', m).replace('d', d).replace('h', h).replace('m', m) : y + '-' + m + '-' + d + ' ' + h + ':' + min;
    }


    // 手机验证
    var $tel_athu = $('.tel-athu'),
        $auth_code = $('#auth_code'),
        $tel_num = $('#tel_num'),
        $tel_pic = $('#tel_pic'),
        $tel_code = $('#tel_code'),
        $get_code = $('#get_code'),
        $tel_tips = $('.tel_tips'),
        $submit_tel = $('#submit_tel'),
        codeIsSending = false,
        curTelNum,
        time_phone,
        $hasBindTel = $('#hasBindTel');

    $tel_pic.on('focus click', function() {
        if(!tel_format($tel_num.val()) || $tel_num.val() == '') {
            $tel_tips.text('手机号格式错误').addClass('active').css('color','#FF5A5A');
            return;
        }
        $tel_tips.removeClass('active');
    })
    $auth_code.click(function() {
        getCodeImg($(this));
    });

    // 获取手机验证码
    $get_code.click(function () {
        if(codeIsSending) return;
        curTelNum = $tel_num.val();

        var picNum = $tel_pic.val(),
            sessionName = $tel_pic.attr('data-session-name');
        if(!tel_format(curTelNum) || curTelNum == '') {
            $tel_tips.text('手机号格式错误').addClass('active').css('color','#FF5A5A');
            return;
        }
        if(picNum == '' || picNum.length != 4) {
            $tel_tips.text('图形验证码格式错误').addClass('active').css('color','#FF5A5A');
            return;
        }
        var data = new Object;
        data[sessionName] = picNum;
        data.phone = curTelNum;
        $.ajax({
            url: '/phone_note',
            type: 'POST',
            data: data,
            success: function(res) {
                if(res.code == 200) {
                    $tel_tips.text(res.msg).addClass('active').css('color','green');
                    // 按钮处理
                    time_phone = res.time_phone;
                    codeIsSending = true;
                    timerInter ($get_code);
                    getCodeImg($auth_code);
                    return;
                }else {
                    $tel_tips.text(res.msg).addClass('active').css('color','#FF5A5A');
                    getCodeImg($auth_code);
                }
            },
            error: function(error) {
                return error;                                                           
            }
        })

    });
    $submit_tel.click(function() {
        var val = $tel_code.val(),
            re = /^[0-9]+.?[0-9]*$/;
        if(!re.test(val) || val.length != 6) {
            $tel_tips.text('请输入正确验证码格式').addClass('active').css('color','#FF5A5A');
            return;
        }
        if(!codeIsSending) {
             $tel_tips.text('请获取验证码').addClass('active').css('color','#FF5A5A');
             return;
        } 
        $.ajax({
            url: '/note_verification',
            type: 'POST',
            data: {
                verification_code: val,
                phone: curTelNum,
                time_phone: time_phone
            },
            success: function(res) {
                if(res.code == 200) {
                    alert('绑定成功');
                    $tel_tips.text('').removeClass('active');
                    $tel_athu.find('.toggle_view').removeClass('active');
                    $tel_athu.find('.toggle_view.hasBind').addClass('active');
                    $hasBindTel.find('span').text(curTelNum);
                }else {
                    $tel_tips.text(res.msg).css('color','#FF5A5A');
                }
            },
            error: function (error) {
                alert(error)
            }

        })
    });
    // 点击更换手机号
    var $change_tel = $('#change_tel');
    $change_tel.click(function() {
        $tel_athu.find('.toggle_view').removeClass('active');
        $tel_athu.find('.toggle_view.changeBind').addClass('active');
    });
    var $get_change_code = $('#get_change_code'),
        $past_tel_num = $('#past_tel_num'),
        $tel_tips_past = $('.tel_tips_past'),
        $old_code = $('#old_code'),
        $submit_new_tel = $('#submit_new_tel'),
        $new_tel_num = $('#new_tel_num'),
        oldTelNum;
    $get_change_code.click(function() {
        oldTelNum = $past_tel_num.val();
        if(oldTelNum == '') {
            $tel_tips_past.addClass('ractive').text('原手机号码不能填入为空')
            return; 
        }
        if(!tel_format(oldTelNum)) {
            $tel_tips_past.addClass('ractive').text('原手机号码格式错误')
            return;
        }
        $.ajax({
            url: '/chang_phone',
            type: 'POST',
            data: {
                phone_old: oldTelNum
            },
            success: function(res) {
                if(res.code == 200) {
                    time_phone = res.time_phone;
                    $tel_tips_past.removeClass('ractive').addClass('gactive').text(res.msg);
                    codeIsSending = true;
                    timerInter ($get_change_code);
                }else {
                    $tel_tips_past.removeClass('gactive').addClass('ractive').text(res.msg);
                    return;
                }
            }
        })

    });
    $submit_new_tel.click(function() {
        var newVal = $new_tel_num.val(),
            val = $old_code.val(),
            re = /^[0-9]+.?[0-9]*$/;
        if(val == '') {
            $tel_tips_past.removeClass('gactive').addClass('ractive').text('请填入验证码');
            return;
        }
        if(!re.test(val) || val.length != 6) {
            $tel_tips_past.removeClass('gactive').addClass('ractive').text('请输入正确验证码格式');
            return;
        }
        if(newVal == '') {
            $tel_tips_past.removeClass('gactive').addClass('ractive').text('新手机号码不能填入为空');
            return;
        }
        if(!tel_format(newVal)) {
            $tel_tips_past.removeClass('gactive').addClass('ractive').text('新手机号码格式错误');
            return;
        }
        $.ajax({
            url: '/v_new_phone',
            type: 'POST',
            data: {
                phone_new: newVal,
                verification_code: val,
                time_phone: time_phone,
                phone_old: oldTelNum
            },
            success: function(res) {
                if(res.code == 200) {
                    alert('绑定成功')
                    $tel_tips_past.text('').removeClass('active');
                    $tel_athu.find('.toggle_view').removeClass('active');
                    $tel_athu.find('.toggle_view.hasBind').addClass('active');
                    $hasBindTel.find('span').text(newVal);
                    $new_tel_num.val('');
                    $past_tel_num.val('');
                    $old_code.val('');
                    $tel_tips_past.text('');
                }else {
                    $tel_tips_past.text(res.msg).css('color','#FF5A5A');
                }
            }
        })

    });

    // 按钮倒计时
    function timerInter (el) {
        var timer,
            num = 60;
        timer = setInterval(function() {
            el.text('重新发送（'+ num-- +'）').addClass('forbid');
            if(!codeIsSending) {
                clearInterval(timer);
                el.text('发送验证码').removeClass('forbid');
            }
            if (num < 0) {
                clearInterval(timer);
                el.text('重新发送').removeClass('forbid');
                codeIsSending = false;
            } 
        },1000)
    };

    $('#sign-btn').click(function() {
        if($(this).text() == '签到') {
            $('#mask-sign').find('.sign-suc').css('paddingLeft', '164px');
            $('#mask-sign').find('.sign-suc').html('签到成功<em>（获得一次免费抽奖机会）</em>')
        }
        $('#mask-sign').fadeIn();  
    })

    var couponHtml = `
        <li class="{{ is_cover }}">
            <div class="dis-con">
                <span class="dis-num"><i>￥</i>{{ price }}</span>
                <p>满{{ min_price }}可用</p>
                <p class="time">{{ start_time }}-{{ end_time }}</p>
            </div>
            <div class="dis-bot">
                <span class="use"><a href="/Mac/vip">立即使用</a></span>
                <span class="over">已过期</span>
            </div>
        </li>
    `;
    var $checkCouponNav = $('#checkCoupon'),
        couponRqData={page:1, coupon_status:-1};
    $checkCouponNav.on('click','li', function(event) {
        __commonToggleActive($(this))
        couponRqData.coupon_status = $(this).attr('data-status');
        couponRqData.page = 1;
        getCoupon(couponRqData);
    });
    getCoupon(couponRqData);
    function showCoupon (data) {
        var html="";
        $.each(data, function(index, el) {
            html += couponHtml
                .replace('{{ is_cover }}', el.status == 0?'':'is-over')
                .replace('{{ price }}', el.coupon_point)
                .replace('{{ min_price }}', el.min_consume)
                .replace('{{ start_time }}', el.add_time)
                .replace('{{ end_time }}', el.end_time)
        });
        return html
    };
    function getCoupon(data) {
        $.ajax({
            url: '/coupon_info',
            type: 'POST',
            data: data,
            success: function (res) {
                if(res.code == 200) {
                    $('.discount-wra').empty();
                    $('.discount-wra').append(showCoupon(res.coupon_info));
                    $('#discount-pagination').empty();
                    res.total > 1 && createPagi(Math.ceil(res.total/12), data.page, $('#discount-pagination')) && $('#discount-pagination').attr('data-total', Math.ceil(res.total/12));
                }
            },
            error: function() {
                return;
            }
        })
        
        
    };
    var $close = $('.renew-close'),
        $renewFee = $('#renew-fee'),
        $renewWra = $('#renew-wra'),
        $renewType = $('.renew-type'),
        $payScan = $('.pay-scan'),
        $couponWra = $('.coupon-wra'),
        $btnAli = $('.btn-ali');
    var codeData = new Object,
        defaultCoupon = 0,
        couponLen = $couponWra.find('.fr').text().replace('张可用 >', '');
    codeData.id = $('#vip-recharge').data('id');
    codeData.method = 1;
    codeData.coupon_relation_id = defaultCoupon;
    codeData.renewals_status = 1;
    $renewFee.click(function(event) {
        $renewWra.fadeIn();
        getPayCode(codeData);
        ajaxInterval();
    });
    $couponWra.click(function(e) {
        if($(this).find('.fr').text().replace('张可用 >', '') == 0) {
            return
        };
        if($(this).hasClass('active')) {
            if($(e.target).closest('.useCoupon').is('.useCoupon')) {
                codeData.coupon_relation_id = $(e.target).data('id');
                $('.pay-num .num').text(($('#vip-recharge').find('i').text()/1 - $(e.target).data('price')).toFixed(2));
                $('.p-text-orange').text(($('#vip-recharge').find('i').text()/1 - $(e.target).data('price')).toFixed(2));
                $('.discounts').removeClass('active');
                $('.coupon-wra').find('.fr').text('￥' + $(e.target).data('price'));
                getPayCode(codeData)
                e.stopPropagation();
                return;
            }
            if($(e.target).closest('.discounts').is('.discounts')) {
                e.stopPropagation();
                return;
            }
            if($(e.target).is('.fr')) {
                e.stopPropagation();
                $('.discounts').toggleClass('active');
                return;
            }
            $(this).removeClass('active');
            $('.discounts').removeClass('active');
            codeData.coupon_relation_id = 0;
            $('.coupon-wra').find('.fr').html(couponLen + '张可用 &gt;');
            $('.pay-num .num').text($('#vip-recharge').find('i').text());
            $('.p-text-orange').text($('#vip-recharge').find('i').text());
            getPayCode(codeData)
            return;
        }
        $(this).addClass('active');
    });
    $close.click(function(event) {
        $renewWra.fadeOut();
    });
    $renewType.on('click', 'span', function(event) {
        var $target = $(event.target).closest('span');
        __commonToggleActive([$target, $payScan.eq($target.index())])
    });
    $btnAli.click(function(event) {
        $('#coupon_pay').val(codeData.coupon_relation_id);
    });
    function getPayCode(data) {
        $.ajax({
            url: '/tools/pay_code',
            type: 'POST',
            data: data,
            beforeSend: function() {
                $('#ewm').fadeOut();
                $('#preload-gif').show();
            },
            success: function(res) {
                if(res.code == 200) {
                    $('#ewm').attr('src', res.data).show();
                    $('#preload-gif').hide();
                }
            },
            error: function (error) {
                return;
            }
        })
    };
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

});
