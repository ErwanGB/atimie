'use strict';

module.exports = (app, db) => {

app.get('/programmes/all', (req, res) => {
    
    db.programmes.findAll().then(programmes => {
        res.render('chaine',{programmes});
    });
});



}