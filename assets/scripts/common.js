$(function(){

    searchAssociation('#autocomplete-p');
    searchAssociation('#autocomplete-a');
    searchAssociation('#autocomplete-m');
    function searchAssociation (el) {
        $(el).autocomplete({
            paramName: 'k',
            transformResult: function(response) {
                return {
                    suggestions: $.map(JSON.parse(response), function(dataItem) {
                        return { value: dataItem.value.replace(new RegExp("<em>","gm"), '').replace(new RegExp("</em>","gm"), ''), data: dataItem.data };
                    })
                }
            },
            params: {'m': $(el).attr('data-type')},
            type: 'POST',
            serviceUrl: $(el).attr('data-url'),
            
            onSelect: function (val) {
                window.open(val.data);    
            }
        });
    };

    var $search = $('#icon-search'),
        $searchBox = $('.search-box'),
        $goTop = $('#go-top-roct, #back-to-top');
        $goTopMac = $('#go-top');
    // 顶部导航栏搜索按钮点击效果
    $search.click(function(e){
        e.stopPropagation();
        $(this).parent().toggleClass('triggered');
        $searchBox.find('.ipt').eq(0).focus();
    });
    $searchBox.click(function(e) {
       e.stopPropagation();
    });
    $(document).on('scroll click',function() {
        $search.parent().removeClass('triggered');
        if($(this).scrollTop() > 400) {
            $goTop.add($goTopMac).fadeIn();
        }else {
            $goTop.add($goTopMac).fadeOut();
        }
    })
    $goTop.on('click',function(e) {
        e.stopPropagation();
        $('html,body').animate({scrollTop:0},700);
        return false; 
    }).hover(function() {
        __commonToggleActive($(this).find('img').eq(1))
    },function() {
        __commonToggleActive($(this).find('img').eq(0))
    });
    //百度主动推送
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
});
// mac登陆框功能
$(function(){
    var $logBox = $('#logBox'),
        $loginMask = $('#login-mask'),
        $inputRadio = $('#inputRadio');
    var rememberMe = false;
    var loginHtml = '<div class="center-box" id="centerBox"><div class="login-wra" id="login-wra"><div class="login-reg" id="login-reg"><span class="login active">登录</span><span class="reg">注册</span></div><form id="login-form" class="login-form"><fieldset><input type="text" id="username" placeholder="账号/手机号"><p class="error-text">用户名不合法，请重新输入</p></fieldset><fieldset><input type="text" placeholder="验证码" class="code-ipt" maxlength="4" data-session-name="captcha-string" id="login_code_ipt"><img src="" alt="" class="code-img" id="login_img_code"><p class="error-text">验证码格式不正确</p></fieldset><fieldset><input type="password" id="password" placeholder="密码"><p class="error-text">密码不合法，请重新输入</p></fieldset><div class="rem-for"><input type="radio" id="inputRadio"><span>30天自动登录</span><span class="fr forgit-pw" id="forgit-pw">忘记密码？</span></div><button class="login-btn">登录</button><p class="error-text">对不起，用户名或密码错误。请重试。</p></form><div class="tp-login" id="tp-login"><p><span class="txt">一键登录</span></p><span class="qq-icon icon-qq-log"></span><span class="wechat-icon icon-wechat-log"></span></div><div class="tp-reg" id="tp-reg"><p><span class="txt">一键注册</span></p><div class="qq-reg"><span class="qq-icon icon-qq-log"></span><p>QQ注册</p></div><div class="wechat-reg"><span class="wechat-icon icon-wechat-log"></span><p>微信注册</p></div><div class="tel-reg"><span class="mobile-icon icon-mobile" id="tel-reg"></span><p>手机注册</p></div><p class="tip-tel">手机首次注册送积分！</p></div><div class="reg-form" id="reg-bolie"><fieldset><input type="text" placeholder="手机号" id="reg_tel_num" maxlength="11"></fieldset><fieldset><input type="text" placeholder="验证码" class="code-ipt" maxlength="4" data-session-name="captcha-string"><img src="" alt="" class="code-img" id="reg_img_code"></fieldset><fieldset><input type="text" placeholder="短信验证码" maxlength="6" id="reg_note"><button class="send-code" id="send_reg_code">发送验证码</button></fieldset><fieldset><input type="password" placeholder="密码" maxlength="20" minlength="6" id="reg_pw"></fieldset><fieldset><input type="password" placeholder="重复密码" maxlength="20" minlength="6" id="reg_spw"></fieldset><p class="reg_tip"></p><button class="reg-tel-in">注册</button></div></div><div class="bcakPassWord" id="backPW"><p class="back-title">找回密码</p><div class="backPW-step-f"><fieldset><p class="">手机号</p><input type="text" id="pw_tel" maxlength="11"></fieldset><fieldset><p>验证码</p><input type="text" class="code-ipt" maxlength="4" data-session-name="captcha-string"><img src="" class="code-img" id="forgit_pw_img_code" alt=""></fieldset><fieldset><p>短信验证码</p><input type="text" maxlength="6" class="note"><button class="send-code" id="send_code_pw">发送验证码</button></fieldset><p class="back-pw-tip"></p><button class="step-btn" id="step-next">下一步</button></div><div class="backPW-step-t"><fieldset><p>输入密码</p><input type="password" id="f_pw"></fieldset><fieldset><p>确认密码</p><input type="password" id="s_pw"></fieldset><p class="sure-pw-tip"></p><button class="step-btn" id="surePW">确认更改</button></div></div><div class="success-tip" id="succ-tips"><div class="t-round"><i class="icon-marked"></i></div><p class="text-tip">密码修改成功！</p><p class="back-login" id="back-login"><i class="icon-download2"></i>返回登录界面</p></div><div class="close-btn icon-closeBtn" id="closeBtn"></div></div>';
    $loginMask.empty();
    $loginMask.append(loginHtml);
    if($logBox.length > 0) {
        $logBox.click(function(e){
            var $target = $(e.target);
            switch($target.attr('id')) {
                case 'login-btn':
                    toggleLoginReg('login');
                    break;
                case 'reg-btn':
                    toggleLoginReg('reg');
                    break;
                default:
                    break;
            }
        });

        $loginMask.click(function(e){
            $(this).hide()
        });

        $('#centerBox').click(function(e){
            e.stopPropagation();
        });

        $('#login-reg').click(function(e){
            var $target = $(e.target);
            if($target.is('.login')) {
                toggleLoginReg('login');
            } else if ($target.is('.reg')) {
                toggleLoginReg('reg');
            }
        });

        $('#closeBtn').click(function(){
            $loginMask.hide();
        });

        $inputRadio.click(function(){
            rememberMe = !rememberMe;
            $(this).prop('checked', rememberMe);
        });

        $('.login-btn', '#login-form').click(function(e){
            e.preventDefault();
            var $inputs = $(this).parents('#login-form').find('input'),
                username = $inputs.eq(0).val(),
                password = $inputs.eq(2).val(),
                remembered = $inputs.eq(3).prop('checked') ? 1 : 0,
                $errorTexts = $(this).parents('#login-form').find('.error-text');

            if(username.length < 2 || username.length > 16) {
                $errorTexts.eq(0).show();
                return;
            } else {
                $errorTexts.eq(0).hide();
            }
            if(password.length < 6 || password.length > 16) {
                $errorTexts.eq(2).show();
                return;
            } else {
                $errorTexts.eq(2).hide();
            }
            var sessionName = $('#login_code_ipt').attr('data-session-name');
            var data = new Object;
            data[sessionName] = $('#login_code_ipt').val();
            data.username = username;
            data.password = password;
            data.remember = remembered;
            if($('#login_code_ipt').val() == '' || $('#login_code_ipt').val().length != 4) {
                $errorTexts.eq(1).show();
                return;
            }
            $.ajax({
                url: '/login_go',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(msg) {
                    if(msg['member_info']) {
                        var infoObj = msg['member_info'];

                        // userLogIn(infoObj);
                        window.location.reload();
                    } else {
                        $errorTexts.eq(3).show().text(msg.msg);
                    }
                }
            });
        });
        $('#login_img_code').click(function() {
            getCodeImg($(this));
        });
        $('#tp-login').add('#tp-reg').click(function(e){
            var $target = $(e.target);

            if ($target.is('.qq-icon')) {
                thirdPartyLogin('/qqcode');
            } else if ($target.is('.wechat-icon')) {
                thirdPartyLogin('/wxcode');
            }
        });
        var $forgit_pw = $('#forgit-pw'),
            $step_next = $('#step-next'),
            $surePW = $('#surePW'),
            $back_login = $('#back-login'),
            $telReg = $('#tel-reg'),
            $send_code_pw = $('#send_code_pw'),
            $forgit_pw_img_code = $('#forgit_pw_img_code'),
            $tips = $('.back-pw-tip'),
            iscodeIsSending = false,
            time_phone,
            curPhoneNum;
        // 忘记密码
        $forgit_pw.click(function() {
            toggleLoginReg('forgitPwF');
            getCodeImg($forgit_pw_img_code);
        });
        $forgit_pw_img_code.click(function() {
            getCodeImg($(this));
        });
        $send_code_pw.click(function() {
            var img_code = $('.backPW-step-f .code-ipt').val();
            curPhoneNum = $('#pw_tel').val();
            if(iscodeIsSending) return;

            var sessionName = $('.backPW-step-f .code-ipt').attr('data-session-name');
            if(!tel_format(curPhoneNum) || curPhoneNum == '') {
                $tips.text('手机号格式错误').show().removeClass('green');
                return;
            }
            if(img_code == '' || img_code.length != 4) {
                $tips.text('图形验证码格式错误').show().removeClass('green');
                return;
            }
            var data = new Object;
            data[sessionName] = img_code;
            data.phone = curPhoneNum;
            $.ajax({
                url: '/password_retrieval',
                data: data,
                type: 'POST',
                success: function(res) {
                    if(res.code == 200) {
                        $tips.text(res.msg).show().addClass('green');
                        iscodeIsSending = true;
                        time_phone = res.time_phone;
                        timerInter($send_code_pw);
                        getCodeImg($forgit_pw_img_code);
                    }else {
                        getCodeImg($forgit_pw_img_code);
                        $tips.text(res.msg).show().removeClass('green');
                    }
                }
            })

        });

        $step_next.click(function () {
            var note_val = $('.backPW-step-f .note').val(),
                re = /^[0-9]+.?[0-9]*$/;
            if(note_val == '') {
                 $tips.text('请获取验证码').show().removeClass('green');
                 return;
            } 
            if(!re.test(note_val) || note_val.length != 6) {
                $tips.text('请输入正确的验证码格式').show().removeClass('green');
                return;
            }
             $.ajax({
                url: '/password_code',
                type: 'POST',
                data: {
                    verification_code: note_val,
                    time_phone: time_phone
                },
                success: function(res) {
                    if(res.code == 200) {
                        $('#pw_tel').val('');
                        $('.backPW-step-f .code-ipt').val('');
                        $('.backPW-step-f .note').val('');
                        toggleLoginReg('forgitPwS');
                    }else {
                        $tips.text(res.msg).show().removeClass('green');
                    }
                }
            }) 
        })

        // 确认更改
        $surePW.click(function () {
            var $tip = $('.backPW-step-t .sure-pw-tip'),
                pwVal = $('#f_pw').val(),
                spwVal = $('#s_pw').val();
            if(pwVal == '') {
                $tip.text('密码不能为空').show().removeClass('green');
                return;
            }
            if(pwVal.length < 6 || pwVal.length > 20 ) {
                $tip.text('密码长度为6-20个').show().removeClass('green');
                return;
            }
            if(pwVal !== spwVal) {
                $tip.text('两次输入密码不一致，请重新输入').show().removeClass('green');
                return;
            }
            $.ajax({
                url: '/edit_password',
                type: 'POST',
                data: {
                    phone: curPhoneNum,
                    password: spwVal
                },
                success: function(res) {
                    if(res.code == 200) {
                        toggleLoginReg('sucTip')
                    }else {
                        $tip.text(res.msg).show().removeClass('green');
                    }
                }
            })

        })
        // 返回登录
        $back_login.click(function() {
            toggleLoginReg('login')
        })
        // 手机注册
        var $reg_bolie = $('#reg-bolie'),
            $reg_img_code = $('#reg_img_code'),
            $reg_tel_num = $('#reg_tel_num'),
            $reg_img_code_ipt = $reg_bolie.find('.code-ipt'),
            $send_reg_code = $('#send_reg_code'),
            $reg_note = $('#reg_note'),
            $reg_pw = $('#reg_pw'),
            $reg_spw = $('#reg_spw');
            $reg_tel_in = $('.reg-tel-in');

        $telReg.click(function() {
            toggleLoginReg('telReg')
            getCodeImg($reg_img_code);
        });
        $reg_img_code.click(function() {
            getCodeImg($(this));
        });
        
        // 注册发送验证码
        $send_reg_code.click(function() {
            var img_code = $reg_img_code_ipt.val();
                curPhoneNum = $reg_tel_num.val(),
                $tips = $('.reg_tip');
            if(iscodeIsSending) return;

            var sessionName = $reg_img_code_ipt.attr('data-session-name');
            if(!tel_format(curPhoneNum) || curPhoneNum == '') {
                $tips.text('手机号格式错误').show();
                return;
            }
            if(img_code == '' || img_code.length != 4) {
                $tips.text('图形验证码格式错误').show();
                return;
            }

            var data = new Object;
            data[sessionName] = img_code;
            data.phone = curPhoneNum;
            $.ajax({
                url: '/phone_register',
                data: data,
                type: 'POST',
                success: function(res) {
                    if(res.code == 200) {
                        $tips.text(res.msg).show().addClass('green');
                        iscodeIsSending = true;
                        time_phone = res.time_phone;
                        timerInter($send_reg_code);
                        getCodeImg($reg_img_code);
                    }else {
                        getCodeImg($reg_img_code);
                        $tips.text(res.msg).show().removeClass('green');
                    }
                }
            })
        });
        // 注册
        $reg_tel_in.click(function() {
            var reg_pw = $reg_pw.val(),
                reg_spw = $reg_spw.val(),
                reg_note_val = $reg_note.val(),
                $tips = $('.reg_tip'),
                re = /^[0-9]+.?[0-9]*$/;
            if(reg_note_val == '') {
                 $tips.text('请获取验证码').show().removeClass('green');
                 return;
            } 
            if(!re.test(reg_note_val) || reg_note_val.length != 6) {
                $tips.text('请输入正确的验证码格式').show().removeClass('green');
                return;
            }
            if(reg_pw == '') {
                $tips.text('密码不能为空').show().removeClass('green');
                return;
            }
            if(reg_pw.length < 6 || reg_pw.length > 20 ) {
                $tips.text('密码长度为6-20个').show().removeClass('green');
                return;
            }
            if(reg_pw !== reg_spw) {
                $tips.text('两次输入密码不一致，请重新输入').show().removeClass('green');
                return;
            }
            $.ajax({
                url: '/register',
                type: 'POST',
                data: {
                    verification_code: reg_note_val,
                    time_phone: time_phone,
                    phone: curPhoneNum,
                    password: reg_spw
                },
                success: function(res) {
                    if(res.code == 200) {
                        $tips.text(res.msg).show().addClass('green');
                        window.location.reload();
                    }else {
                        $tips.text(res.msg).show().removeClass('green');
                        return;
                    }
                }
            })
        });

        // 按钮倒计时
        function timerInter (el) {
            var timer,
                num = 60;
            timer = setInterval(function() {
                el.text('重新发送('+ num-- +')').addClass('forbid');
                if(!iscodeIsSending) {
                    clearInterval(timer);
                    el.text('发送验证码').removeClass('forbid');
                }
                if (num < 0) {
                    clearInterval(timer);
                    el.text('重新发送').removeClass('forbid');
                    iscodeIsSending = false;
                } 
            },1000)
        };


        $(window).on('load', function() {

            // 提示绑定手机弹框
            var _bindTelTipHtml = `
                <div class="p-mask">
                <div class="prompt-box-tel" id="prompt_box">
                    <span class="cancel-tip" id="prompt_cancel">X</span>
                    <p class="desc">账号绑定手机号码让账号更安全</p>
                    <p class="award">首次绑定手机号码可获得30积分<span class="p-tip">积分可用于下载软件</span></p>
                    <a href="/mac/pm/#/uc-tel">立即绑定</a>                    
                </div>
                </div>
            `;
            var isTipsDown = 0;
            if(window.sessionStorage.hasTip) {
                isTipsDown = window.sessionStorage.hasTip;
            };
            
            var $_download_btn = $('#down-name'),
                isVipCon = false,
                isLoginCon = false,
                vipLoginCon = false;
            $.ajax({
                url: '/user_management_top',
                type: 'POST',
                success: function(data) {
                    if(data.code == 200) {
                        typeof data.data == 'object' && userLogIn(data.data);
                        window.userLoggedIn = true;
                        window.publicIsSign = data.data.is_sign;
                        $('#no-login').hide();
                        $('#logged-in').show();
                        $('#userCenterBar').show();
                        $('#double11').css('bottom', '510px');
                        if (data.data.vip === 1) {
                            $('#sidebar_QQ').addClass('qq-orange');
                        }
                        if(data.data.is_mobile_checked == 0 && isTipsDown == 0) {
                            $('body').append(_bindTelTipHtml);
                            $('.p-mask').show();
                            $('#prompt_cancel').on('click', function() {
                                $('.p-mask').hide();
                            })
                            window.sessionStorage.hasTip = 1;
                        }
                        if(data.data.msg_count > 0) {
                            var infos = '<a href="/mac/pm/#/uc-msgs" class="new-info-num" target="_self">'+ data.data.msg_count +'</a>';
                            $('#logged-in').append(infos);
                            var music = document.getElementById("myaudio"); 
                            if(isTipsDown == 0) {
                                music.play();
                                window.sessionStorage.hasTip = 1;
                            }
                        } 
                    } else {
                        $('#userCenterBar').hide();
                        $('#double11').css('bottom', '440px');
                        isLoginCon = false;
                        $('.mac-repeat').hide();
                    }
                    if(data == '') {
                        isLoginCon = false;
                        $('.mac-repeat').hide();
                    }else {
                        isLoginCon = true;
                        if(data.data.vip) {
                            isVip = true;
                        } else {
                            isVip = false;
                        }
                    }
                    vipLogin = isLoginCon?isVip?true:false:false;
                    if(vipLogin) {
                        $_download_btn.text('会员下载')
                    }else {
                        $_download_btn.text('立即下载')
                    }
                },
                error: function(data) {
                }
            });
        });
        $('#sign-price').on('click', function() {
            if(!window.userLoggedIn) {
                $('#login-btn').click();
                return;
            }
            if(window.publicIsSign == 0) {
                $('#mask-sign').find('.sign-suc').css('paddingLeft', '164px');
                $('#mask-sign').find('.sign-suc').html('签到成功<em>（获得一次免费抽奖机会）</em>')
            }
            $('#mask-sign').fadeIn();
        });
        
        
        var loggedOut = false;        

        $('#logged-in').click(function(e){
            var $target = $(e.target).closest('#logOutBtn');
            if ( $target.is('#logOutBtn')) {
                if (loggedOut) return;
                loggedOut = true;
                $.ajax({
                    url: '/login_out',
                    type: 'GET',
                    success: function(msg) {
                        if(msg['code'] == 200) {
                            $('#logged-in').hide();
                            $('#no-login').show();
                            window.location.reload();
                            window.sessionStorage.hasTip = 0;
                        } else {
                            loggedOut = false;
                            alert('登出失败，请重试');
                        }
                    },
                    error: function() {
                        loggedOut = false;
                        alert('登出失败，请重试');
                    }
                })
            }
            if($(e.target).closest('a').is('#sign-nav')) {

                if(publicIsSign == 0) {
                    $('#mask-sign').find('.sign-suc').css('paddingLeft', '164px');
                    $('#mask-sign').find('.sign-suc').html('签到成功<em>（获得一次免费抽奖机会）</em>')
                }
                $('#mask-sign').fadeIn();
            }
        });
       
        // 抽奖
        var lottery={
            index:0,    //当前转动到哪个位置，起点位置
            count:0,    //总共有多少个位置
            timer:0,    //setTimeout的ID，用clearTimeout清除
            speed:20,    //初始转动速度
            times:0,    //转动次数
            cycle:50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,    //中奖位置
            newIndex: 0,
            init:function(id){
                if ($("#"+id).find(".lottery-unit").length>0) {
                    var $lottery = $("#"+id),
                        $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    $lottery.find(".lottery-unit-"+this.index).addClass("active");
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-"+index).removeClass("active");
                index += 1;
                if (index>count-1) {
                    index = 0;
                };
                $(lottery).find(".lottery-unit-"+index).addClass("active");
                this.index=index;
                return false;
            },
            stop:function(index){
                this.prize=index;
                return false;
            }
        };

        function roll(index_id){
            if(typeof(index_id) == 'number') {
                lottery.newIndex = index_id;
            }
            lottery.times += 1;
            lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
            if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
                clearTimeout(lottery.timer);
                
                var text = $('.lottery-unit-'+ lottery.prize).find('p').text();
                if(text.indexOf('积分')>0) {
                    __commonToggleActive($('#prize-box').find('.point-p'));
                    $('#prize-box').find('.point-p').text(text);
                }
                if(text.indexOf('优惠券')>0) {
                    __commonToggleActive($('#prize-box').find('.coupon-p'));
                    $('#prize-box').find('.coupon-p').text(text);
                }
                if(text == '谢谢参与'){
                    __commonToggleActive($('#prize-box').find('.thanks'));
                }
                $('#prize-box').fadeIn();
                lottery.prize=-1;
                lottery.times=0;
                clicking = false;

                
            }else{
                if (lottery.times<lottery.cycle) {
                    lottery.speed -= 10;
                }else if(lottery.times==lottery.cycle) {
                    var index;
                    if(lottery.newIndex == 0) {
                        index = 7
                    }else {
                        lottery.obj.find('.lottery-unit').each(function(item,obj) {
                            if(lottery.newIndex == $(obj).attr('data-id')) {
                                index = $(obj).attr('data-index');
                            }
                        })  
                    }
                    lottery.prize = index;
                }else{
                    if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                        lottery.speed += 110;
                    }else{
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed<40) {
                    lottery.speed=40;
                };
                lottery.timer = setTimeout(roll,lottery.speed);//循环调用
            }
            return false;
        }
    }

    /**
     * 登陆后显示已登陆状态
     * @param dataObj 数据对象
     */
    var clicking=false;
    var tempStr = '<img src="{{ src }}" class="avatar-img-hook"><span class="vip-tag{{ vipStatus }}">VIP</span><span class="points">{{ points }}积分</span><i class="hover-arrow"></i><div class="hover-show"><p class="nickname common_ovh">{{ nickname }}</p><div class="pm-center"><a href="/mac/pm/#/uc-overall" class="pm-item"><i class="icon icon-user"></i><em>用户后台</em></a><a href="/mac/pm/#/cm-likes" class="pm-item"><i class="icon icon-likes"></i><em>我的收藏</em></a><a href="/Mac/vip" class="pm-item"><i class="icon icon-VIP"></i><em>成为VIP</em></a><a href="/mac/pm/#/cm-footprint" class="pm-item"><i class="icon icon-edit"></i><em>我的足迹</em></a><a href="javascript:;" class="pm-item" id="sign-nav"><i class="icon icon-qiandao"></i><em>签到抽奖</em></a><a href="javascript:;" class="pm-item" id="logOutBtn"><i class="icon icon-logout"></i><em>退出</em></a></div></div>';
    // 抽奖html
    var sign_prize_html = '<div class="luck-draw" id="lottery"><span class="close">X</span><p class="sign-suc">今日已签到</p><p class="sign-tips"><i class="icon-star"></i><span>每日签到可获得一次免费抽奖机会</span>            <i class="icon-star"></i></p><p class="tip">再次抽奖所需10点积分</p><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="lottery-unit lottery-unit-0" data-id="{{ prize_info[0].id }}" data-index="0"><div class="item"><img src="{{ prize_info[0].src }}" alt=""><p class="title">{{ prize_info[0].title }}</p></div></td><td class="lottery-unit lottery-unit-1" data-id="{{ prize_info[1].id }}" data-index="1"><div class="item"><img src="{{ prize_info[1].src }}" alt=""><p class="title">{{ prize_info[1].title }}</p></div></td><td class="lottery-unit lottery-unit-2" data-id="{{ prize_info[2].id }}" data-index="2"><div class="item"><img src="{{ prize_info[2].src }}" alt=""><p class="title">{{ prize_info[2].title }}</p></div></td></tr><tr><td class="lottery-unit lottery-unit-7"><div class="item"><p class="tanks">谢谢参与</p></div></td><td class="lottery-btn"><div class="go">立即抽奖<span>GO</span><em>* 10积分/次</em></div>    </td><td class="lottery-unit lottery-unit-3" data-id="{{ prize_info[6].id }}" data-index="3"><div class="item"><img src="{{ prize_info[6].src }}" alt=""><p class="title">{{ prize_info[6].title }}</p></div></td></tr><tr><td class="lottery-unit lottery-unit-6" data-id="{{ prize_info[3].id }}" data-index="6"><div class="item"><img src="{{ prize_info[3].src }}" alt=""><p class="title">{{ prize_info[3].title }}</p></div></td><td class="lottery-unit lottery-unit-5" data-id="{{ prize_info[4].id }}" data-index="5"><div class="item"><img src="{{ prize_info[4].src }}" alt=""><p class="title">{{ prize_info[4].title }}</p></div></td><td class="lottery-unit lottery-unit-4" data-id="{{ prize_info[5].id }}" data-index="4"><div class="item"><img src="{{ prize_info[5].src }}" alt=""><p class="title">{{ prize_info[5].title }}</p></div></td></tr></tbody></table><div id="prize-box" class="prize-box"><div class="close-prize">X</div><div class="prize-wra"><div class="prize coupon-p active">10元优惠券</div><div class="prize point-p">10点积分</div><div class="prize thanks">哎呀没中，换个姿势再来一次！</div><div class="prize empty"></div></div>         <a href="javascript:;" class="cont-btn">继续抽奖</a><a href="/mac/pm/#/vip-spent" class="link-list">查看抽奖记录</a></div></div>';
    function userLogIn(dataObj) {
        if($logBox.length > 0) {
            var imgSrc = dataObj['headimg'] || '/assets/images/avatarImg-1.jpg',
                points = dataObj['point'] || 0,
                message = dataObj['msg_count'] || dataObj['message'] || 0,
                vipStatus = dataObj.vip == 1 ? ' vip' : '',
                nickname = dataObj.nickname,
                __tempStr;
            var prize_info_data = dataObj.prize_info,
                _pointImg = '/assets/images/luck-point.png',
                _couponImg = '/assets/images/luck-coupon.png',
                _prizeHtml; 

            points > 0 ?
                __tempStr = tempStr
                    .replace('{{ src }}', imgSrc)
                    .replace('{{ nickname }}', nickname)
                    .replace('{{ points }}', points)
                    .replace('{{ message }}', message)
                    .replace('{{ vipStatus }}', vipStatus)
                :
                __tempStr = tempStr
                    .replace('{{ src }}', imgSrc)
                    .replace('{{ nickname }}', nickname)
                    .replace('{{ vipStatus }}', vipStatus)
                    .replace('<span class="points">{{ points }}积分</span>', '');
                _prizeHtml = sign_prize_html
                    .replace('{{ prize_info[0].id }}', prize_info_data[0].id)
                    .replace('{{ prize_info[0].src }}', prize_info_data[0].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[0].title }}', prize_info_data[0].title)
                    .replace('{{ prize_info[1].id }}', prize_info_data[1].id)
                    .replace('{{ prize_info[1].src }}', prize_info_data[1].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[1].title }}', prize_info_data[1].title)
                    .replace('{{ prize_info[2].id }}', prize_info_data[2].id)
                    .replace('{{ prize_info[2].src }}', prize_info_data[2].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[2].title }}', prize_info_data[2].title)
                    .replace('{{ prize_info[3].id }}', prize_info_data[3].id)
                    .replace('{{ prize_info[3].src }}', prize_info_data[3].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[3].title }}', prize_info_data[3].title)
                    .replace('{{ prize_info[4].id }}', prize_info_data[4].id)
                    .replace('{{ prize_info[4].src }}', prize_info_data[4].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[4].title }}', prize_info_data[4].title)
                    .replace('{{ prize_info[5].id }}', prize_info_data[5].id)
                    .replace('{{ prize_info[5].src }}', prize_info_data[5].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[5].title }}', prize_info_data[5].title)
                    .replace('{{ prize_info[6].id }}', prize_info_data[6].id)
                    .replace('{{ prize_info[6].src }}', prize_info_data[6].type == 1?_pointImg: _couponImg)
                    .replace('{{ prize_info[6].title }}', prize_info_data[6].title)

            $('#mask-sign').append(_prizeHtml);
            $('#mask-sign').find('.lottery-unit-0').addClass('active');

            lottery.init('lottery');
            $("#lottery .lottery-btn").on('click',function(){
                if (clicking) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    return false;
                }else{
                    $.ajax({
                        url: '/sign_prize',
                        type: 'POST',
                        success: function(res) {
                            if(res.code == 200) {
                                lottery.speed=100;
                                roll(res.id);    //转圈过程不响应click事件，会将click置为false
                                clicking = true;
                                $('#sign-btn').text('已签到');
                                return false;
                            }else {
                                $('#prize-box').find('.empty').text(res.msg);
                                __commonToggleActive($('#prize-box').find('.empty'));
                                $('#prize-box').fadeIn();
                            }
                        }
                    });
                }
            });
            $('#lottery .close').on('click', function() {
                $('#mask-sign').fadeOut(400);
            })
            $('.close-prize').on('click', function() {
                $('#prize-box').fadeOut();
            })
            $('.cont-btn').on('click', function() {
                $("#lottery .lottery-btn").click();
                $('#prize-box').fadeOut();
            })
            $('#logged-in').empty().append(__tempStr);
        }
    }

    var newWindow;
    function thirdPartyLogin(url) {
        if(newWindow) {
            newWindow.close();
        }
        var iWidth = 750,
            iHeight = 500,
            winWidth = $(window).width(),
            winHeight = $(window).height(),
            iTop = (winHeight - iHeight) / 2,
            iLeft = (winWidth - iWidth) / 2;
        newWindow = window.open(url, '第三方安全登录', 'width=' + iWidth + ', height=' + iHeight + ', top=' + iTop + ', left=' + iLeft);
        setInterval(function() {
            var _cookie = document.cookie.match(/(qq_refersh_time=1)|(wx_refersh_time=1)/gi);
            if(_cookie) {
                newWindow.close();
                $('#login-mask').hide();
                deleteCookie('qq_refersh_time');
                deleteCookie('wx_refersh_time');
                window.location.reload();
            }
        }, 2000);
    }

    function deleteCookie(cName) {
        document.cookie = cName + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/';
        document.cookie = cName + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/mac';
    }

    function toggleLoginReg(str) {
        $loginMask.show();
        var $loginWra = $('#login-wra'),
            $loginForm = $('#login-form'),
            $tpLogin = $('#tp-login'),
            $tpReg = $('#tp-reg'),
            $loginReg = $('#login-reg'),
            $loginBtn = $('#login-reg .login'),
            $regBtn = $('#login-reg .reg');

        var $backPW = $('#backPW'),
            $backStepF = $backPW.find('.backPW-step-f'),
            $backStepS = $backPW.find('.backPW-step-t'),
            $successTipW = $('#succ-tips');
        var $regMobile = $('#reg-bolie');
        switch (str) {
            case 'login':
                $loginWra.show();
                $backPW.removeClass('active');
                $successTipW.removeClass('active');
                $regMobile.removeClass('active');
                __commonToggleActive($loginBtn);
                $loginForm.show();
                $tpLogin.show();
                $tpReg.hide();
                getCodeImg($('#login_img_code'));
                break;
            case 'reg':
                $loginWra.show();
                $backPW.removeClass('active');
                $successTipW.removeClass('active');
                $regMobile.removeClass('active');
                __commonToggleActive($regBtn);
                $loginForm.hide();
                $tpLogin.hide();
                $tpReg.show();
                break;
            case 'forgitPwF':
                __commonToggleActive($backPW);
                $loginWra.hide();
                $backStepF.show();
                $backStepS.hide();
                break;
            case 'forgitPwS':
                __commonToggleActive($backPW);
                $loginWra.hide();
                $backStepF.hide();
                $backStepS.show();
                break;
            case 'sucTip':
                __commonToggleActive($successTipW);
                $backPW.removeClass('active');
                break;
            case 'telReg':
                __commonToggleActive([$regMobile,$regBtn]);
                $loginForm.hide();
                $tpLogin.hide();
                $tpReg.hide();
                $backPW.removeClass('active');
                break;
            default:
                throw new Error('toggleMaskShow函数只接受两种字符串为参数，“login”或“reg”');
                break;
        }
    }
    $(window).on('load', function() {
        $('#history').find('.history-wrapper ul').empty();
        findHistroy();
    })
    $('#history').find('.clear-histroy').on('click', function() {
        window.localStorage.removeItem("history_");
        $(this).removeClass('active');
        $('#history').find('.history-wrapper ul').empty();
        $('#history').find('ul').append('<li>暂无记录，赶快去浏览吧！</li>')
    })

    if(navigator.userAgent.indexOf("MSIE 8.0")>0 && !window.innerWidth) {
        $('.common_andr-header .sub-nav .hot-item li:last-child').css('marginRight', '0');

        var $starItems = $('.common_star-item');
        $starItems.each(function(i, ele) {
            var $this = $(this);
            $this.css({
                fontSize: '18px'
            });
            var num = $this[0].className.match(/star([0-5])/)[1],
                html = '';
            for(var j = 1; j <= num; j++) {
                var span = '<i class="icon-star" style="color:' + '#FFA938"' + '></i>';
                html += span;
            }

            for(var j = 5; j > num; j--) {
                var span = '<i class="icon-star" style="color:' + '#ddd"' + '></i>';
                html += span;
            }

            $this.append(html).removeClass('common_star-item');
        });
    }
});
/**
 * 全局切换或滑动标签的函数。一般使用active作为当前激活标签的类名，如果已使用其它类名，请将类名作为二参传入
 * @param element 要切换的目标标签
 * @param active  可选参数；激活（当前）标签的样式类名，默认为‘active’，如果另有定义，则需传入自定义的类名
 */
