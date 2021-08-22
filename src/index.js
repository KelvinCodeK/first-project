import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './norm.css'
import Introduction from './Introduction';
import HowItWorks from './howItWorks';
import Product from './product.js'
import ChartComponent from './chart.js'

// houdt de standaard structuur aan. Als dingen gebeuren zet je pas je de state aan en en stuur je de nieuwe state door met props
// conditionele opdrachten zijn belangrijk ? :
// debug de state door in Components weergave naar de stateful component te gaan
//verwijder alle onnodige uitleg uit de documenten in de app
// state logica kan in elkaar gaan overlopen. Stappen doorlopen om de juiste logica te vinden.

class Stateful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickHow: false,
      clickGo: false,
      clickHowToGo: false,
      input: '',
      chart: false
    }
    this.onClickHow = this.onClickHow.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
    this.onClickHowToGo = this.onClickHowToGo.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.chartClick = this.chartClick.bind(this);
  }

  onClickHow() {
    this.setState({clickHow: true});
  }
  onClickGo() {
    this.setState({clickGo: true});
    document.querySelector('body').style.border = 'none';
  }
  onClickHowToGo() {
    this.setState({clickHowToGo: true});
    document.querySelector('body').style.border = 'none';
  }
  onKeyUp(event) {
    const invoer = event.target.value;
    this.setState({input: invoer});

    if( this.state.chart === false) {
    if (event.keyCode === 13) {
      this.setState({chart: true});
      event.target.value = '';
    }
    }
    else {

      if (event.keyCode === 13) {
        
        this.forceUpdate();
      
      
      
    }
  }
  }
  chartClick() {
    this.setState({chart: true});
    //Zodra het element op de DOM is ingeladen kan je het oppakken met javascript
    document.querySelector('input').value = '';
  }

  

  render(){
    return (
    <div>
    {this.state.clickHow || this.state.clickGo ? null : <Introduction onClickHow={this.onClickHow} onClickGo={this.onClickGo}/>}
    {this.state.clickHow && this.state.clickHowToGo === false ? <HowItWorks onClickHowToGo={this.onClickHowToGo}/> : null}
    {this.state.clickGo || this.state.clickHowToGo ? <Product chartClick={this.chartClick} input={this.state.input} keyUpHandler={this.onKeyUp}/> : null}
    {this.state.chart ? <ChartComponent input={this.state.input} /> : null}
    </div>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Stateful />
  </React.StrictMode>,
  document.getElementById('root')
);
