/**
 * Created by admin on 2017/4/13.
 */
$(function() {
    var $_top = $('.mac-problem').offset().top,
        faqWarpper = $('.faq-warpper'),
        faqItem,
        allPage = $('.total'),
        prev = $('.prev-btn'),
        next = $('.next-btn'),
        currPage = $('.page'),
        currPageIndex = currPage.text(),
        totalPage,
        searchIpt = $('.ipt-faq'),
        searchBtn = $('.problem-btn'),
        pageItem = $('.page-items'),
        value = '';

    $(document).on('scroll',function(){
        if($(document).scrollTop() >= $_top){
            $('.mac-problem').css({'position':'fixed','top': 0,'marginTop': 0})
        }else{
            $('.mac-problem').css({'position':'static','top': 'none','marginTop': '60px'})
        }
    })

    function getFAQ (data,callback){
      $.ajax({
            url: '/tools/faq',
            type: 'POST',
            dataType: 'json',
            data: {page: data.page, keyword: data.keyword || '' },
        })
        .done(callback)
        .fail(function(error) {
            console.log(error);
        })
    }
    function clickProblem (success) {
        if (success.code == 200 ) {
            var flag = true;
            faqWarpper.empty();
            currPage.text(success.data.page);
            currPageIndex = currPage.text();
            allPage.text(success.data.total);
            totalPage = Math.ceil(success.data.total/10)
            if(success.data.data == '') {
                return false;
            }
            $('#container').load(success.data.data[0].url + " .fr-view")
            if(value != '') {
                var reg = new RegExp(value,"g"),
                    str = '<span style="color: red;">'+ value +'</span>'
            }
            $.each(success.data.data, function(index, el) {
                $('<li class="problem-item common_ovh">'+ el.title.replace(reg, str) +'</li>').appendTo(faqWarpper)
            });
            faqItem = $('.problem-item');
            __commonToggleActive(faqItem[0])
            faqItem.on('click', function () {
                if($(document).scrollTop() >= $_top) {
                    $(document).scrollTop($_top)
                }
                __commonToggleActive(this)
                $('#container').load(success.data.data[$(this).index()].url + " .fr-view")
            })
            if (currPageIndex >= totalPage) {
                next.css({'background': '#ddd', 'cursor': 'not-allowed'})
            }else {
                next.css({'background': '#333', 'cursor': 'pointer'})
            }
            if (currPageIndex <= 1) {
                prev.css({'background': '#ddd', 'cursor': 'not-allowed'})
            }else {
                prev.css({'background': '#333', 'cursor': 'pointer'})
            }
        }
    }
    // 进入页面读取第一页第一个数据
    getFAQ({page: 1, keyword: value},clickProblem)

    // 点击搜索
    searchBtn.on('click', function() {
        value = searchIpt.val();
        if (value == '') {
            return;
        }
        getFAQ({page: 1, keyword: value},clickProblem)

    })

    searchIpt.on('keydown', function(event) {
        var keyCode =window.event? event.keyCode:event.which;
        if(keyCode== 13) {
           searchBtn.click();
        }
    })
    // 翻页

    pageItem.on('click',function(e) {
        switch (e.target.className) {
            case 'prev-btn':
                if (currPageIndex == 1) {
                    return;
                }else {
                    currPageIndex--
                    getFAQ({page: currPageIndex, keyword: value},clickProblem)
                }
                break;
            case 'next-btn':
                if (currPageIndex == totalPage) {
                    return;
                    console.log(currPageIndex)
                }else {
                    currPageIndex++
                    getFAQ({page: currPageIndex, keyword: value},clickProblem)
                }
                break;
            default:
                break;
        }
    })
})