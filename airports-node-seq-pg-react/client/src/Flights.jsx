import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import Flight from './Flight'
import AddFlight from './AddFlight'

class Flights extends Component {

    state = {
      flights: [],
    }

    componentWillMount() {
      this.getAllFlights()
    }

    getAllFlights(){
      $.getJSON('flights', (flights) => {
        this.setState({
          flights
        })
      })
    }

    handleAddFlight(flight) {
      $.ajax({
          url: 'flight',
          type: 'POST',
          data: flight,
          complete: this.getAllFlights()
      });
  }

  render() {
    return (
      <div className="Flights">
        <AddFlight addFlight={this.handleAddFlight.bind(this)} />
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>Numéro de vol</td>
              <td>Aéroport de départ</td>
              <td>Aéroport d'arrivée</td>
              <td>Date de départ</td>
              <td>Date d'arrivée</td>
            </tr>
          </thead>
          <tbody>
              {this.state.flights.map(flight => {
                return <Flight key={flight.id} flight={flight} />
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Flights;
