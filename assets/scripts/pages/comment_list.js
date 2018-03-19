$(function(){
    'use strict';

    var dom = {
        $postComment: $('#post-comment'),
        $textComments: $('#text-comments'),
        $wrapperStar: $('#wrapper-star'),
        $dataModelHook: $('#data-model-hook')
    };

    var defaultData = {
        nickname: '未来软件园网友',
        score: 5
    };

    var $commentItem = $('.comment-item');
    var replyBoxTemplate = '<div class="reply-box" data-id="{{ id }}">{{ moreReplyBoxPlaceHolder }}<p class="head-line common_ovh"><span class="comment-author">{{ nickname }}</span><span class="comment-address"> [{{ ip_address }}网友] </span>发表评论说：<span class="comment-time">{{ add_time }}</span></p><p class="comment-text">{{ content }}</p><p class="comment-box-actions comment-actions"><span class="upvote">顶（{{ like }}）</span><span class="downvote">踩（{{ unlike }}）</span><span class="post-reply">回复</span></p></div>';
    $commentItem.each(function(i, el) {
        var $replyBox = $(this).find('.replyBoxPlaceHolder');

        if($replyBox.length > 0) {
            var replies = JSON.parse($replyBox.attr('data-replies')),
                len = replies.length;
            var __replyBox;
            $.each(replies, function(index, element) {
                if(index === 0) {
                    __replyBox = replyBoxTemplate
                        .replace('{{ id }}', element['id'])
                        .replace('{{ nickname }}', element['nickname'])
                        .replace('{{ ip_address }}', element['ip_address'])
                        .replace('{{ add_time }}', function() {
                            return formatDate(element['add_time'] * 1000);
                        })
                        .replace('{{ content }}', element['content'])
                        .replace('{{ like }}', element['like'])
                        .replace('{{ unlike }}', element['unlike']);
                } else if (index > 0) {
                    __replyBox = __replyBox.replace('{{ moreReplyBoxPlaceHolder }}', function() {
                        return replyBoxTemplate
                            .replace('{{ id }}', element['id'])
                            .replace('{{ nickname }}', element['nickname'])
                            .replace('{{ ip_address }}', element['ip_address'])
                            .replace('{{ add_time }}', function() {
                                return formatDate(element['add_time'] * 1000);
                            })
                            .replace('{{ content }}', element['content'])
                            .replace('{{ like }}', element['like'])
                            .replace('{{ unlike }}', element['unlike']);
                    });
                }
            });

            __replyBox = __replyBox.replace('{{ moreReplyBoxPlaceHolder }}', '');

            $replyBox.html(__replyBox);

            $replyBox.attr('data-replies', '');
        }
    });

    // 评论区各处点击效果的事件代理绑定
    $('#post-comment').click(function(e){
        var $target = $(e.target);
        switch($target[0].className) {
            case 'post-btn':
            case 'post-btn disabled':
                sendComment(e.target);
                break;
            case 'icon-star star-item':
                rating($target);
                break;
            default:
                break;
        }

        function sendComment(el){
            var $ajaxCodeImg = $('#ajax_code-img');
            if($(el).hasClass('disabled')) {
                $('#msg').css('display', 'block');
                return;
            } else if($ajaxCodeImg.length > 0) {
                if($ajaxCodeImg.length > 0) {
                    if($ajaxCodeImg.parent()[0] != $target.parent()[0]) {
                        $ajaxCodeImg.appendTo($target.parent());
                        return;
                    }
                }
            }


            var $verifyCode = $('#verify-code'),
                verifyVal = $verifyCode.val();

            if($ajaxCodeImg.length === 0) {
                getCodeImg($target);
                return;
            } else if(verifyVal.length === 0) {
                alert('验证码不能为空');
                return;
            } else if (verifyVal.length != 4) {
                alert('请输入四位数验证码');
                return;
            }

            var comment = dom.$textComments.val(),
                scores = dom.$wrapperStar.attr('data-score') || defaultData.score,
                nickname = dom.$postComment.find('.nickname').val() || defaultData.nickname,
                model = dom.$dataModelHook.attr('data-model'),
                resId = dom.$dataModelHook.attr('data-res'),
                sessionName = $verifyCode.attr('data-session-name');

            // comment = htmlEscape(comment);
            // nickname = htmlEscape(nickname);

            var opts = {
                nickname: nickname,
                stars: scores,
                content: comment,
                model: model,
                "res_id": resId
            };
            opts[sessionName] = verifyVal;

            submitComment(opts);
            setTimeout(function() {
                getCodeImg($('#post-comment #ajax_code-img'));
            },300)
        }

        function rating(el) {
            var _score = $(el).index() + 1;
            $(el).siblings().css('color', '');
            $(el).parent('.wrapper-star').attr('data-score', _score);
            while($(el).prev().length) {
                $(el).prev().add($(el)).css('color', '#FFB527');
                el = $(el).prev();
            }
        }
    });

    // 评论区输入框改变内容时改变“发表评论”按钮的样式以及字数显示的数字
    $('textarea#text-comments').on('keyup change', function(){
        var len = $(this).val().length;
        if(len) {
            $('#post-btn').removeClass('disabled');
            $('#msg').css('display', '');
        } else {
            $('#post-btn').addClass('disabled');
        }
        $('#word-count').text(len);
    });
    $('#comment_wrapper').on('click', function(e){
        var $target = $(e.target);
        if($target.is('textarea')) {
            var $ajaxCodeImg = $target.parent().siblings('#ajax_code-img');
            if($ajaxCodeImg.length > 0) {
                return;
            }
            getCodeImg($target.parent());
        }
    });

    var _prefix = 'dongdong_article_';
    var commentLocal = JSON.parse(localStorage.getItem(_prefix + 'comment')) || {};

    $('#comment_wrapper').click(function(e) {
        var $target = $(e.target),
            dataId = $target.parent().parent().attr('data-id');

        if(!commentLocal[dataId]) {
            commentLocal[dataId] = {};
        }

        if($target.hasClass('post-reply')) {
            postReply(dataId, $(e.target).closest('.comment-actions'));
        } else if ($target.hasClass('upvote')) {
            if(!commentLocal[dataId].upvoted) {
                upvote(dataId, $(e.target));
            }
        } else if($target.hasClass('downvote')) {
            if(!commentLocal[dataId].downvoted) {
                downvote(dataId, $(e.target));
            }
        } else if($target.hasClass('reply-submit-btn')) {
            var $ajaxCodeImg = $('#ajax_code-img');

            if($ajaxCodeImg.length > 0) {
                if($ajaxCodeImg.parent()[0] != $target.parent()[0]) {
                    $ajaxCodeImg.appendTo($target.parent());
                    return;
                }
            }

            var replyText = $target.parent().find('textarea').val(),
                $verifyCode = $('#verify-code'),
                verifyVal = $verifyCode.val();

            if(replyText.length == 0) {
                alert('请填写回复');
                return false;
            } else if($ajaxCodeImg.length === 0) {
                getCodeImg($target);
                return;
            } else if (verifyVal.length === 0) {
                alert('验证码不能为空');
                return;
            } else if (verifyVal.length != 4) {
                alert('请输入四位数验证码');
                return;
            } 

            var nickname = $target.siblings('.reply-nickname').val() || defaultData.nickname,
                model = dom.$dataModelHook.attr('data-model'),
                resId = dom.$dataModelHook.attr('data-res'),
                parentId,
                sessionName = $verifyCode.attr('data-session-name');

            var $commentBox = $target.closest('.comment-actions');
            if(!$commentBox.hasClass('comment-box-actions')) {
                parentId = $commentBox.closest('.comment-item').attr('data-id');
            } else {
                parentId = $(e.target).closest('.reply-box').attr('data-id');
            }

            var opts = {
                nickname: nickname,
                // content: htmlEscape(replyText),
                content: replyText,
                model: model,
                "res_id": resId,
                "parent_id": parentId
            };
            opts[sessionName] = verifyVal;
            submitComment(opts);
            setTimeout(function() {
                getCodeImg($('#reply-div-wrapper #ajax_code-img'));
            },300)

        } else if ($target.is('#code_img') || $target.is('#reload-code-img')) {
            getCodeImg($target.parent());
        } else if($target.is('#reply-icon-emoji')) {
            $('#reply-emojis').toggle();
        } else if($target.is('#reply-emojis img')) {
            var title = $target.attr('title');
            var $textArea = $target.parents('#reply-emoji-wrapper').siblings('textarea'),
                startPos = $textArea[0].selectionStart,
                endPos = $textArea[0].selectionEnd,
                text = $textArea.val();

            $textArea.val(text.substr(0, startPos) + title + text.substr(endPos));
            $target.closest('#reply-emojis').hide();
            $textArea.focus();
            $textArea.trigger('change');
        }
    });

    $('#comment_wrapper').on('change keyup keydown', function(e) {
        var $target = $(e.target);
        if($target.is('.reply-textarea')) {
            var len = $target.val().length;
            $('#reply-word-count').text(len);

            if(len > 120) {
                $target.val($target.val().substr(0, 121));
            }
        }
    });

    $('#posted-comment').on('mouseover', function(e) {
        var $target = $(e.target).closest('.reply-box');
        if($target.length > 0) {
            e.stopPropagation();
            $target.children('.comment-box-actions').addClass('hover');
        }
    }).on('mouseout', function(e) {
        var $target = $(e.target).closest('.reply-box');
        if($target.length > 0) {
            e.stopPropagation();
            $target.children('.comment-box-actions').removeClass('hover');
        }
    });

    // 表情包
    $('#emoji-wrapper').click(function(e) {
        var $target = $(e.target);
        if($target.is('#icon-emoji')) {
            $('#emojis').toggle();
        }  else if($target.is('img')) {
            var title = $target.attr('title');
            var $textArea = $(this).siblings('textarea'),
                startPos = $textArea[0].selectionStart,
                endPos = $textArea[0].selectionEnd,
                text = $textArea.val();

            $textArea.val(text.substr(0, startPos) + title + text.substr(endPos));
            $target.closest('#emojis').hide();
            $textArea.focus();
            $textArea.trigger('change');
        }
    });

    // 前后端约定赞的id为1，踩的id为0
    // ajax提交成功后返回的信息为"OK"
    var voteAjaxMsg = '200';

    /**
     * 点击赞功能
     * @param id
     * @param el
     */
    function upvote(id, el) {
        var upvoteId = 1;
        $.ajax({
            url: '/tools/support_comment/' + id + '/' + upvoteId,
            type: 'POST',
            success: function(msg) {
                if(msg['code'] == voteAjaxMsg) {
                    var text = $(el).text(),
                        reg = /(\d+)/g;
                    $(el).text(text.replace(reg, function(match) {
                        return Number(match) + 1;
                    }));
                }
            }
        });
        commentLocal[id].upvoted = true;
        localStorage.setItem(_prefix + 'comment', JSON.stringify(commentLocal));
    }

    /**
     * 点击踩功能
     * @param id
     * @param el
     */
    function downvote(id, el) {
        var downvoteId = 0;
        $.ajax({
            url: '/tools/support_comment/' + id + '/' + downvoteId,
            type: 'POST',
            success: function(msg) {
                if(msg['code'] == voteAjaxMsg) {
                    var text = $(el).text(),
                        reg = /(\d+)/g;
                    $(el).text(text.replace(reg, function(match) {
                        return Number(match) + 1;
                    }));
                }
            }
        });

        commentLocal[id].downvoted = true;

        localStorage.setItem(_prefix + 'comment', JSON.stringify(commentLocal));
    }

    /**
     * 将单例生成的回复框插入到对应的元素中
     * 若已插入，则再次点击回复按钮移除回复框
     * @param id
     * @param el
     */
    function postReply(id, el) {
        getReplyDiv();
        if(!$(el).hasClass('reply')) {
            $('.comment-actions.reply').removeClass('reply');
            $(el).append(replyDiv).addClass('reply');
        } else {
            $(el).removeClass('reply');
            $('#reply-div-wrapper').remove();
        }
    }

    /**
     * 单例生成回复框
     */
    var replyDiv;
    function getReplyDiv() {
        if(replyDiv) {
            return replyDiv;
        } else {
            var $divWrapper = $('<div class="reply-text-wrapper">'),
                $emojiDiv = $('<div class="emoji-wrapper" id="reply-emoji-wrapper"><span class="icon-emoji" id="reply-icon-emoji"></span><div class="emojis" id="reply-emojis"><img src="/assets/emotion/01.gif" title="[s:鼓掌]"><img src="/assets/emotion/02.gif" title="[s:鄙视]"><img src="/assets/emotion/03.gif" title="[s:微笑]"><img src="/assets/emotion/04.gif" title="[s:大哭]"><img src="/assets/emotion/05.gif" title="[s:讨厌]"><img src="/assets/emotion/06.gif" title="[s:卖萌]"><img src="/assets/emotion/07.gif" title="[s:害羞]"><img src="/assets/emotion/08.gif" title="[s:吐血]"><img src="/assets/emotion/09.gif" title="[s:猥琐]"><img src="/assets/emotion/10.gif" title="[s:斜视]"><img src="/assets/emotion/11.gif" title="[s:眯眼]"><img src="/assets/emotion/12.gif" title="[s:木讷]"><img src="/assets/emotion/13.gif" title="[s:哭笑]"><img src="/assets/emotion/14.gif" title="[s:捏脸]"></div></div>'),
                $wordCount = $('<span class="word-count"><span class="count" id="reply-word-count">0</span>/120</span>'),
                $textArea = $('<textarea maxlength="120" class="reply-textarea" placeholder="填写回复内容" required>'),
                $input = $('<input type="text" class="reply-nickname" maxlength="12" placeholder="填写昵称">'),
                $submitBtn = $('<input type="submit" class="reply-submit-btn" value="提交回复">');

            replyDiv = $('<div class="reply-div-wrapper clearfix" id="reply-div-wrapper">').append($divWrapper.append($textArea, $emojiDiv, $wordCount), $input, $submitBtn);
        }
    }

    /**
     * 格式化时间
     * @param time传入的时间戳，单位必须是毫秒
     * @returns {string}
     */
    function formatDate(time) {
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
        return y + '-' + m + '-' + d + ' ' + h + ':' + min;
    }

    /**
     * 隐藏用户ip的最后两个数字
     * @param ip
     * @returns {string|*}
     */
    function hideIp(ip) {
        var _ip = ip.split('.');
        _ip.splice(2, 2, '*', '*');
        return _ip.join('.');
    }

    function submitComment(data) {
        $.ajax({
            url: '/tools/comment_add',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(msg) {
                if(msg['code'] == voteAjaxMsg) {
                    alert('提交评论成功，请静候审核通过。');
                    $('#text-comments, #nickname, .reply-textarea, .reply-nickname').val('');
                    $('#word-count, #reply-word-count').text('0');
                    $('#post-btn').addClass('disabled');
                } else {
                    if(msg.msg) {
                        alert(msg.msg);
                    } else {
                        alert('暂时无法提交评论，请稍后重试');
                    }
                }
            }
        })
    }

    function htmlEscape(str) {
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
        })
    }

    function getCodeImg(el) {
        $.ajax({
            url: '/tools/comment_code_img',
            type: 'GET',
            success: function(msg) {
                var img = new Image();
                img.src = msg['code_img_source'];
                img.id = 'code_img';
                img.className = 'ajax_code_img';
                getCodeDiv($('<input type="text" class="ajax_verify-code" maxlength="4" id="verify-code" data-session-name=' + msg["code_session_name"] + ' placeholder="验证码">'), $(img), $('<span id="reload-code-img" class="change-code">换一换</span>'));
                $(el).parent().append($codeDiv);
            },
            error: function(msg) {
                return msg.msg;
            }
        })
    }

    var $codeDiv;
    function getCodeDiv() {
        var i = 0, len = arguments.length;
        if($codeDiv) {
            $codeDiv.empty();
            for(; i < len; i++) {
                $codeDiv.append(arguments[i]);
            }
            return $codeDiv;
        } else {
            $codeDiv = $('<div class="ajax_code-img" id="ajax_code-img">');
            for(; i < len; i++) {
                $codeDiv.append(arguments[i]);
            }
            return $codeDiv;
        }
    }
})