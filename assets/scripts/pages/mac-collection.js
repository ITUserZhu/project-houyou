$(function() {

    $('.share-log').on('mouseover',function(event) {
       $('#share-slide').stop(true,false).slideDown();
    }).mouseleave(function(event) {
        $('#share-slide').stop(true,false).slideUp();
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

});