'use strict';

module.exports = (app, db) => {

  const ModuleService = require('./module-service');
  const mService = new ModuleService(db);
  // ets = etablissements
  // GET all ets
  app.get('/ets', (req, res) => {
/*    db.ets.findAll()
      .then(ets => {
        res.json(ets);
      });*/
        let ets = mService.getEts();
        res.json(ets);
  });

/*  // GET one ets by id
  app.get('/ets/:id', (req, res) => {
    const id = req.params.id;
    db.ets.find({
      where: { id: id }
    })
      .then(ets => {
        res.json(ets);
      });
  });

  // POST single ets
  app.post('/ets', (req, res) => {
    // TO DO 
  });

  // PATCH single ets
  app.patch('/ets/:id', (req, res) => {
    // TO DO
  });

  // DELETE single ets
  app.delete('/ets/:id', (req, res) => {
    // TO DO 
  });*/

};