var mongodb = require('mongodb').MongoClient;

var arr = require('./les_hotels_classes_en_ile-de-france.json')

mongodb.connect("mongodb://localhost:27017/hotels", function(err,db){

    for(var idx in arr){
        db.collection('hotels').insert(arr[idx]);
    }

});
