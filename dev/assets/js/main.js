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