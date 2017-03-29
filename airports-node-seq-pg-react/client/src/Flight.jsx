import React, { Component } from 'react';
import './App.css';

class Flight extends Component {

  render() {
    const{id,number,fromApt,toApt,departure,arrival} = this.props.flight
    return (
      <tr>
        <td>{id}</td>
        <td>{number}</td>
        <td>{fromApt.name} {fromApt.city.name}</td>
        <td>{toApt.name} {toApt.city.name}</td>
        <td>{departure}</td>
        <td>{arrival}</td>
      </tr>
    );
  }
}

export default Flight;
