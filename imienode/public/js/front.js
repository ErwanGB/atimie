(function () {

  function init(){
      populateHotels();

  }

// Fill table with data
function populateHotels() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/hotels', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += "<tr>";
            tableContent += "<td>" + this.fields.nom_commercial + "</a></td>";
            tableContent += "<td>" + this.fields.commune + "</a></td>";
            tableContent += "<td>" + this.fields.classement + "</a></td>";
            tableContent += "</tr>";
        });

        // Inject the whole content string into our existing HTML table
        $('#container table').html(tableContent);
    });
};

//init on document ready
$(document).ready(init);
})();