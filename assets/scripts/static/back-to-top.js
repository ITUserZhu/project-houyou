(function($, win, doc) {
    'use strict';
    var esoyu_sideBar = function (opts) {
        this._init(opts);
    };

    $.extend(esoyu_sideBar.prototype, {
        _init: function(opts) {
            this.opts = {
                watchScroll: false
            };

            $.extend(this.opts, opts, true);

            this.elementTopArray = [];

            this.createBarItems();
            this.opts.goTopIcon && this.createGoTopIcon();

            if(this.opts.watchScroll) {
                this.watchScroll();
            }
        },
        createBarItems: function() {
            var self = this;
            for(var key in this.opts) {
                if(/item\d*/.test(key)) {
                    var item = this.opts[key];
                    var $iconSpan, $textSpan, $aLink,
                        $cellWrapper = $('<div class="cell-wrapper">'),
                        $sidebar_cell = $('<div class="sidebar_cell">');

                    $iconSpan = this.createIcons(item, $iconSpan);
                    $textSpan = this.createTexts(item, $textSpan);
                    $aLink = this.createALink(item, $aLink);

                    $cellWrapper.append($aLink.append($iconSpan, $textSpan)).appendTo($sidebar_cell);

                    $sidebar_cell.click(function(e) {
                        var _href = $(this).find('a').attr('href');

                        switch(_href[0]) {
                            case '#':
                            case '.':
                                self.moveToElement($(_href));
                                break;
                            default:
                                break;
                        }
                        return false;
                    });

                    $('#go-top').append($sidebar_cell);

                    if(this.opts.watchScroll) {
                        var selector = item.selector;
                        var elementTop = $(selector).position().top;
                        elementTop && this.elementTopArray.push(elementTop);
                    }
                }
            }
        },
        createIcons: function(obj, iconSpan) {
            var opts = this.opts;
            obj.iconClass && (iconSpan = $('<span class="cell-item cell-icon">').addClass(obj.iconClass));

            var _iconStyle = {};
            opts.commonIconStyle && $.extend(_iconStyle, opts.commonIconStyle);
            obj.iconStyle && $.extend(_iconStyle, obj.iconStyle);
            iconSpan.css(_iconStyle);

            return iconSpan;
        },
        createTexts: function(obj, textSpan) {
            var opts = this.opts;
            obj.cellText && (textSpan = $('<span class="cell-item cell-text">').html(obj.cellText));

            var _textStyle = {};
            opts.commonTextStyle && $.extend(_textStyle, opts.commonTextStyle);
            obj.textStyle && $.extend(_textStyle, obj.textStyle);
            textSpan.css(_textStyle);

            return textSpan;
        },
        createALink: function(obj, aLink) {
            var _href = obj.selector || obj.href || 'javascript:;';
            aLink = $('<a href="' + _href + '" target="_self">');

            return aLink;
        },
        createGoTopIcon: function() {
            var opts = this.opts,
                goTopObj = opts.goTopIcon,
                _speed = opts.scrollSpeed || 300;
            var _goTopIconShow = opts.goTopIconShow || 400;

            var $sideBarCell = $('<div class="sidebar_cell">'),
                $cellWrapper = $('<div class="cell-wrapper">'),
                $icon = $('<i class="cell-item back-to-top">'),
                $text = $('<span class="cell-item cell-text">').html(goTopObj.cellText),
                $aLink = $('<a href="javascript:;">');

            var _iconStyle = {}, _textStyle = {};
            opts.commonIconStyle && $.extend(_iconStyle, opts.commonIconStyle);
            goTopObj.iconClass && $icon.addClass(goTopObj.iconClass);
            goTopObj.iconStyle && $.extend(_iconStyle, goTopObj.iconStyle);
            opts.commonTextStyle && $.extend(_textStyle, opts.commonTextStyle);
            goTopObj.textStyle && $.extend(_textStyle, goTopObj.textStyle);

            $icon.css(_iconStyle);
            $text.css(_textStyle);

            $cellWrapper.append($aLink.append($icon, $text)).appendTo($sideBarCell);

            $sideBarCell.on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({scrollTop: 0}, _speed);
                return false;
            });

            $(window).on('load scroll', function() {
                var winTop = $(window).scrollTop();
                winTop < 400 ? $sideBarCell.fadeOut() : $sideBarCell.fadeIn();
            });

            $('#go-top').append($sideBarCell);

            return this;
        },
        watchScroll: function() {
            var currentIndex = 0,
                topArray = this.elementTopArray;
            $(window).on('load scroll', function(){
                var winTop = $(window).scrollTop();
                for(var i = 0; i < topArray.length; i++) {
                    var height_1 = topArray[i],
                        height_2 = topArray[i+1];
                    if(height_1 > winTop) {
                        break;
                    }
                    if(!height_2 || (height_1 <= winTop && height_2 > winTop)) {
                        currentIndex = i;
                        break;
                    }
                }
                var $sidebarCell = $('#go-top').find('.sidebar_cell');
                $sidebarCell.eq(currentIndex).addClass('active').siblings().removeClass('active');
            });
        },
        moveToElement: function(ele) {
            var elapse = this.opts.scrollSpeed || 200;

            var _top = $(ele).offset().top;

            $('html, body').animate({scrollTop: _top}, elapse);
        }
    }, true);

    win.esoyu_sideBar = esoyu_sideBar;
})(jQuery, window, document);