function __commonToggleActive(element, active) {
    var active = active || 'active';
    if(typeof element === 'object') {
        $(element).each(function(index, ele) {
            $(ele).addClass(active).siblings().removeClass(active);
        })
    } else {
        $(element).addClass(active).siblings().removeClass(active);
    }
};

/**
 * 公用滑动门功能的实现
 * @param el  滑动门对象
 * @param distance  滑动的距离
 */
function __commonMoveSlider(el, distance) {
    if(document.createElement('div').style.perspective !== 'undefined') {  //处理浏览器兼容性，不支持translate3d则使用left定位
        $(el).css({
            transform: 'translate3d(' + distance + 'px, 0, 0)'
        });
    } else {
        $(el).css({
            left: distance + 'px'
        });
    }
}

function __commonHtmlParse(str) {
    if(typeof str != 'string') {
        return str;
    }

    var reg = /[<>]/gi;
    return str.replace(reg, function(match) {
        switch(match) {
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            default:
                break;
        }
    });
}

function __commonStat(data) { 
    if (data == '') {
        return
    };
    var hm = document.createElement("script"); 
    hm.src = "https://hm.baidu.com/hm.js?" + data; 
    var s = document.getElementsByTagName("script")[1]; 
    s.parentNode.insertBefore(hm, s); 
};

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a5037ca326328325ebb5d262d614b259";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

