import './Introduction.css';
import React from 'react';

export default class Introduction extends React.Component {

  render() {
  return (
    <div className="welcome">
      <header>
        <h1>Weather To Sell</h1>
        <p>{this.props.Language === 'dutch'
         ? 'Bepaal jouw optimale verkoopmomenten aan de hand van het weer'
          : 'Optimize your (online) sales strategy by analyzing the weather'}</p>
        
      </header>
      <section className="buttons">
      <button className="button" onClick={this.props.onClickHow}>{this.props.Language === 'dutch'
       ? 'hoe werkt het?'
        : 'how it works'}</button>
      <button className="button" onClick={this.props.onClickGo}>{this.props.Language === 'dutch'
       ? 'aan de slag!'
        : 'try it out!'}</button>
      </section>
      {this.props.Language === 'dutch' ? 
                <p className="credit"> Foto: <a href="https://www.flickr.com/photos/garyullah/">Gary Campbell-Hall</a></p> 
                : <p className="credit"> Photo: <a href="https://www.flickr.com/photos/garyullah/">Gary Campbell-Hall</a></p>}
    </div>
  );}
}