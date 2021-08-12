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
        <button>hoe werkt het?</button>
        <button>aan de slag!</button>
        </div>
        <section className="intro">
        
        <ul>
            <li>Zoekvolume</li>
            <li>Het weer</li>             
        </ul>
        </section>
      </header>
  );}
}
