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
      chart: false,
      chartUpdate: 0,
      apiResponse: null
    }
    this.onClickHow = this.onClickHow.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
    this.onClickHowToGo = this.onClickHowToGo.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.chartClick = this.chartClick.bind(this);
  }

  sendHttpRequest() {
    // Data range afgelopen jaar of past 90 days
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            this.setState({apiResponse: xhr.responseText});
        } 
      }
        xhr.open('GET', 'http://localhost:9000/testAPI', true);
        xhr.send();
}

  onClickHow() {
    this.setState({clickHow: true});
  }
  onClickGo() {
    this.setState({clickGo: true});
  }
  onClickHowToGo() {
    this.setState({clickHowToGo: true});
  }
  onKeyUp(event) {
    if( this.state.chart === false) {
    if (event.keyCode === 13) {
      const invoer = event.target.value;
      this.setState({input: invoer});
      this.sendHttpRequest();
      this.setState({chart: true});
      event.target.value = '';
      
    }
    }
    else {

      if (event.keyCode === 13) {
        this.setState({chartUpdate: this.state.chartUpdate + 1});
        const invoer = event.target.value;
      this.setState({input: invoer});
        event.target.value = ''; 
    }
  }
  }
  chartClick() {
    if( this.state.chart === false) {
        this.setState({chart: true});
        //Zodra het element op de DOM is ingeladen kan je het oppakken met javascript
        document.querySelector('input').value = '';
      }
      else {
          this.setState({chartUpdate: this.state.chartUpdate + 1});
          document.querySelector('input').value = '';
    }
  }
  

  render(){
    return (
    <div>
    {this.state.clickHow || this.state.clickGo ? null : <Introduction onClickHow={this.onClickHow} onClickGo={this.onClickGo}/>}
    {this.state.clickHow && this.state.clickHowToGo === false ? <HowItWorks onClickHowToGo={this.onClickHowToGo}/> : null}
    {this.state.clickGo || this.state.clickHowToGo ? <Product chartClick={this.chartClick} input={this.state.input} keyUpHandler={this.onKeyUp}/> : null}
    {this.state.chart ? <ChartComponent apiResponse={this.state.apiResponse} chartUpdate={this.state.chartUpdate} input={this.state.input} /> : null}
    </div>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Stateful />
  </React.StrictMode>,
  document.getElementById('root')
);
