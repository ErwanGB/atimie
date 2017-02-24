'use strict';

module.exports = (app, db) => {

    // Tous les membres
    app.get('/membre/all', (req, res) => {
        
        db.membre.findAll().then(membre => {
            res.render('membre',{membre});
        });
    });


    // Ajouter un membre
    app.get('/membre/add', (req, res) => {

        const firstname = req.query.firstname;
        const lastname = req.query.lastname;

        db.membre.create({
            firstname : firstname,
            lastname : lastname, 
        })
        .then(newMembre => {
            res.redirect('/membre/all');
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
            res.redirect('/membre/all');
        });
    });

     // Delete un membre
    app.get('/membre/del', (req, res) => {
        const id = req.query.id;
        db.membre.destroy({
        where: { id: id }
        })
        .then(deletedMembre => {
            res.redirect('/membre/all');
        });
    });
};

