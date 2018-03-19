$(function() {
  var topHeight=$(".nav-top").height()+0,
      head=$(".header"),
      time = $('.time'),
      time_show = $('.time-all'),
      text = $('.search-box'),
      btn = $('.search-btn');
  btn.on('click',function(e) {
    if (text.val() == '') {
      e.preventDefault()
      window.location.href= '/'
    }
  })
  $(window).scroll(function(){ 
      if($('body,html').height() < 1020){
        return;
      }
      if($(this).scrollTop() > topHeight){ 
          head.addClass("head-fix"); 
          $(".nav-top").css('paddingBottom','115px');
      }else{ 
          head.removeClass("head-fix");
          $(".nav-top").css('paddingBottom','0px'); 
      } 
  });
  time_show.text(time.find('.selected').text())
})