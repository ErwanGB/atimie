'use strict';

module.exports = (app, db) => {
  // GET all flights
  app.get('/flights', (req, res) => {
    db.flights.findAll({
      include:
        [
          {
            model: db.airports,
            as: "fromApt",
            include :[{model: db.cities}]
          },
          {
            model: db.airports,
            as: "toApt",
            include :[{model: db.cities}]
          }
        ]
    })
      .then(flights => {
        res.json(flights);
      });
  });

  // GET one flight by id
  app.get('/flight/:id', (req, res) => {
    const id = req.params.id;
    db.flights.find({
      where: { id: id},
      include:
        {
          model: db.airports
        }

    })
      .then(flight => {
        res.json(flight);
      });
  });

  // POST single flight
  app.post('/flight', (req, res) => {
    const flight = req.body
    console.log(flight)
/*    db.flights.create({
      number: flight.number,
      from_airport: flight.from_airport,
      to_airport: flight.to_airport,
      departure: flight.departure,
      arrival: flight.arrival
    })
      .then(newflight => {
      res.json(newflight);
    });*/
  });

  // PATCH single flight
  app.patch('/flight/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.flights.find({
      where: { id: id }
    })
      .then(flight => {
        return flight.updateAttributes(updates);
      })
      .then(updatedflight => {
        res.json(updatedflight);
      });
  });

  app.delete('/flight/:id', (req, res) => {
    const id = req.params.id;
    db.flights.destroy({
      where: { id: id }
    })
      .then(deletedflight => {
        res.json(deletedflight);
      });
  });

};