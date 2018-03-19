'use strict';
(function($){
  $.fn.citySelect=function(settings){
    if(this.length<1){return;};

    // 默认值
    settings=$.extend({
      url:"js/city.min.js",
      prov:null,
      city:null,
      dist:null,
      nodata:null,
      required:true
    },settings);

    var box_obj=this;
    var prov_obj=box_obj.find(".prov");
    var city_obj=box_obj.find(".city");
    var dist_obj=box_obj.find(".dist");
    var prov_val=settings.prov;
    var city_val=settings.city;
    var dist_val=settings.dist;
    var select_prehtml=(settings.required) ? "" : "<option value=''>请选择</option>";
    var city_json;
    // 赋值市级函数
    var cityStart=function(){
      var prov_id=prov_obj.get(0).selectedIndex;
      if(!settings.required){
        prov_id--;
      };
      city_obj.empty().attr("disabled",true);
      dist_obj.empty().attr("disabled",true);

      if(prov_id<0||typeof(city_json.citylist[prov_id].c)=="undefined"){
        if(settings.nodata=="none"){
          city_obj.css("display","none");
          dist_obj.css("display","none");
        }else if(settings.nodata=="hidden"){
          city_obj.css("visibility","hidden");
          dist_obj.css("visibility","hidden");
        };
        return;
      };
      
      // 遍历赋值市级下拉列表
      var temp_html=select_prehtml;
      $.each(city_json.citylist[prov_id].c,function(i,city){
        temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";
      });
      city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
      distStart();
    };

    // 赋值地区（县）函数
    var distStart=function(){
      var prov_id=prov_obj.get(0).selectedIndex;
      var city_id=city_obj.get(0).selectedIndex;
      if(!settings.required){
        prov_id--;
        city_id--;
      };
      dist_obj.empty().attr("disabled",true);

      if(prov_id<0||city_id<0||typeof(city_json.citylist[prov_id].c[city_id].a)=="undefined"){
        if(settings.nodata=="none"){
          dist_obj.css("display","none");
        }else if(settings.nodata=="hidden"){
          dist_obj.css("visibility","hidden");
        };
        return;
      };
      
      // 遍历赋值市级下拉列表
      var temp_html=select_prehtml;
      $.each(city_json.citylist[prov_id].c[city_id].a,function(i,dist){
        temp_html+="<option value='"+dist.s+"'>"+dist.s+"</option>";
      });
      dist_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
    };

    var init=function(){
      // 遍历赋值省份下拉列表
      var temp_html=select_prehtml;
      $.each(city_json.citylist,function(i,prov){
        temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
      });
      prov_obj.html(temp_html);

      // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
      setTimeout(function(){
        if(settings.prov!=null){
          prov_obj.val(settings.prov);
          cityStart();
          setTimeout(function(){
            if(settings.city!=null){
              city_obj.val(settings.city);
              distStart();
              setTimeout(function(){
                if(settings.dist!=null){
                  dist_obj.val(settings.dist);
                };
              },1);
            };
          },1);
        };
      },1);

      // 选择省份时发生事件
      prov_obj.bind("change",function(){
        cityStart();
      });

      // 选择市级时发生事件
      city_obj.bind("change",function(){
        distStart();
      });
    };

    // 设置省市json数据
    if(typeof(settings.url)=="string"){
      $.getJSON(settings.url,function(json){
        city_json=json;
        init();
      });
    }else{
      city_json=settings.url;
      init();
    };
  };
})(jQuery);