var alertTimeoutId;
function alert(str) {
    if ($('#alertMask').length > 0) {
        $('#alertMask').find('p').text(str);
        $('#alertMask').show();
        if (alertTimeoutId) clearTimeout(alertTimeoutId);
        alertTimeoutId = setTimeout(function() {
            $('#alertMask').hide();
        }, 2000);
    } else {
        var $alertMask = $('<div id="alertMask">');
        $alertMask.css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,.4)',
            textAlign: 'center',
            zIndex: '99999'
        });
        $alertMask.click(function(e){
            if (e.target === e.currentTarget) $(this).hide();
        });

        var $alertBox = $('<div id="alertBox">');
        $alertBox.css({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
            width: '440px',
            height: '136px',
            margin: 'auto',
            borderRadius: '10px'
    });

        var $h = $('<h4>提示框</h4>');
        $h.css({
            fontSize: '16px',
            lineHeight: '50px',
            paddingLeft: '20px',
            textAlign: 'left'
        });

        var $p = $('<p>').text(str);
        $p.css({
            textAlign: 'left',
            fontSize: '14px',
            paddingLeft: '20px'
        });

        var $button = $('<span>确定</span>');
        $button.css({
            display: 'inline-block',
            width: '80px',
            height: '30px',
            lineHeight: '30px',
            fontSize: '14px',
            border: '1px solid #0972c1',
            borderRadius: '5px',
            textAlign: 'center',
            marginTop: '20px',
            cursor: 'pointer'
        });
        $button.on('click', function() {
            $('#alertMask').hide();
        });

        $alertBox.append($h,$p, $button).appendTo($alertMask);
        $('body').append($alertMask);
        if (alertTimeoutId) clearTimeout(alertTimeoutId);
        alertTimeoutId = setTimeout(function() {
            $('#alertMask').hide();
        }, 2000);
    }
}

