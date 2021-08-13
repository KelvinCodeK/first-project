import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './norm.css'
import Introduction from './Introduction';

// houdt de standaard structuur aan. Als dingen gebeuren zet je pas je de state aan en en stuur je de nieuwe state door met props
// conditionele opdrachten zijn belangrijk ? :
// debug de state door in Components weergave naar de stateful component te gaan

class Stateful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return <Introduction />
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Stateful />
  </React.StrictMode>,
  document.getElementById('root')
);
