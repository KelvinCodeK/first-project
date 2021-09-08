import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './norm.css'
import Introduction from './Introduction';
import HowItWorks from './howItWorks';
import Product from './product.js'
import ChartComponent from './chart.js'

class Stateful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: true,
      clickHow: false,
      extraHow: false,
      clickGo: false,
      clickHowToGo: false,
      input: '',
      chart: false,
      chartUpdate: 0,
      jaarOfMaandenSelect: null,
      dates: [],
      isLoading: false,
      language: 'dutch'
    }
    this.onClickHow = this.onClickHow.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
    this.onClickHowToGo = this.onClickHowToGo.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.chartClick = this.chartClick.bind(this);
    this.jaarOfMaanden = this.jaarOfMaanden.bind(this);
    this.chartReset = this.chartReset.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.language = this.language.bind(this);
  }

  onClickHow() {
    if(this.state.extraHow) {
      this.setState({clickGo: false});
      this.setState({clickHowToGo: false});
      this.setState({extraHow: false});
    }
    this.setState({intro: false});
    this.setState({clickHow: true});
  }

  onClickGo() {
    this.setState({intro: false});
    this.setState({clickGo: true});
    this.setState({extraHow: true});
  }

  onClickHowToGo() {
    this.setState({clickHow: false});
    this.setState({clickHowToGo: true});
    this.setState({extraHow: true});
  }

  onKeyUp(event) {
    const regex = /[a-z \s]+/ig;
    if( this.state.chart === false) {
    if (event.keyCode === 13) {
      this.setState({extraHow: false});
      if(this.state.jaarOfMaandenSelect !== null && event.target.value) {
        if(regex.test(event.target.value)){
          this.setState({extraHow: false});
          this.setState({chart: true});
          document.querySelector('.language').style.display = 'none';
          const invoer = event.target.value; 
          this.setState({input: invoer});
          event.target.value = '';
        }
        else{
          alert(this.state.language === 'dutch'
           ? 'Vul alleen letters en spaties in'
            : 'Only use letters or spaces in your search query');
          event.target.value = '';
        }
    }
    else {
      alert(this.state.language === 'dutch'
       ? 'Selecteer een periode én voer een zoekterm in'
        : 'Please select a date range and enter a search term');
    } 
  }
  }
    else {
      if (event.keyCode === 13) {
        if(this.state.jaarOfMaandenSelect !== null && event.target.value) {
        if(regex.test(event.target.value)){
        this.setState({chartUpdate: this.state.chartUpdate + 1});
        const invoer = event.target.value;
        this.setState({input: invoer});
        event.target.value = ''; 
          }
          else{
            alert(this.state.language === 'dutch'
             ? 'Vul alleen letters en spaties in'
              : 'Only use letters or spaces in your search query');
            event.target.value = '';
          }
      }
      else {
        alert(this.state.language === 'dutch'
         ? 'Selecteer een periode én voer een zoekterm in'
          : 'Please select a date range and enter a search term');
        
      }
    }
  }
  }

  chartClick() {
    const regex = /[a-z \s]+/ig;
    if( this.state.chart === false) {
      if(this.state.jaarOfMaandenSelect !== null && document.querySelector('input').value) {
        if(regex.test(document.querySelector('input').value)){
        this.setState({extraHow: false});
        this.setState({chart: true});
        document.querySelector('.language').style.display = 'none';
        const invoer = document.querySelector('input').value;
        this.setState({input: invoer});
        //Zodra het element op de DOM is ingeladen kan je het oppakken met javascript
        document.querySelector('input').value = '';
        }
        else{
          alert(this.state.language === 'dutch'
           ? 'Vul alleen letters en spaties in'
            : 'Only use letters or spaces in your search query');
          document.querySelector('input').value = ''; 
        }
      }
      else {
        alert(this.state.language === 'dutch'
         ? 'Selecteer een periode én voer een zoekterm in'
          : 'Please select a date range and enter a search term');
      }
    }
      else {
        if(this.state.jaarOfMaandenSelect !== null && document.querySelector('input').value) {
          if(regex.test(document.querySelector('input').value)){
          this.setState({chartUpdate: this.state.chartUpdate + 1});
          const invoer = document.querySelector('input').value;
          this.setState({input: invoer});
          document.querySelector('input').value = '';
          }
          else{
            alert(this.state.language === 'dutch'
             ? 'Vul alleen letters en spaties in'
              : 'Only use letters or spaces in your search query');
            document.querySelector('input').value = '';
          }
        }
        else {
          alert(this.state.language === 'dutch'
           ? 'Selecteer een periode én voer een zoekterm in'
            : 'Please select a date range and enter a search term');
        }
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

  chartReset() {
    this.setState({chart: false, chartUpdate: 0});
  }

  isLoading() {
    !this.state.isLoading ? this.setState({isLoading: true}) : this.setState({isLoading: false});
  }

  language() {
    this.state.language === 'dutch'
     ? this.setState({language: 'english'})
      : this.setState({language: 'dutch'});
  }

  render(){
    return (
    <div>
    <button className="language" onClick={this.language} >NL / ENG</button>
    {this.state.intro ? 
     <Introduction Language={this.state.language} onClickHow={this.onClickHow} onClickGo={this.onClickGo}/>
      : null}
    {this.state.clickHow ?
     <HowItWorks Language={this.state.language} onClickHowToGo={this.onClickHowToGo}/>
      : null}
    {this.state.clickGo || this.state.clickHowToGo
     ? <Product Language={this.state.language} jaarOfMaanden={this.jaarOfMaanden} chartClick={this.chartClick} input={this.state.input} keyUpHandler={this.onKeyUp}/>
      : null}
    <div style={{width: '100%', height: '2em'}}>{this.state.isLoading
     ? <p style={{textShadow: '2px 2px black', margin: '0px', zIndex: '1'}}>{this.state.language === 'dutch' ? 'Laden...' : 'Loading...'}</p>
      : null}</div>
    {this.state.extraHow
     ? <div style={{height: '10em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button className="button" onClick={this.onClickHow}>{this.state.language === 'dutch'
      ? 'hoe werkt het?'
       : 'How it works'}</button></div>
        : null}
    {this.state.chart
     ? <ChartComponent Language={this.state.language} isLoading={this.isLoading} chartReset={this.chartReset} dates={this.state.dates} selectOptions={this.state.jaarOfMaandenSelect} chartUpdate={this.state.chartUpdate} input={this.state.input} />
      : null}
    </div>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Stateful />
  </React.StrictMode>,
  document.getElementById('root')
);
