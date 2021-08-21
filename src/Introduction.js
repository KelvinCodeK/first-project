import './Introduction.css';
import React from 'react';

// Maak de intro niet noodzakelijk om doorheen te gaan.

export default class Introduction extends React.Component {

  render() {
  return (
      <header className="welcome">
        <h1>Weather To Sell</h1>
        <p>Bepaal jouw optimale verkoopmomenten</p>
        <section className="buttons">
        <button className="buttonEen" onClick={this.props.onClickHow}>hoe werkt het?</button>
        <button className="buttonTwee" onClick={this.props.onClickGo}>aan de slag!</button>
        </section>
      </header>
  );}
}