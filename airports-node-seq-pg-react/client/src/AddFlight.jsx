import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'


class CommentForm extends Component {
  state = {
    airports:[],
    name: "",
    from_airport: -1,
    to_airport: -1,
    departure: "",
    arrival: ""
  };
 // let handleInputChange = handleInputChange.bind(this);

  componentWillMount(){
      $.getJSON('airports',(airports) => {
        this.setState({
          airports
        })
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(name + " " + value)
  }

  handleSubmit(e){
    e.preventDefault() 
    let newFlight = {
      number: this.state.number,
      from_airport: parseInt(this.state.from_airport,10),
      to_airport: parseInt(this.state.to_airport,10),
      departure: Date.parse(this.state.departure),
      arrival: Date.parse(this.state.arrival)
    }
    this.props.addFlight(newFlight)
  }

  render() {

    return (

      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
            <label>Nom du vol</label>
            <input type="text" name="number" onChange={this.handleInputChange.bind(this)} />
        </div>
        <div>
            <label>Aéroport de départ</label>
            <select name="from_airport" onChange={this.handleInputChange.bind(this)}>
              {this.state.airports.map(airport => {
                return <option key={airport.id} value={airport.id}>{airport.name}</option>
              })}
            </select>
        </div>
        <div>
            <label>Aéroport d'arrivée</label>
            <select name="to_airport" onChange={this.handleInputChange.bind(this)}>
              {this.state.airports.map(airport => {
                return <option key={airport.id} value={airport.id}>{airport.name}</option>
              })}
            </select>
        </div>
        <div>
            <label>Date de départ</label>
            <input type="text" name="departure" onChange={this.handleInputChange.bind(this)} />
        </div>
        <div>
            <label>Date d'arrivée</label>
            <input type="text" name="arrival" onChange={this.handleInputChange.bind(this)} />
        </div>
        <button>Envoyer</button>
      </form>
    );
  }
}

export default CommentForm;

