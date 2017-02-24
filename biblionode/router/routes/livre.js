'use strict';

module.exports = (app, db) => {

app.get('/livre/all', (req, res) => {
    
    db.livre.findAll().then(livre => {
        res.render('livre',{livre});
    });
});



}