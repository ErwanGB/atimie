'use strict';

module.exports = (app, db) => {

    // Tous les membres
    app.get('/membre', (req, res) => {
        
        db.membre.findAll().then(membre => {
            res.render('membre',{membre});
        });
    });

    app.post('/membre', (req, res) => {

        db.membre.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname, 
        }).then(newMembre => {
            res.json(newMembre);
        });
    });

    // Update un membre
    app.get('/membre/up', (req, res) => {
        const id = req.query.id;
        const updates = {firstname : req.query.firstname, lastname : req.query.lastname};
        db.membre.find({
        where: { id: id }
        })
        .then(membre => {
            return membre.updateAttributes(updates)
        })
        .then(updatedMembre => {
            res.redirect('/membre');
        });
    });

     // Delete un membre
    app.get('/membre/del', (req, res) => {
        const id = req.query.id;
        db.membre.destroy({
        where: { id: id }
        })
        .then(deletedMembre => {
            res.redirect('/membre');
        });
    });
};

