$(function(){
    var $tab = $('.tab', '#tabs'),
        $tabView = $('.tab-view'),
        tabsNavArray = [];
    __commonToggleActive([
        $('#t-filters span').eq(0),
        $('#t-filters').next('.view').children('.toggled-view').eq(0), 
    ])
    $.each($('#m-list').children('ul'),function(index, el) {
        __commonToggleActive($(el).children('li').eq(0))
    });


    // tab栏宽度平分
    var $_tab = $('#tabs span.tab'), 
        tab_len = $_tab.length;
        $_width = $('.main').width()/tab_len - 1;
    $_tab.width($_width)
    $tab.each(function(index, element){
        var $this = $(this),
            id = $this.attr('data-nav');
        tabsNavArray.push($(id)); // 缓存视图
        // 文章导航栏点击切换视图
        $this.click(function(){
            $.each(tabsNavArray, function(i, ele){
                i < index ? ele.hide() : ele.show();
            });
            __commonToggleActive($this);
            index === 0 ? $('#side-nav').show() : $('#side-nav').hide();
        });
    });

    var $relatedTopicFilters = $('#t-filters').children();
    $relatedTopicFilters.each(function(i, ele){
        var $this = $(this);
        $this.click(function(){
            var _index = $this.index(),
                $toggledView = $this.parent().siblings('.view').find('.toggled-view').eq(_index);
            __commonToggleActive([$this, $toggledView]);
        });
    });

    var $infoList = $('#m-list');
    $infoList.find('li').each(function(i, ele){
        $(this).on('mouseover', function(){
            __commonToggleActive($(this));
        });
    });

    var imgdefereds=[];
    $('#content img').each(function(){
        var dfd=$.Deferred();
        $(this).bind('load',function(){
            dfd.resolve();
        }).bind('error',function(){
     //图片加载错误，加入错误处理
     // dfd.resolve();
    })
    if(this.complete) setTimeout(function(){
        dfd.resolve();
    },1000);
        imgdefereds.push(dfd);
    })
    var $aside = $('#aside'),
        $asideLastChild = $('#aside').children().eq(-1),
        $contentNav = $('#content-nav'),
        $goTop = $('#go-top-nav'),
        $tabs = $('#tabs');
    var $contentH3 = $('#content .intro').length > 0? $('#content .intro'): $('#content h3'),
        $imgs = $('#content img'),
        heightArr = [];
    console.log($contentH3)
    var winHeight = $(window).height(),
        base = getBase(400),
        tabsBase = getTopsBase(400);

    $.when.apply(null,imgdefereds).done(function(){
        
        if ($contentH3.length > 0) {
            $contentH3.each(function(i, ele) {
                var _text = $(this).text();
                var _h3Top = $(this).offset().top;
                var $span = $('<span>').text(_text);
                $contentNav.append($span);
                heightArr.push(_h3Top);
            });
        }

        if ($imgs.length > 0) {
            $imgs.each(function(i, ele) {
                var $this = $(this);
                $this.on('load', function(){
                    heightArr = heightArr.map(function(height) {
                        return height += $this.height();
                    });
                });
            });
        }

        $(window).on('load scroll', function(){
            var winTop = $(window).scrollTop();
            winTop > tabsBase ? $goTop.show() : $goTop.hide();
            if (winTop > base && $contentH3.length > 0) {
                $contentNav.show();
                var $contentChild = $contentNav.children();
                var curIndex;
                if (winTop < heightArr[0]) {
                    $contentChild.removeClass('active');
                    return;
                };
                for (var i = 0; i < heightArr.length; i++) {
                    var height_1 = heightArr[i],
                        height_2 = heightArr[i+1];
                    if (!height_2 || (height_1 <= winTop && height_2 > winTop)) {
                        curIndex = i;
                        break;
                    }
                }
                __commonToggleActive($contentChild.eq(curIndex));
            } else {
                $contentNav.hide();
            }
        });

        $contentNav.click(function(e) {
            var $target = $(e.target),
                _index = $target.index();
            $('body, html').animate({scrollTop: heightArr[_index]}, 300);
        });

        $goTop.click(function(e){
            var $target = $(e.target).closest('span');

            if($target.is('.top')) {
                $('body, html').animate({scrollTop: 0}, 300);
            } else if($target.is('.download')) {
                var downloadTop = $('#addrs').position().top;
                $('body, html').animate({scrollTop: downloadTop}, 300);
            }
        });
        $('#dl-btn').click(function(event) {
            var downloadTop = $('#addrs').position().top;
            $('body, html').animate({scrollTop: downloadTop}, 300);
        });
    });



    // 分享
    var str = '<div id="weixin_share" style="position:fixed;z-index:10000000001;"><div id="weixin_modal" style="background-clip: padding-box;background-color: #FFFFFF;border: 1px solid rgba(0, 0, 0, 0.3);  border-radius: 6px 6px 6px 6px;  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3); left: 50%; margin: -200px 0 0 -200px;overflow: hidden; position: fixed; top: 50%; width:260px;height:320px; overflow:hidden;"><div class="modal_header" id="modal_header" style="border-bottom: 1px solid #EEEEEE; padding: 9px 15px;"><a style="text-decoration:none;  margin-top: 2px; color: #000000; float: right;font-size:20px;  font-weight: bold; cursor:pointer;line-height: 20px; opacity: 0.2; text-shadow: 0 1px 0 #FFFFFF;" class="weixin_close" id="weixin_close" target="_self" onclick="close_wxshare()">×</a><h3 id="weixin_h3" style="line-height: 30px; margin: 0; font-weight:normal;font-family:微软雅黑">分享到微信朋友圈</h3></div><div class="modal_body" id="code1" style="text-align:center;height:200px;"></div><div class="footer" id="modal_footer" style="border-radius: 0 0 6px 6px; border-top: 1px solid #DDDDDD; box-shadow: 0 1px 0 #FFFFFF inset; height:100%;padding:0 10px;padding-top:11px;text-align: right; font-size:12px;"><div id="weixin_tip" style="text-align:left;margin:0; padding:0;font-size:12px;">打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。</div></div></div></div>',
        dongdong_description = $('#share-app').data("descript"),
        qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location.href)+'&title='+encodeURI(document.title)+'&summary='+encodeURI(dongdong_description),
        tsina =  'http://service.weibo.com/share/share.php?url='+encodeURIComponent(document.location.href)+'&title='+encodeURI(document.title)+' '+encodeURI(dongdong_description),
        renren =  'http://widget.renren.com/dialog/share?resourceUrl='+encodeURIComponent(document.location.href)+'&title='+encodeURI(document.title)+'&description='+encodeURI(dongdong_description),            
        url = window.location.href;
      
    $('#share-app').on('click',function(e){
        var target = e.target;
        switch(target.className) {
            case 'bds_qzone':
                window.open(qzone,"_blank", 'height=500, width=600, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
                break;
            case 'bds_tsina' :  
                window.open(tsina,"_blank", 'height=500, width=600, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'); 
                break;
            case 'bds_renren':
                window.open(renren,"_blank", 'height=500, width=600, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
                break;
            case 'bds_weixin':
                if ($('#weixin_share').length){
                    $('#weixin_share').fadeIn(200);
                } else {
                    $('body').append(str);
                    $("#code1").qrcode({
                        width: 198, //宽度
                        height: 198, //高度
                        text: url
                    });
                } 
                break;
            default:
                break;
        }
    })
    close_wxshare=function(){
        $('#weixin_share').fadeOut(200);
    }

    // 点赞点踩
    var model_id = $('.soft-grade').data('model'),
        res_id = $('.soft-grade').data('res'),
        submitting = 0,
        goodNum = $('.icon-thumb-up.ups').data('num')/1,
        badNum = $('.icon-thumb-up.downs').data('num')/1,
        $_like = $('.icon-thumb-up.ups'),
        $_dislike = $('.icon-thumb-up.downs'),
        $_grade = $('.soft-grade');

    // 点赞
    $_like.on('click', function() {
        zan(goodNum+1, badNum, 1)
    })
    // 点踩
    $_dislike.on('click', function() {
        zan(goodNum, badNum+1, 0)
    })

    function zan(goodNum, badNum ,like) {
        if($_grade.data('void') != '0') {
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
                    $_grade.data('voted', '1').unbind();
                    //处理页面百分比样式
                    var g = Math.ceil(goodNum/(goodNum + badNum)*100),
                        b = 100 - g;
                    $_grade.find('.ups-bar').css('width', g).next('.ups-text').text(goodNum +'('+ g + '%)')
                    $_grade.find('.downs-bar').css('width', b).next('.downs-text').text(badNum +'('+ b + '%)')
                }else{
                    alert('您已评价过')
                }
            }
        })  
    }

    function getBase(num) {
        var lastChildTop = $asideLastChild.position().top,
            lastChildHeight = $asideLastChild.outerHeight() + 30,
            contentNavHeight = $contentNav.length > 0 ? $contentNav.outerHeight() : 0;

        return (lastChildHeight + lastChildTop + contentNavHeight + num - winHeight);
    }

    function getTopsBase(num) {
        var tabsTop = $tabs.position().top,
            tabsHeight = $tabs.outerHeight(),
            goTopHeight = $goTop.outerHeight();

        return (tabsHeight + tabsTop + goTopHeight + num - winHeight);
    }

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
        $('.ipt-radio').on('change',function() {
            var $radio = $('input:radio[name="info"]:checked').val();
            if($radio == '其他' || $radio == '版权投诉') {
                $('.textarea').fadeIn(400);
                $('label').not('.textarea').animate({left: -100},400);
            }else {
                $('.textarea').fadeOut(400);
                $('label').not('.textarea').animate({left: 0},400);
            }
        })
        
        $('.ipt').on('click',function(event){
            event.preventDefault();
            var content = $(".text-ipt").val(),
                model_id = $('.soft-grade').data('model'),
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
    
    var title = keywords.split(','),
        down_link;
    down_link = 'http://dl.qpzqxz.com/download/'+ title[0].replace(/[ ]/g, '') +'_59@'+ soft_id +'.exe';
    $('.down-sect1').append('<a href="'+ down_link +'"><img src="/assets/images/img-down2.gif"></a>');
    $('.down-sect2').append('<a href="'+ down_link +'"><img src="/assets/images/img-down1.gif"></a>');
    $('#btn-down-one').attr('href', down_link);
     // 下载地址动态生成
    if (download_addr[1].length == 0) {
        $('#down-wrapper').text('暂无资源！').css({'color': 'green', 'margin': '20px 10px'})
    } else {
        var downStr = '<p class="title common_ovh">{ title }</p>'
                        +'<p>高速下载器通道</p>'
                        +'<ul>'
                            +'<li>'
                                +'<a href="'+ down_link +'"><i class="icon-download"></i><span>电信高速下载</span></a>'
                            +'</li>'
                            +'<li>'
                                +'<a href="'+ down_link +'"><i class="icon-download"></i><span>网通高速下载</span></a>'
                            +'</li>'
                            +'<li>'
                                +'<a href="'+ down_link +'"><i class="icon-download"></i><span>迅雷高速下载</span></a>'
                            +'</li>'
                            +'<li>'
                                +'<a href="'+ down_link +'"><i class="icon-download"></i><span>快车高速下载</span></a>'
                            +'</li>'
                        +'</ul>'
                        +'<p>其他下载地址</p>'
                        +'<ul>'
                            +'{ address }'
                        +'</ul>';

        function subHtml (el, address) {
            var html = downStr
                .replace('{ title }', el.down_title)
                .replace('{ address }', address)
            return html
        }

        function add_addr(i) {
            $.each(download_addr[i], function(index, el) {
                var address = '';
                if(el.site_id.site_url == '##') {
                    var title = el.site_id.site_title.split('##');
                    $.each(title, function(i, value) {
                        address += '<li><a href="'+ el.down_url +'"><i class="icon-download"></i><span>'+ value +'</span></a></li>'
                    });
                } else {
                    $.each(el.site_id.site_url, function(i, e) {
                        address += '<li><a href="'+ e + el.down_url +'"><i class="icon-download"></i><span>'+ el.site_id.site_title[i] +'</span></a></li>'
                    });
                }
                $('#down-wrapper').append(subHtml(el, address))
            });
        }
        add_addr(1)
    }
    var tzidcGIF_url = 'http://www.tzidc.com/tz/promotion/20170519/baizhaoServer.jsp',
        tuidc_url = 'http://www.tuidc.com/',
        ku86_url = 'http://www.ku86.com/';
    $('#other-link').append('<a target="_blank" href="'+ tuidc_url +'"><img src="/assets/images/tuidc.png"></a><a target="_blank" href="'+ ku86_url +'"><img src="/assets/images/ku86.gif"></a>');
    $('.down-sect2').append('<a target="_blank" href='+ tzidcGIF_url +'><img src="/assets/images/tzidc.gif"></a>');

    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.m-info .dl-btns .dl-btn:last-child').css('backgroundColor', '#0cad12');
        $('.g-like .lists li:nth-child(9n)').css('marginRight', '0');
        $('.aside .lists li:last-child').css('marginBottom', '0');
    }


});