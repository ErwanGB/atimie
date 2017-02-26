(function () {

  function init(){
    $('#addSubmitBtn').bind("click",submitButtonHandler);
    $('.editSubmitBtn').bind("click",editButtonHandler);
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

  function editButtonHandler(evt){
    // Desactiver tous les boutons d'édition
    $('.editSubmitBtn').unbind("click",editButtonHandler);
   
    var first = true;
     // Selection de tous les td du tr parent du bouton
    var targets = $(this).parent().parent().children();

    targets.each((index,elmt) =>{
      // on récupère les noms de classes des td et leur value pour les remplacer par des inputs
      var className = $(elmt).attr('class')
      if (className != undefined){
        var inputValue = $(elmt).html();
        $(elmt).html("<input type='text' name=" + className + " value=" + inputValue + "></input>");
      }
      if(first){$(elmt).focus()};
      first = false;
    },getValidButtons(this)
    );
  }

  function getValidButtons(place){
        $(place).html("<a class='editValidBtn'>Valider</a> <a class='editCancelBtn'>Annuler</a>");
        $('.editValidBtn').bind("click",sendEdit);
  }

  function sendEdit(){
    alert("send");
  }

  function cancelEdit(){
    alert("cancel");
  }


//init on document ready
$(document).ready(init);
})();