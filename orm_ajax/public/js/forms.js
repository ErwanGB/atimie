(function () {

  function init(){
    $('#addSubmitBtn').bind("click",submitButtonHandler);
    $('.editBtn').bind("click",editButtonHandler);
    $('.delBtn').bind("click",delButtonHandler)
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
    $("<tr data-id="+ membre.id + ">"
    + "<td class='firstname'>" + membre.firstname + "</td>"
    + "<td class='lastname'>" + membre.lastname + "</td>"
    + "<td><a class='btn btn-sm btn-success editBtn'>Edit</a></td>"
    + "<td><a class='btn btn-sm btn-danger delBtn' href='#'>Delete</a></td></tr>"
    ).insertBefore( $( "#addMembreUI" ))
  };

  function editButtonHandler(evt){
    $("#editModal #id").attr("value",$(this).attr("data-id"));
    $("#editModal #firstname").attr("value",$(this).attr("data-firstname"));
    $("#editModal #lastname").attr("value",$(this).attr("data-lastname"));
    $('#editModal').modal('toggle');
    $("#editSaveBtn").bind("click",saveEditHandler);
  }

  function saveEditHandler(){
    var editForm = document.getElementById('editMembre');
    $.ajax({
        url: '/membre',
        type: 'PATCH',
        data: {
          id : editForm.id.value,
          firstname: editForm.firstname.value,
          lastname: editForm.lastname.value
        },
        success: patchSuccessHandler
      });
  }

  function patchSuccessHandler(jsonData){
     $('#editModal').modal('toggle');
     $("#editModal #id").attr("value",'');
     $("#editModal #firstname").attr("value",'');
     $("#editModal #lastname").attr("value",'');
     var membre = jQuery.parseJSON(jsonData);
     $("tr[data-id="+ membre.id + "] td.firstname").html(membre.firstname);
     $("tr[data-id="+ membre.id + "] td.lastname").html(membre.lastname);
  }

  function delButtonHandler(evt){
    var id = $(this).attr("data-id");
    $.ajax({
        url: '/membre',
        type: 'DELETE',
        data: {
          id : id
        },
        success: deleteSuccessHandler
    }); 
  }

  function deleteSuccessHandler(membreId){
    $("tr[data-id=" + membreId + "]").remove();
  }




//init on document ready
$(document).ready(init);
})();