// 历史记录
function addHistory() {
    var array = new Array();
    var res =  window.localStorage.getItem('history_');
    var hisJson = {"href": location.href, "title": $(document).attr("title")};
    if ( res ) {
        var index = -1;
        array = jQuery.parseJSON(res);
        $.each(array, function(k ,v) {
            if (v.title == $(document).attr("title")) {
                index = jQuery.inArray(v, array);
            }
        });
        if (index > -1) {
            array.splice(index,1);// 删除与当前重复的记录
        }

    }
    array.push(hisJson);
    if (array.length > 6) {
        array.splice(0,array.length - 6);
    }
    var d = JSON.stringify(array); 
    window.localStorage.setItem("history_", d);
}
/**
 * 获取storage中的值
 * @param {Object} name
 */

function findHistroy() {
    var res = window.localStorage.getItem('history_');
    if ( res ) {
        $('#history').find('.clear-histroy').addClass('active');
        var hisJson = JSON.parse(res).reverse();
        $.each(hisJson, function(k, v) {
            var html = '<li class="his-item"><a href="'+ v.href +'">'+ v.title +'</a></li>';
            $('#history').find('.history-wrapper ul').append(html);
        });
    }else {
        $('#history').find('.clear-histroy').removeClass('active');
        $('#history').find('ul').append('<li>暂无记录，赶快去浏览吧！</li>')
    }
}

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
// 手机格式验证
function tel_format (tel) {
    var ret = /^1[34578]\d{9}$/;
    if(ret.test(tel)){
        return true;
    }else{
        return false;
    }
}
jQuery(function(){ setInterval(function(){ jQuery('.js-animated-circles').toggleClass('animated'); },2000); jQuery('#lc-girl-block-en_2').on({'mouseover':function(){ jQuery(this).find('.js-livechat-hint').removeClass('hide_hint').addClass('show_hint'); }, 'mouseleave':function(){ jQuery(this).find('.js-livechat-hint').removeClass('show_hint').addClass('hide_hint'); } }) }); 