var nbpos = 10;
var nbtofind = Math.round(nbpos*Math.random())
var nbtries = 0;

/*

for (i = 0; i <= nbpos ; i++ ){
    if (i == nbtofind){
        console.log("trouvé en " + nbtries + " essais")
    }else{
        nbtries++
    }
}

*/

function find(tofind,begin,end){

    if (end - begin == tofind){
        console.log("trouvé")
    }else if (tofind > (end - begin) / 2){
        return find(tofind,(end - begin) / 2,end);
    }else{
        return find(tofind,begin,(end-begin)/2);
    }

}

find(nbtofind,1,nbpos);