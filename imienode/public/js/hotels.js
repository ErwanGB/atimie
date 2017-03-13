(function () {

  function init(){
      getAllHotels();

  }

// Fill table with data
function getAllHotels() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/hotels', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += "<tr>";
            tableContent += "<td><a class='getHotelBtn' data-id="+ this.recordid + ">" + this.fields.nom_commercial + "</a></td>";
            tableContent += "<td>" + this.fields.commune + "</a></td>";
            tableContent += "<td>" + getStars(this.fields.note) + "</td>";
            tableContent += "</tr>";
        });

        // Inject the whole content string into our existing HTML table
        $('#container table').html(tableContent);
        $('.getHotelBtn').on("click",getSingleHotel)
    });
};

function getSingleHotel(){
    $('#container table').empty();

    var tableContent = '';

    $.getJSON('/hotel/'+ $(this).attr("data-id"), function(data){
        tableContent += "<article>"
        tableContent += "<h1>" + data.fields.nom_commercial + "</h1>";
        tableContent += "<div>" + data.fields.adresse + "<br/>" + data.fields.code_postal + " " + data.fields.commune + "</div>";
        tableContent += "<div>" + data.fields.telephone + "<br/>";
        tableContent += data.fields.site_internet+ "</div>";
        tableContent += "<div>Nombre de chambres : " + data.fields.capacite_d_accueil_personnes + "<br/>";
        tableContent += "Capacité : " + data.fields.nombre_de_chambres + "</div>";
        tableContent += "<div>" + "Lng : " + data.fields.lng  + " | Lat : " + data.fields.lat+ "</div>";
        tableContent += "</article>"
        $('#container').html(tableContent);
    })
}
/*<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfNYX5WZ4Co4rwKd-mrW1GTSBZoulVPCg&callback=initMap" async defer></script>*/

function getStars(nb){
    var res = ''
    for (var i = 0 ; i < nb ; i++){
        res+= "<i class='icon-star'></i>"
    }
    return res;
}

//init on document ready
$(document).ready(init);
})();