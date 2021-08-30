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
      jaarOfMaandenSelect: null,
      dates: []
    }
    this.onClickHow = this.onClickHow.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
    this.onClickHowToGo = this.onClickHowToGo.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.chartClick = this.chartClick.bind(this);
    this.jaarOfMaanden = this.jaarOfMaanden.bind(this);
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

      this.setState({chart: true});
      const invoer = event.target.value; 
      this.setState({input: invoer});
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
        const invoer = document.querySelector('input').value;
        this.setState({input: invoer});
        //Zodra het element op de DOM is ingeladen kan je het oppakken met javascript
        document.querySelector('input').value = '';
      }
      else {
          this.setState({chartUpdate: this.state.chartUpdate + 1});
          const invoer = document.querySelector('input').value;
          this.setState({input: invoer});
          document.querySelector('input').value = '';
    }
  }

  jaarOfMaanden(e) {
    if(e.target.value === 'jaar') {
      this.setState({jaarOfMaandenSelect: true});
        var dateStart = new Date();
        dateStart.setDate(dateStart.getDate() - 365);
        var today = dateStart.getDay();
        if(today !== 0) {
          switch(today) {
            case 1:
              dateStart.setDate(dateStart.getDate() + 6);
              break;
              case 2:
                dateStart.setDate(dateStart.getDate() + 5);
              break;
              case 3:
                dateStart.setDate(dateStart.getDate() + 4);
              break;
              case 4:
                dateStart.setDate(dateStart.getDate() + 3);
              break;
              case 5:
                dateStart.setDate(dateStart.getDate() + 2);
              break;
              case 6:
                dateStart.setDate(dateStart.getDate() + 1);
              break;
          }
        }

        const googleStartDate = dateStart.toISOString().split('T')[0];
        console.log(googleStartDate);
        const knmiStartDate = googleStartDate.replace(/-/g, '');
        
        var dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDate() - 4);
        const googleEndDate = dateEnd.toISOString().split('T')[0];
        const knmiEndDate = googleEndDate.replace(/-/g, '');
        this.setState({dates: [googleStartDate, knmiStartDate, googleEndDate, knmiEndDate]});
    }
    else {
      this.setState({jaarOfMaandenSelect: false});
      var dateStart90 = new Date();
      dateStart90.setDate(dateStart90.getDate() - 90);
      const googleStartDate = dateStart90.toISOString().split('T')[0];
      const knmiStartDate = googleStartDate.replace(/-/g, '');
      var dateEnd90 = new Date();
      dateEnd90.setDate(dateEnd90.getDate() - 4);
      const googleEndDate = dateEnd90.toISOString().split('T')[0];
      const knmiEndDate = googleEndDate.replace(/-/g, '');
      this.setState({dates: [googleStartDate, knmiStartDate, googleEndDate, knmiEndDate]});
    }
  }
  

  render(){
    return (
    <div>
    {this.state.clickHow || this.state.clickGo ? null : <Introduction onClickHow={this.onClickHow} onClickGo={this.onClickGo}/>}
    {this.state.clickHow && this.state.clickHowToGo === false ? <HowItWorks onClickHowToGo={this.onClickHowToGo}/> : null}
    {this.state.clickGo || this.state.clickHowToGo ? <Product jaarOfMaanden={this.jaarOfMaanden} chartClick={this.chartClick} input={this.state.input} keyUpHandler={this.onKeyUp}/> : null}
    {this.state.chart ? <ChartComponent dates={this.state.dates} selectOptions={this.state.jaarOfMaandenSelect} chartUpdate={this.state.chartUpdate} input={this.state.input} /> : null}
    </div>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Stateful />
  </React.StrictMode>,
  document.getElementById('root')
);
