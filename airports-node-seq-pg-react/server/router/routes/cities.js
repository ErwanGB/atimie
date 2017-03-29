'use strict';

module.exports = (app, db) => {
  // GET all cities
  app.get('/cities', (req, res) => {
    db.cities.findAll({
      include:
        {
          model: db.airports
        }
    })
      .then(cities => {
        res.json(cities);
      });
  });

  // GET one city by id
  app.get('/city/:id', (req, res) => {
    const id = req.params.id;
    db.cities.find({
      where: { id: id},
      include:
        {
          model: db.airports
        }

    })
      .then(city => {
        res.json(city);
      });
  });

  // POST single city
  app.post('/city', (req, res) => {
    const name = req.body.name;
    db.cities.create({
      name: name,
    })
      .then(newcity => {
      res.json(newcity);
    });
  });

  // PATCH single city
  app.patch('/city/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.cities.find({
      where: { id: id }
    })
      .then(city => {
        return city.updateAttributes(updates);
      })
      .then(updatedcity => {
        res.json(updatedcity);
      });
  });

  app.delete('/city/:id', (req, res) => {
    const id = req.params.id;
    db.cities.destroy({
      where: { id: id }
    })
      .then(deletedcity => {
        res.json(deletedcity);
      });
  });

};