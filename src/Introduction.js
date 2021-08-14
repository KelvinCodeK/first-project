import './Introduction.css';
import React from 'react';

// Maak de intro niet noodzakelijk om doorheen te gaan.

export default class Introduction extends React.Component {

  render() {
  return (
      <header>
        <h1>Weather To Sell</h1>
        <p>Bepaal jouw optimale verkoopmomenten</p>
        <div className="buttons">
        <button className="buttonEen" onClick={this.props.onClickHow}>hoe werkt het?</button>
        <button className="buttonTwee" onClick={this.props.onClickGo}>aan de slag!</button>
        </div>
      </header>
  );}
}
