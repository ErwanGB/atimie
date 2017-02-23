var pc = {
    nb:80,ha : 98.4, hl : 7.2, ho : 62.4, pa : 235 , pl : 75 , po : 10
}

var moniteur = {
    nb:80,ha : 62.9, hl : 57.7, ho : 48, pa : 100 , pl : 33 , po : 5
}

var serv = {
    nb:10,ha : 168, hl : 0, ho : 0, pa : 500 , pl : 500 , po : 500
}

var it = [pc,moniteur,serv]

var spm = 0.3

var uec = function (spm,ha,hl,ho,pa,pl,po){

    return (spm*(pa*ha+pl*hl+po*ho)/7)*365/1000 + ((((1-spm)*pa*(ha+hl)+po*ho)/7)*365/1000);
}

console.log(uec(spm,pc.ha,pc.hl,pc.ho,pc.pa,pc.pl,pc.po));

var uecTot = 0;

for (var h of it){

    uecTot = h.nb * uec(spm,h.ha,h.hl,h.ho,h.pa,h.pl,h.po)
    console.log(h + " " + uecTot);
}