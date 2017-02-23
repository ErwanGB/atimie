'use strict';

module.exports = (app, db) => {

// Toutes les chaines
app.get('/chaine/all', (req, res) => {
    
    db.chaine.findAll().then(chaine => {
        res.render('chaine',{chaine});
    });


// Ajouter une chaine
app.get('/chaine/add', (req, res) => {

const nom_chaine = req.params.nom_chaine;
const adresse = req.params.adresse;
const code_postal = req.params.code_postal;
const ville = req.params.ville;
const telephone = req.params.telephone;
const payante = req.params.payante;
const fax = req.params.fax;

console.log(nom_chaine);

/*db.chaine.create({
    nom_chaine : nom_chaine,
    adresse : adresse,
    code_postal : code_postal,
    ville : ville , 
    telephone : telephone,
    payante : payante ,
    fax : fax , 
    })
    .then(newChaine => {
        //res.redirect('/chaine/all');
        console.log("Okay")
    });*/
});

})};

