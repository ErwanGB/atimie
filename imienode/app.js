var fs = require('fs');
var zlib = require('zlib');

/*
var file = fs.readFileSync('test.json' ,function(err,data){
    console.log('async',data)
})
*/

/* Ressortir les entrée claviers dans la console
process.stdin.on('data',function(data){
    console.log(data.toString());
    process.stdout.write(data);
})
*/

// Copier un fichier
var file = fs.createReadStream('test.json');
var copy = fs.createWriteStream('text.txt')

//file.pipe(copy)
process.stdin.pipe(copy);





