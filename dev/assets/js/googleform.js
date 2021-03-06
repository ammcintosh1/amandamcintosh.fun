// Using http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/
// for some assistance!

let request;

$('#foo').submit(function(event){

  // Abort any pending requests
  if (request){
    request.abort();
  }

  let form = $(this) // Form
  let inputs = form.find('input, select, button, textarea') // Cache fields
  let serialData = form.serializeArray() // Form Submission data

  inputs.prop('disabled', true); // Disabled after form data has been serialized

  let payload = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbz4-mbO8PXbC0FoBeLd0BHZ-mp8fMqKoMA5o5YJg4zNTJJI2EqW/exec",
    type: "POST",
    datatype: 'jsonp',
    data: serialData
  })

  request = jQuery.ajax(payload)

  // Success
  request.done(function(response, textStatus, jqXHR){
    console.log("Successfully did AJAX magic")
    console.log(serialData)

    console.log(response)
    console.log(textStatus)
    console.log(jqXHR)
  })

  // Failure
  request.fail(function(jqXHR, textStatus, errorThrown){
    console.error("ERROR: " + textStatus, errorThrown)
  })
  // Callback handler
  request.always(function(){
    inputs.prop("disabled", false)
    console.log('test')
//    window.location = 'http://amandamcintosh.design/contact.html'; //redirect
  })

  event.preventDefault()

})