'use strict';
$(function () {
	// 首屏展示点击切换效果
	var recHtmlStr = '\n\t\t<a href="{{ url }}" class="common_paltebg">\n\t\t\t<div class="img">\n\t\t\t\t<img src="{{ src }}" alt="">\n\t\t\t</div>\n\t\t\t<p class="center title common_fff">{{ title }}</p>\n\t\t\t<p class="common_ddd center">{{ vesrion }}</p>\n\t\t\t<p class="common_999 desc">{{ desc }}</p>\n\t\t\t<p class="common_999">\n\t\t\t\t<span>\u5927\u5C0F\uFF1A{{ size }}</span>\n\t\t\t\t<span class="fr">\u65F6\u95F4\uFF1A{{ time }}</span>\n\t\t\t</p>\n\t\t\t<p class="common_999">\u73AF\u5883\uFF1A{{ system }}</p>\n\t\t\t<span class="btn common_bg222">\u7ACB\u5373\u4E0B\u8F7D</span>\n\t\t</a>\n\t';
	var $showItem = $('#show-item'),
	    $recLisItem = $('.recommend').find('ul').children('li'),
	    $firstItemInfo = $recLisItem.first().find('.soft-info');
	var setInfoObj = function setInfoObj(dom) {
		return {
			url: dom.data('url'),
			desc: dom.data('desc'),
			size: dom.data('size'),
			time: dom.data('time'),
			system: dom.data('system'),
			title: dom.data('title'),
			src: dom.data('src'),
			vesrion: dom.data('vesrion')
		};
	};
	var replaceHtml = function replaceHtml(str) {
		return str.replace('{{ url }}', infoObj.url).replace('{{ desc }}', infoObj.desc).replace('{{ size }}', infoObj.size).replace('{{ time }}', infoObj.time).replace('{{ system }}', infoObj.system).replace('{{ title }}', infoObj.title).replace('{{ src }}', infoObj.src).replace('{{ vesrion }}', infoObj.vesrion);
	};
	var infoObj = setInfoObj($firstItemInfo);
	$showItem.append(replaceHtml(recHtmlStr));

	$recLisItem.click(function (e) {
		var $target = $(e.target.closest('li'));
		if ($target.hasClass('active')) return;
		__commonToggleActive($target);
		infoObj = setInfoObj($target.find('.soft-info'));
		$showItem.append(replaceHtml(recHtmlStr)).animate({
			marginLeft: -300 }, 400, function () {
			$showItem.css('marginLeft', 0).children('a').eq(0).remove();
		});
	});

	// 分类点击切换效果
	var $classifyNavLis = $('.check-nva').children('li'),
	    $classifyItemsWra = $('.classfiy-wra-ul'),
	    $classifyLis = $classifyItemsWra.children('li.pic'),
	    LisWidth = $classifyLis.width();
	$classifyNavLis.on('click', function (e) {
		var $target = $(e.target.closest('li')),
		    index = $target.index();
		if ($target.hasClass('active')) return;
		__commonToggleActive($target);
		$classifyItemsWra.animate({
			marginLeft: -index * LisWidth }, 400);
	});

	// 排行鼠标经过效果
	var $rankUl = $('.rank').find('ul');
	$rankUl.on('mouseover', 'li', function (e) {
		__commonToggleActive($(e.target).closest('li'));
	});
});