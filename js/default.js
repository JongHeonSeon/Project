/* --------------------------------------------
/*
/* 전체 서비스 공통 (맞선, 노블레스, 포탈)
/* 
/* --------------------------------------------*/

// content 최소 높이 설정
const setVh = () =>{
  let vh = $(window).innerHeight() * 0.01;
  document.documentElement.style.setProperty('--vh',`${vh}px`);
  console.log(vh);
};
setVh();
window.addEventListener('resize',setVh);

// 컴포넌트 팝업
$('.pop').on('click',function(e){
  let target = e.target
  if($(this).children().hasClass('pop__full_layer')){return}
  else if($(target).hasClass('btn__btn_line') || $(target).hasClass('btn__btn_default') || $(target).hasClass('pop_alert__btn_cls') || $(target).hasClass('pop__bg')|| $(target).hasClass('pop_evnt__bg')){
    $(this).addClass('hidden')
  }
})

// 메인리스트 이벤트 팝업
$('.pop_evnt__btn_cls_wrap').on('click', function() {
  $(this).parents('.pop').addClass('hidden')
})

// 풀페이지 팝업 레이어

// 뒤로가기
test_back()
function test_back(){
  const isMobile = /iPhone|iPad|iPod/i.test(window.navigator.userAgent)
  let moveState = false
  let top = 0
  if(isMobile){
    $("<div></div>")
      .addClass("history_back")
      .css({"position":"fixed","top":"0","bottom":"0","left":"0","width":"20px","zIndex":"9999"})
      .appendTo($(".pc__container"))
      .on("touchstart",function(){
        moveState = true
        top = $(window).scrollTop()
        $("body").css({"position":"fixed","transform":`translate(0, 0)`,"height":"100vh","overflow":"hidden",})
        $(".pc__container").css({"position":"relative","top":`${-top + "px"}`})
      })

    $(window).on("touchmove",function(e){
      if(!moveState){return}
      else {
        $("body").css({"left":`${e.originalEvent.changedTouches[0].pageX + "px"}`,})
        if(e.originalEvent.changedTouches[0].pageX > $(this).width() / 4){
          $("body").css({"opacity":".3"})
        }
        else{$("body").css({"opacity":"1"})}
      }
    })

    $(window).on("touchend",function(e){
      if(!moveState){return}
      else if(e.originalEvent.changedTouches[0].pageX > $(this).width() / 4){
        window.history.back()
      }
      else{
        $("body").removeAttr("style")
        $(".pc__container").removeAttr("style")
        $(window).scrollTop(top)
      }
      moveState = false
    })
  }
}

// bot 팝업
$('.bot_pop').on('click',function(e){
  closeBotPop.apply(this, [e])
})

function closeBotPop (e) {
  let target = e.target;
  
  if ($(target).hasClass('pop_slct__ico_cls') || $(target).hasClass('bot_pop__bg')) {
    $(this)
      .find('.bot_pop__layer')
      .removeClass("bot_pop__layer-slide_up")
      .addClass("bot_pop__layer-slide_down")
      .on("animationend",function(){
        $(this).parents(".bot_pop")
        .addClass("hidden")
        .end()
        .off("animationend")
        .removeClass('bot_pop__layer-slide_down')
        .addClass('bot_pop__layer-slide')
      })
  }
}


/* --------------------------------------------
/*
/* 포탈 서비스
/* 
/* --------------------------------------------*/

// 포탈 POST 관련 a tag 영역 on / off 토글
const aTagHideBtn = {
  source: '<!-- 퍼블리싱 파트용 버튼입니다. 실제 서비스에 들어가지 않습니다 --><div class="aTagToggle" style="position: fixed; bottom: 0; left: 0; width: 20px; height: 20px; border-radius: 50%;  background-color: rgba(45, 101, 255, 0.466); font-size: 10px; color: #FFF; line-height: 20px; text-align: center; cursor: pointer; z-index: 10">ON</div>',
  appendBtn: function() { // 토글 추가
    $('.pc__container').append(this.source)
  },
  toggleATag: function() { // 토글 액션
    $('.aTagToggle').on('click', function() {
      if ($('.post__link').hasClass('hidden')) {
        $('.post__link').removeClass('hidden')
        $(this).css({'background-color': 'rgba(45, 101, 255, .5)' })
        $(this).text('ON')
      } else {
        $('.post__link').addClass('hidden')
        $(this).css({'background-color': 'rgba(6, 13, 30, .5)'})
        $(this).text('OFF')
      }
    })
  },
}