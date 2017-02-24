(function () {

  function init(){
    $('#addSubmitBtn').click(submitButtonHandler);
  }

  function submitButtonHandler (evt) {
     var addForm = document.getElementById('addMembre');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

    //  $('#post-results-container').fadeOut();
   //   $('.ajaxLoader').css('display', 'inline-block');


      //make the AJAX call
      $.ajax({
        url: '/membre',
        type: 'POST',
        data: {
          firstname: addForm.firstname.value,
          lastname: addForm.lastname.value
        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    $("#addMembreUI input:text").val('');
    $("#addMembreUI input:text:visible:first").focus();
    var membre = jQuery.parseJSON(jsonData);
    $("<tr><td>" + membre.id + 
    "</td><td>" + membre.firstname + 
    "</td><td>" + membre.lastname + "</td><td>"
    + "<a href='/membre/del?id=" + membre.id + "'" + ">Delete</a></td></tr>"
    ).insertBefore( $( "#addMembreUI" ))
  };

//init on document ready
$(document).ready(init);
})();