$(function () {
    var $checkQuset = $('#check-quset'),
        $inputRadio = $checkQuset.find('label input');

    var sentPayCodeIntervalId; // 二维码支付状态轮询间隔

    var chargeHistoryCache; // 充值记录缓存数据

    var $modelIds = $('#model-ids'),
        mac_model = $modelIds.data('mac'),
        plugin_model = $modelIds.data('plugin'),
        material_model = $modelIds.data('material');

    $inputRadio.on('change', function (e) {
      __commonToggleActive($(e.target).closest('label'));
    });
    var reg = {
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        url: /[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
    };
    // 请求地址
    var colUrl = '/member_favorite',
        deleteColUrl = '/del_favorite',

        downloadUrl = '/member_download',
        deleteDownloadUrl = '/del_member_download',

        footprintUrl = '/tools/footprint',
        deleteFootprintUrl = '/tools/footprint_del',

        rechargeUrl = '/tools/pay_account',
        comsumeUrl = '/pay_spend',
        couponUrl = '/coupon_info',

        msgUrl = '/member_notify',
        reportedUrl = '/error_report_list';
    // 防止重复请求
    var colSoftAjaxSent = false,
        colPluginAjaxSent = false,
        colPicAjaxSent = false,
        downSoftAjaxSent = false,
        downPluginAjaxSent = false,
        downPicAjaxSent = false,
        footprintSoftAjaxSent = false,
        footprintPluginAjaxSent = false,
        footprintPicAjaxSent = false,
        rechargeAjaxSent = false,
        comsumeAjaxSent = false,
        couponAjaxSent = false,
        msgAjaxSent = false,
        reportedAjaxSent = false;

    $(window).on('load hashchange', function () {
      var href = window.location.href,
          lastHashIndex = href.lastIndexOf('#');
      function hashChangeEvents() {
        var targetHref = href.substr(lastHashIndex + 1),
            targetView = targetHref.split('-'),
            perIndex = $('.' + targetView[1]).index();
        var $navItem = $('.nav-item');
        $navItem.each(function (i, e) {
          if ($(e).is('.' + targetView[1])) {
            $(e).addClass('active');
          } else {
            $(e).removeClass('active');
          }
        });
        __commonToggleActive($('.' + targetView[0]).eq(perIndex));
        switch(targetHref) {
            case 'wraitem-info':
                break;
            case 'wraitem-col':
                if(!colSoftAjaxSent) {
                    colSoftAjaxSent = true;
                    loadUserCDP(1, colUrl, mac_model)
                };
                break;
            case 'wraitem-down':
                if(!downSoftAjaxSent) {
                    downSoftAjaxSent = true;
                    loadUserCDP(1, downloadUrl, mac_model)
                };
                break;
            case 'wraitem-history':
                if(!footprintSoftAjaxSent) {
                    footprintSoftAjaxSent = true;
                    loadUserCDP(1, footprintUrl, mac_model)
                };
                break;
            case 'wraitem-recharge':
                if(!rechargeAjaxSent) {
                    rechargeAjaxSent = true;
                    loadChargeHistory();
                };
                break;
            case 'wraitem-consume':
                if(!comsumeAjaxSent) {
                    loadSpentHistory();
                    comsumeAjaxSent = true;
                }
                
                break;
            case 'wraitem-coupon':
                if (!couponAjaxSent) {
                    couponAjaxSent = true;
                    couponSelData.page = 1;
                    couponSelData.coupon_status = -1;
                    getCoupon(couponSelData)
                };
                break;
            case 'wraitem-msgs':
                if(!msgAjaxSent) {
                    msgAjaxSent = true;
                    loadMessage();
                    loadReportedData();
                };
                
                break;
            default:
                break;
        }
      };
      if (lastHashIndex <= 0 || lastHashIndex === href.length - 1) {
        window.location.href = '#wraitem-info';
        href = window.location.href;
        lastHashIndex = href.lastIndexOf('#');
      };
      hashChangeEvents();

      var $wraitem = $('.wraitem');
      $wraitem.each(function (index, el) {
        $(el).find('.item-type').not('.coupon-type').on('click', 'span', function (e) {
          var $target = $(e.target).closest('span'),
              index = $target.index(),
              $curItem = $($(el).find('.item-con .item').eq(index));
          if ($target.hasClass('active')) return;
          switch ($target.parent().parent().attr('class')) {
            case 'wraitem collection cm-content active':
                if(index == 1) {
                    if(!colPluginAjaxSent) {
                        loadUserCDP(1, colUrl, plugin_model)
                        colPluginAjaxSent = true;
                    }
                };
                if(index == 2) {
                    if(!colPicAjaxSent) {
                        loadUserCDP(1, colUrl, material_model)
                        colPicAjaxSent = true;
                    }
                }
                break;
            case 'wraitem donload-his cm-content active':
                if(index == 1) {
                    if(!downPluginAjaxSent) {
                        loadUserCDP(1, downloadUrl, plugin_model);
                        downPluginAjaxSent = true;
                    }
                };
                if(index == 2) {
                    if(!downPicAjaxSent) {
                        loadUserCDP(1, downloadUrl, material_model)
                        downPicAjaxSent = true;
                    }
                }
                break;
            case 'wraitem history cm-content active':
                if(index == 1) {
                    if(!footprintPluginAjaxSent) {
                        loadUserCDP(1, footprintUrl, plugin_model)
                        footprintPluginAjaxSent = true;
                    }
                };
                if(index == 2) {
                    if(!footprintPicAjaxSent) {
                        loadUserCDP(1, footprintUrl, material_model)
                        footprintPicAjaxSent = true;
                    }
                }
                break;
            default:
                break;
          }
          __commonToggleActive([$target, $curItem]);
          // if ($curItem.is('.pic') && $curItem.find('li').length > 0) {
          //   $curItem.flexImages({ 'rowHeight': 200, 'container': '.img-item', 'truncate': true });
          // }
        });
      });
    });

    $('#info-save-btn').click(function(e) {
        e.preventDefault();
        var self = this;
        if($(this).hasClass('grey')) {
            return;
        }
        var nickname = $('#nickname-hook').val().trim(),
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


    // // 验证邮箱按钮
    // $('#confirm-email-btn').click(function(e) {
    //     var email = $(this).siblings('input').val();
    //     if(!email || !reg.email.test(email)) {
    //         alert('邮箱不存在或邮箱地址不符合规范，请重新输入！');
    //         return;
    //     }
    //     $.ajax({
    //         url: '/email_checked',
    //         type: 'POST',
    //         data: {
    //             email: email
    //         },
    //         dataType: 'json',
    //         success: function(msg) {
    //             if(msg['code'] == 200) {
    //                 alert('已向指定邮箱发送验证码，请移步邮箱查看！');
    //             }
    //         }
    //     });
    // });
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
    $('.cm-content').each(function(i, ele) {
        $(ele).click(function(e) {
            var $target = $(e.target);
            if($target.hasClass('del-col')) {
                e.preventDefault();
                var $cmItem = $target.closest('li'),
                    id = $cmItem.attr('data-id'),
                    context = $cmItem.parent().attr('id');

                if(confirm('是否确认移除？')) {
                    deleteLikes(id, $cmItem, context);
                }
            }
        });
    });

    function deleteLikes(id, ele, context) {
        var deleteUrl, loadUrl, pagiHook, boxHook, type, isfoot = false;
        switch(context) {
            case 'col-soft':
                loadUrl = colUrl;
                deleteUrl = deleteColUrl;
                pagiHook=$('#col-soft-pagination');
                boxHook = $('#' + context);
                type = mac_model;
                break;
            case 'col-plugin':
                loadUrl = colUrl;
                deleteUrl = deleteColUrl;
                pagiHook=$('#col-plugin-pagination');
                boxHook = $('#' + context);
                type = plugin_model;
                break;
            case 'col-pic':
                loadUrl = colUrl;
                deleteUrl = deleteColUrl;
                pagiHook=$('#col-pic-pagination');
                boxHook = $('#' + context);
                break;

            case 'down-soft':
                loadUrl = downloadUrl;
                deleteUrl = deleteDownloadUrl;
                pagiHook = $('#down-soft-pagination');
                boxHook = $('#' + context);
                type = mac_model;
                break;
            case 'down-plugin':
                loadUrl = downloadUrl;
                deleteUrl = deleteDownloadUrl;
                pagiHook = $('#down-plugin-pagination');
                boxHook = $('#' + context);
                type = plugin_model;
                break;
            case 'down-pic':
                loadUrl = downloadUrl;
                deleteUrl = deleteDownloadUrl;
                pagiHook = $('#down-pic-pagination');
                boxHook = $('#' + context);
                type = material_model;
                break;

            case 'footer-soft':
                loadUrl = footprintUrl;
                deleteUrl = deleteFootprintUrl;
                pagiHook = $('#footer-soft-pagination');
                boxHook = $('#' + context);
                type = mac_model;
                isfoot = true;
                break;
             case 'footer-plugin':
                loadUrl = footprintUrl;
                deleteUrl = deleteFootprintUrl;
                pagiHook = $('#footer-plugin-pagination');
                boxHook = $('#' + context);
                type = plugin_model;
                isfoot = true;
                break;
            case 'footer-pic':
                loadUrl = footprintUrl;
                deleteUrl = deleteFootprintUrl;
                pagiHook = $('#footer-pic-pagination');
                boxHook = $('#' + context);
                type = material_model;
                isfoot = true;
                break;
        };

        var pageNum = pagiHook.find('.num.active').text() || 1,
            len = boxHook.children().length;
        pageNum = len > 0 ? pageNum : pageNum - 1;
        var newdata = {};
        if(isfoot) {
            newdata.key = id;
            newdata.model_id = type;
        }else {
            newdata.id = id;
        };
        $.ajax({
            url: deleteUrl,
            type: 'POST',
            data: newdata,
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200) {
                    alert('删除成功');
                    pagiHook.length > 0 ? loadUserCDP(pageNum, loadUrl, type) : $(ele).remove();
                    return true;
                } else {
                    alert('删除失败，请重试。');
                }
            }
        });
    };
    // 收藏下载足迹数据展示与处理
    function loadUserCDP(pageNum, url, type ) {
        var boxHook, pagiHook;

        if(type == mac_model) {
            url == colUrl ? (boxHook = $('#col-soft')) && (pagiHook = $('#col-soft-pagination')) : (url == downloadUrl ? ((boxHook = $('#down-soft')) && (pagiHook = $('#down-soft-pagination'))) : (boxHook = $('#footer-soft')) && (pagiHook = $('#footer-soft-pagination')));
        }else if (type == plugin_model ) {
            url == colUrl ? (boxHook = $('#col-plugin')) && (pagiHook = $('#col-plugin-pagination')) : (url == downloadUrl ? ((boxHook = $('#down-plugin')) && (pagiHook = $('#down-plugin-pagination'))) : (boxHook = $('#footer-plugin')) && (pagiHook = $('#footer-plugin-pagination')));
        } else {
            url == colUrl ? (boxHook = $('#col-pic')) && (pagiHook = $('#col-pic-pagination')) : (url == downloadUrl ? ((boxHook = $('#down-pic')) && (pagiHook = $('#down-pic-pagination'))) : (boxHook = $('#footer-pic')) && (pagiHook = $('#footer-pic-pagination')));
        };

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                page: pageNum,
                model_id: type
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200 && typeof msg['data'] === 'object') {
                    var data = msg.data.data,
                        total = msg.data.total,
                        pagiTotal = Math.ceil( total / 10 ),
                        curMsgLength = pagiHook.children().length;
                        
                    data.length > 0 ? showHtml(data, boxHook, type) : boxHook.siblings('.no-data-show').show();

                    total >= 10 && ((pageNum % 10 == 0) || (pagiTotal != curMsgLength)) && createPagi(pagiTotal, pageNum, pagiHook);

                    total < 10 && pagiHook.remove();

                    pagiHook.attr('data-total', pagiTotal);
                } else {
                    boxHook.empty();
                    boxHook.siblings('.no-data-show').show();
                }
            },
            error: function(msg) {
                alert('服务器错误，请重试！');
            }
        });
    };

    var softTemplate = '<li data-id="{{ id }}"><a href="{{ url }}"><span class="del-col">X</span><span class="time">{{ time }}</span><div class="img"><img src="{{ imgSrc }}" alt=""></div><p class="title common_fff">{{ title }}</p><p class="vesrion common_999">{{ version }}</p><p class="down">立即下载</p></a></li>',
        picTemplate = '<li class="img-item" data-h="{{ height }}" data-w="{{ width }}" data-id="{{ id }}"><a href="{{ url }}"><img src="{{ imgSrc }}" alt=""><div class="mask"><span class="del-col">删除</span><p class="common_ovh">{{ title }}</p></div></a></li>';
    
    function showHtml(data, hook, type) {
        var html = '';
        $.each(data, function(i, ele) {
            if(typeof ele === 'object') {
                if(type == mac_model || type == plugin_model) {
                    var _msgTemp = softTemplate
                        .replace('{{ imgSrc }}', ele.thumb)
                        .replace('{{ title }}', ele.title)
                        .replace('{{ version }}', ele.version)
                        .replace('{{ time }}', formatDate(ele['add_time'] * 1000, 'Y-m-d'))
                        .replace('{{ url }}', ele.url);
                    if(hook.is('#footer-soft')) {
                        _msgTemp = _msgTemp
                            .replace('{{ id }}', ele.key);
                    } else {
                        _msgTemp = _msgTemp
                            .replace('{{ id }}', ele.id);
                    }
                    html += _msgTemp;
                }else {
                    var _msgTemp = picTemplate
                        .replace('{{ imgSrc }}', ele.thumb)
                        .replace('{{ height }}', ele.height == 0? 800: ele.height)
                        .replace('{{ width }}', ele.width == 0? 800: ele.width)
                        .replace('{{ title }}', ele.title)
                        .replace('{{ url }}', ele.url);
                    if(hook.is('#footer-pic')) {
                        _msgTemp = _msgTemp
                            .replace('{{ id }}', ele.key);
                    } else {
                        _msgTemp = _msgTemp
                            .replace('{{ id }}', ele.id);
                    }
                    html += _msgTemp;
                }
            }

            hook.empty().append(html);
            if(type == material_model) {
                hook.flexImages({ 'rowHeight': 200, 'container': '.img-item', 'truncate': true });
            }
        });
    }

    $('#records-filters').click(function(event) {
        filterChargeHistory();
    });
    // 加载充值记录
    function loadChargeHistory() {
        $.ajax({
            url: rechargeUrl,
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

    var rechargeHtml = '<tr><td>{{ content }}</td><td>{{ time }}</td><td>{{ type }}</td><td>{{ money }}元</td><td>{{ points }}</td></tr>'
    function showChargeHistory(data, pageNum) {
        var pageNum = pageNum || 1;
        if(data.length) {
            var html = '';
            $.each(data, function(i, ele) {
                if(i >= (pageNum - 1) * 10 && i < pageNum * 10) {
                    var content = ele.type == 1 ? '购买积分' : '升级VIP',
                        type = ele.pay_id == 1 ? '微信' : ele.pay_id == 2 ? '支付宝' : '其它充值',
                        points = ele.contact_name;
                    var _recordsTemplate = rechargeHtml;
                    _recordsTemplate = _recordsTemplate
                        .replace('{{ content }}', content)
                        .replace('{{ time }}', formatDate(ele['add_time'] * 1000, 'Y-m-d'))
                        .replace('{{ type }}', type)
                        .replace('{{ money }}', ele['money'])
                        .replace('{{ points }}', points);
                    html += _recordsTemplate;
                }
            });
            $('#records-table-hook').empty().append(html);

            if(data.length > 10) {
                var totalPage = Math.ceil(data.length / 10);
                createPagi(totalPage, pageNum, $('#recharge-pagination'));
            } else {
                $('#recharge-pagination').empty();
            }
        } else {
            var noDataTd = '<tr class="no-data-show-tb"><td colspan="5">没有数据</td></tr>';
            $('#records-table-hook').empty().append(noDataTd);
        }
    };
    // 充值记录翻页
    $('#recharge-pagination').click(function(e) {
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
    function filterChargeHistory() {
        var $selects = $('#records-filters').find('select');
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
                ele['pay_id'] == val && tempData.push(ele);
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
    };

    // 消费记录搜索功能
    $('#consume-filters').find('select').add($('#c-content-filter')).on('keyup change', function(e) {
        $('#search-consume').removeClass('grey');
    });

    $('#search-consume').click(function(){

        var timeVal = $('#c-time-filter').val(),
            typeVal = $('#c-type-filter').val(),
            userInput = $('#c-content-filter').val();

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

    // 消费历史纪录
    function loadSpentHistory(pageNum, data) {
        var pageNum = pageNum || 1;
        var data = $.extend({
                page: pageNum
            }, data);
        $.ajax({
            url: comsumeUrl,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(msg) {
                if(msg.code == 200) {
                    if(msg.message) {
                        $('#consume-table-hook').empty().append('<tr><td colspan="6">' + msg.message + '</td></tr>');
                        $('#spent-pagination').empty();
                        return;
                    }
                    var data = msg.data;
                    typeof data == 'object' && showSpentHistory(data.info);
                    if(data.total > 10) {
                        var totalPage = Math.ceil(data.total / 10);
                        $('#spent-pagination').attr('data-total', totalPage);
                        createPagi(totalPage, pageNum, $('#spent-pagination'));
                    }else {
                        $('#spent-pagination').empty();
                    }
                } else {

                }
            }
        })
    };
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
        $('#consume-table-hook').empty().append(html);
    };
    // 优惠券
    var couponSelData = new Object;
    $('#check-coupon-type').on('click', 'span', function(event) {
        event.preventDefault();
        var status = $(this).data('id');
        __commonToggleActive($(this));
        couponSelData.page = 1;
        couponSelData.coupon_status = status;

        getCoupon(couponSelData)
    });

    var couponHtml = '<li class="{{ is_cover }}"><div class="fl"><div class="con"><p>满{{ min_price }}元可用</p><p class="time">{{ start_time }}-{{ end_time }}</p></div></div><div class="num"><span>￥<em>{{ price }}</em></span><div class="sign use">可使用</div><div class="sign unuse">已过期</div></div></li>';
    
    function showCoupon (data) {
        var html="";
        $.each(data, function(index, el) {
            html += couponHtml
                .replace('{{ is_cover }}', el.status == 0?'':'active')
                .replace('{{ price }}', el.coupon_point)
                .replace('{{ min_price }}', el.min_consume)
                .replace('{{ start_time }}', el.add_time)
                .replace('{{ end_time }}', el.end_time)
        });
        return html
    };
    function getCoupon(data) {
        $.ajax({
            url: couponUrl,
            type: 'POST',
            data: data,
            success: function (res) {
                if(res.code == 200) {
                    $('#coupon-wra').empty().append(showCoupon(res.coupon_info));
                    if(res.total > 12) {
                        var totalPage = Math.ceil(res.total / 12);
                        $('#coupon-pagination').attr('data-total', totalPage);
                        createPagi(totalPage, data.page, $('#coupon-pagination'));
                    }else {
                        $('#coupon-pagination').empty();
                    }
                }
            },
            error: function() {
                return;
            }
        })
    };

    /**
     * ajax获取站内信息内容，默认每页获取10条数据
     * @type {number} 站内信息页码数
     */
    function loadMessage(pageNum) {
        var pageNum = pageNum || 1;
        $.ajax({
            url: msgUrl,
            type: 'POST',
            data: {
                page: pageNum
            },
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == 200 && typeof msg['data'] === 'object') {
                    var data = msg.data.info,
                        total = msg.data.total,
                        pagiTotal = Math.ceil(total/10),
                        curMsgLength = $('#msgs-pagination').children().length;
                    data.length > 0 && showMessage(data);
                    total >= 10 && ((pageNum % 10 == 0) || (pagiTotal != curMsgLength)) && createPagi(pagiTotal, pageNum, $('#msgs-pagination'));
                    total < 10 && $('#msgs-pagination').remove();
                    $('#msgs-pagination').length > 0 && $('#msgs-pagination').attr('data-total', pagiTotal);
                } else {
                    $('#msg-hook').empty();
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
    var messageTemplate = '<tr><td><i></i>{{ content }}</td><td>{{ time }}</td></tr>';
    function showMessage(data) {
        var html = '';
        $.each(data, function(i, ele) {
            if(typeof ele === 'object') {
                var _msgTemp = messageTemplate
                    .replace('{{ content }}', ele.content)
                    .replace('{{ time }}', formatDate (ele['send_time'] * 1000));
                html += _msgTemp;
            }
            $('#msg-hook').empty().append(html);
        });
    };

    // 加载已提交问题列表
    function loadReportedData(pageNum) {
        var pageNum = pageNum || 1;
        $.ajax({
            url: reportedUrl,
            type: 'POST',
            data: {
                page: pageNum
            },
            dataType: 'json',
            success: function(msg) {
                if(msg.code == 200) {
                    var data = msg.data;
                    if(data && typeof data == 'object') {
                        showReportedList(data.info);
                        var totalPage = Math.ceil(data.total / 10);
                        totalPage > 1 && createPagi(totalPage, pageNum, $('#reported-pagination')) && $('#reported-pagination').attr('data-total', totalPage);
                    }
                }
            }
        });
    }

    var reportedTemplate = '<tr><td><a href="{{ url }}">{{ url }}</a></td><td>{{ type }}</td><td>{{ content }}</td><td>{{ time }}</td></tr>';
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

        $('#reported-table').empty().append(html);
    };

    // 问题提交
    var reportedFlag = false;
    $('#report-btn').click(function(e) {
        console.log(1)
        e.preventDefault();
        if(reportedFlag) {
            alert('已提交报告，请勿重复提交');
            return;
        }
        var $radios = $('input', '#check-quset'),
            $url = $('input', '#report-url-hook'),
            $textarea = $('textarea', '#report-cont-hook'),
            $alertText = $('.alert-text'),
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
                        $(ele).prop('checked', false).parent('label').removeClass('active');
                    });
                    $url.val('');
                    $textarea.val('');
                } else {
                    $alertText.text(msg.msg).show();
                }
            }
        });
    });

    function createPagi(totalPage, pageNum, hook) {
        if(totalPage == 1) {
            $(hook).empty();
            return;
        }

        var prevTemplate = '<a href="javascript:;" class="prev" target="_self">上一页</a>',
            nextTemplate = '<a href="javascript:;" class="next" target="_self">下一页</a>';

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
            case '#col-soft-pagination':
                url = colUrl;
                loadUserCDP(num, url, mac_model);
                break;
            case '#col-plugin-pagination':
                url = colUrl;
                loadUserCDP(num, url, plugin_model);
                break;
            case '#col-pic-pagination':
                url = colUrl;
                loadUserCDP(num, url, material_model);
                break;

            case '#down-soft-pagination':
                url = downloadUrl;
                loadUserCDP(num, url, mac_model);
                break;
            case '#down-plugin-pagination':
                url = downloadUrl;
                loadUserCDP(num, url, plugin_model);
                break;   
            case '#down-pic-pagination':
                url = downloadUrl;
                loadUserCDP(num, url, material_model);
                break;

            case '#footer-soft-pagination':
                url = footprintUrl;
                loadUserCDP(num, url, mac_model);
                break;
            case '#footer-plugin-pagination':
                url = footprintUrl;
                loadUserCDP(num, url, plugin_model);
                break;
            case '#footer-pic-pagination':
                url = footprintUrl;
                loadUserCDP(num, url, material_model);
                break;

            case '#coupon-pagination':
                couponSelData.page = num;
                getCoupon(couponSelData)
                break;
            case '#msgs-pagination':
                loadMessage(num)
                break;
            case '#reported-pagination':
                loadReportedData(num)
                break;         
            default:
                break;
        }

        __commonToggleActive($target);
    };

    // 续费
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
        $('.discounts').addClass('active');
    });
    $close.click(function(event) {
        $renewWra.fadeOut();
        clearInterval(sentPayCodeIntervalId);
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
                $('#ewm').attr('src', '/assets/images/loadcode.gif');
            },
            success: function(res) {
                if(res.code == 200) {
                    $('#ewm').attr('src', res.data);
                }
            },
            error: function (error) {
                return;
            }
        })
    };
    // 绑定手机
    var $bindTel = $('#bind-tel'),
        $tel_athu = $('.tel-athu'),
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
    $bindTel.click(function(event) {
        $tel_athu.fadeIn();
        getCodeImg($auth_code);
    });
    $tel_athu.find('.close-tel').click(function(event) {
        $tel_athu.fadeOut();
    });
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
        $tel_athu.fadeIn();
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
    // 获取图形验证码
    function getCodeImg(el) {
        $.ajax({
            url: '/tools/comment_code_img',
            type: 'GET',
            success: function(res) {
                el.attr('src', res.code_img_source);
            },
            error: function(error) {
                return error;                                                           
            }
        })
    }
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
    };

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
});