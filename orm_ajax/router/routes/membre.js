'use strict';

module.exports = (app, db) => {

    // Tous les membres
    app.get('/membre', (req, res) => {

        db.membre.findAll().then(allmembres => {
            res.render('membre',{allmembres});
        });
    });

    // Ajouter un membre
    app.post('/membre', (req, res) => {

        db.membre.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname, 
        }).then(newMembre => {
            res.json(newMembre);
        });
    });

    // Update un membre
    app.patch('/membre', (req, res) => {

        const id = req.body.id;
        const updates = {firstname : req.body.firstname, lastname : req.body.lastname};
        db.membre.find({
            where: { id: id }
        })
        .then(membre => {
            return membre.updateAttributes(updates)
        }).then(editedMembre => {
            res.json(editedMembre);
        })
    });

     // Delete un membre
    app.delete('/membre', (req, res) => {

        const id = req.body.id;
        db.membre.destroy({
            where: { id: id }
        }).then(deletedMembre => {           
            res.json(id);
        });
    });
};

