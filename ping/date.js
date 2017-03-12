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
    console.log(fDate);
}

date = new Date();
niceDate(date);