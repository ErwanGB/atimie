var ping = require('ping');
var http = require('http') ;
var express = require ('express') ;
var app = express ();

var resp = '\n';

app.get ('/' , function (req,res) {
    res.setHeader ('Content-Type','text/html');
    res.end(resp) ;
});


app.listen(8080) ;

setInterval(checkInternet,5*1000);

function checkInternet(){
    var hosts = ['google.com'];
    hosts.forEach(function(host){
        date = new Date();
        fDate = niceDate(date)
        ping.sys.probe(host, function(isAlive){
            msg = isAlive ? 'Ok<br/>' : 'Pas de connexion<br/>';
            msg = fDate + " " + msg;
            console.log(isAlive ? 'Ok' : 'Pas de connexion');
            resp += msg;
        });
    });
}

function niceDate(date){
    datevalues = [
        date.getDate().toString(),
        date.getMonth().toString(),
        date.getFullYear().toString(),
        date.getHours().toString(),
        date.getMinutes().toString(),
        date.getSeconds().toString(),
    ]
    for (i = 0 ; i < datevalues.length ; i++){
        if (datevalues[i].length < 2 ){
            datevalues[i] = "0" + datevalues[i];
        }
    }
    fDate = datevalues[0] + "." + datevalues[1] + "." + datevalues[2] + "  " + datevalues[3] + ":" + datevalues[4] + ":" + datevalues[5];
    return(fDate);
}

