'use strict';

module.exports = (app, db) => {
  // GET all airports
  app.get('/airports', (req, res) => {
    db.airports.findAll()
      .then(airports => {
        res.json(airports);
      });
  });

  // GET one airport by id
  app.get('/airport/:id', (req, res) => {
    const id = req.params.id;
    db.airports.find({
      where: { id: id}
    })
      .then(airport => {
        res.json(airport);
      });
  });

  // POST single airport
  app.post('/airport', (req, res) => {
    const name = req.body.name;
    db.airports.create({
      name: name,
    })
      .then(newairport => {
      res.json(newairport);
    });
  });

  // PATCH single airport
  app.patch('/airport/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.airports.find({
      where: { id: id }
    })
      .then(airport => {
        return airport.updateAttributes(updates);
      })
      .then(updatedairport => {
        res.json(updatedairport);
      });
  });

  app.delete('/airport/:id', (req, res) => {
    const id = req.params.id;
    db.airports.destroy({
      where: { id: id }
    })
      .then(deletedairport => {
        res.json(deletedairport);
      });
  });

};