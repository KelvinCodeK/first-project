import './Introduction.css';
import React from 'react';

export default class Introduction extends React.Component {

  render() {
  return (
    <div className="welcome">
      <header>
        <h1>Weather To Sell</h1>
        <p>{this.props.Language === 'dutch'
         ? 'Bepaal jouw optimale verkoopmomenten'
          : 'Optimize your (online) sales strategy'}</p>
        
      </header>
      <section className="buttons">
      <button className="button" onClick={this.props.onClickHow}>{this.props.Language === 'dutch'
       ? 'hoe werkt het?'
        : 'How it works'}</button>
      <button className="button" onClick={this.props.onClickGo}>{this.props.Language === 'dutch'
       ? 'aan de slag!'
        : 'try it out!'}</button>
      </section>
    </div>
  );}
}