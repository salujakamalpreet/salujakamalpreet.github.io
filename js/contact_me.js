$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzFk0RUtN0_jBt_YneXOw_9FnExmKeisFu30MKJBA/exec",
        type: "POST",
        data: {
          name: name,
          subject: subject,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#form-message-success').html("<div class='alert alert-success'>");
          $('#form-message-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#form-message-success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#form-message-success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
          alert("Submitted Successfully");
        },
        error: function() {
          // Fail message
          $('#form-message-success').html("<div class='alert alert-danger'>");
          $('#form-message-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#form-message-success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#form-message-success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
          alert("Error..!! <br/> Please reach me  at ksaluja24@gmail.com");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
