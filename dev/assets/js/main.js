$(document).ready(function(){

// Background Loader
// Do research on how to actually do this correctly, pls!

  $('.feature').css('background-image', 'url(./img/background.jpg)')

// Scroll trigger
// written on 3.1.18
//let headHeight = parseInt($('header').outerHeight())
//let breakPoint = 0;
//let triggered = false;
//
//$(window).scroll(function(){
//  if (breakPoint < window.pageYOffset && triggered == false){
//    $('header').addClass('sticky')
//    $('.container').css('padding-top',headHeight)
//    triggered = true
//  } else if (breakPoint >= window.pageYOffset && triggered == true) {
//    $('header').removeClass('sticky')
//    $('.container').css('padding-top',0)
//
//    triggered = false
//  }
//
//})

})

// Portfolio Trigger
// written on 2.2.18

$('.listing .link a').on('click', function(e){
  e.preventDefault()

  let id = $(this).attr('href')
  $('.projects h1').addClass('open-project')

  $('.projects-nav').show()

  $('.open').removeClass('open')

  $('.project'+id).addClass('open')
  $('.projects-nav').prependTo('.project.open .summary')

  .animate({ scrollTop: $('.project.open').position().top+'px' }, "slow");
})

$('.projects-nav .close').on('click', function(e){
  console.log('click!')

  $('.projects h1').removeClass('open-project')

  $("html, body").animate({ scrollTop: 0 }, "slow");

  setTimeout(function(){
    $('.open').removeClass('open')
    $('.projects-nav').hide()
  }, 500)
})
// Simple TABBER
// written on 1.31.18

let tabControl = $('.tabber')
let tabLinks = $('.tabber a')
let tabContainer = $('.tabber + .tab-container')
let activeTab = getActiveTab(tabContainer)
let tabs = setUpTabs()
let firstTab = tabs[0]

function setUpTabs(){
  let all = tabContainer.children('.tab')
  console.log(all)

  all.each(function(i, e){
    e = $(e)
    e.css('left', 100*i+'%')
  })
  return all;
}

function getActiveTab(container){
  let active = container.children('.active')
  return active.attr('id')
}

tabLinks.each(function(i, e){
  e = $(e)

  let link = e.attr('href')
  let tab = tabContainer.children(link)

  e.on('click', function(f){
    console.log(tabs[i])

    f.preventDefault();
    $('.active').removeClass('active')
    $('.focused').removeClass('focused')
    tab.addClass('active')
    e.addClass('focused')

    $(tabs).each(function(k,g){
      $(g).css('left',(k-i)*100+'%')
    })
  })
})




$(document).ready(function () {
  var form = $('form');


  form.on('submit', function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.


    var url = "https://script.google.com/macros/s/AKfycbzEA0iRoPMUQWRL6VZevErsn6ezp_xmE5WeMA73-Y3I_ZKtHI8/exec"; // the script where you handle the form input.
    var name = "Amanda McIntosh"
    var ajaxnotworks = $.ajax({
      method: "GET",
      url: url,
      dataType:"jsonp",
      cache: false,

      crossDomain: true,
      data: $('#test').serialize() // serializes the form's elements.
    })

  });
  //     e.preventDefault();
  //     $.post($(this).attr('action'), $(this).serialize())
  //     return false

  //  submit(function(){
  //      $.post($(this).attr('action'), $(this).serialize(), function(response){
  //            // do something here on success
  //      },'json');
  //      return false;
  //   });
});




$(document).ready(function () {
  addBackgroundToPieces();

  $('.pieces .piece a').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
  });
  $('.company').each(function () {
    let el = $(this)
    el.addClass('condensed')
  })

  projectControls();
});


function addBackgroundToPieces() {
  // TODO: Add small image instead of full-sized image to improve load time.

  let pieces = $('.pieces .piece');

  pieces.each(function (i, e) {
    var piece = $(e),
      link = piece.children('a').attr('href');

    piece.attr('style', `background:url(${link}); background-size: cover; background-repeat: no-repeat; background-position: center center;`)

    let img = piece.find('img')

    img.remove()
  })
}


function projectControls() {
  $('.company.condensed').on('mouseenter', function (e) {
    let mouseOriginX = e.pageX,
      mouseOriginY = e.pageY

    // Simple interactive move effect
    //
    $(this).on('mousemove', function (e) {
      let mousePositionX = e.pageX,
        mousePositionY = e.pageY,
        newMarginX = -50 + (mouseOriginX - mousePositionX) / 2 + '%',
        newMarginY = (mouseOriginY - mousePositionY) / 4 + 'px'

      $(this).children('.project:first-of-type').css({
        'margin-left': newMarginX,
        'margin-top': newMarginY
      })
    })
  })

  $('.company.condensed').on('mouseleave', function (e) {
    let el = $(this)
    console.log('out')
    setTimeout(function () {
      if (!el.hasClass('expanded')) {
        el.children('.project:first-of-type').css({
          'margin-left': '-50%',
          'margin-top': 0
        })
      }
    }, 1000)

  })

  $('.company.condensed').on('click', function () {
    $(this).off();
    $(this).addClass('expanded').removeClass('condensed').children('.project:first-of-type').css({
      'margin-left': '0',
      'margin-top': 0,
      'min-height': window.innerHeight
    })
    $('.pieces').addClass('hidden')
    $('.company.condensed').addClass('hidden')

    $(this).append('<div class="close">close</div>').on('click', function () {
      $(this).removeClass('expanded').addClass('condensed')
      $(this).children('.project:first-of-type').css({
        'margin-left': '-50%',
        'margin-top': 0,
        'height': 'auto',
        'min-height': 'auto'
      })
      projectControls();
      $('.company.condensed').removeClass('hidden')
      $('.pieces').removeClass('hidden')
      $('.close').remove()
    })
  })
}


// Toggle Jobs
// Written 3-27-18
if ('.job'){
  $('.job').each(function(){
    let el = $(this)
    let details = el.children('.details')
    details.hide()
    el.on('click', function(){
      details.toggle()
      el.toggleClass('active')
    })
  })
}

//  var dropdown = $(this).next('.dropdown'),
//      hovering = 0
//  dropdown.show()
//
//  setInterval(function(){ hovering++; console.log(hovering) }, 1000);
//
//  $(this).on('mouseleave', function(){
//    setTimeout(function(){ dropdown.hide() }, 1000)
//  })
//
//})