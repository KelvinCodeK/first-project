import React from 'react';
import './chart.css';

   export default class ChartComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        apiResponseGoogle: null,
        apiResponseKNMI: null
      }
    }

    componentDidMount() {
      
    if (this.props.chartUpdate === 0) {

        const theFirstPromise = new Promise((resolve, reject) => {
              const zoekwoord = this.props.input;
          
                var xhr = new XMLHttpRequest();
                xhr.open('GET', `http://localhost:9000/testAPI/trends/${zoekwoord}/${this.props.selectOptions}/`, true);
                //onload, ik stuur alleen een 200 terug vanaf de proxy server.
                xhr.onload = () => {
                  if(xhr.status === 200) {
                    resolve(xhr.responseText);
                } 
                else{
                  reject('failed request');
                }
              }
              
              xhr.send();   
                
        });

        const theSecondPromise = new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              resolve(xhr.responseText);
          } 
          else{
            reject('failed request');
          }
        }
          xhr.open('GET', `http://localhost:9000/testAPI/weer/${this.props.selectOptions}/?url=https://www.daggegevens.knmi.nl/klimatologie/daggegevens/?stns=260`, true);
          xhr.send();
        });

        Promise.all([theFirstPromise, theSecondPromise]).then((values) => {

         

          // 90 dagen
          // KNMI data
          const knmiData = values[1];
          const knmiParsed = JSON.parse(knmiData);
          const weatherData = [];
          for(let i = 0; i < knmiParsed.length; i++) {
            let weather = knmiParsed[i].TG;
            weatherData.push(Number(weather) / 10);
          }

         // jaar
          var arrSplice = [];
          var averages = [];
          if(this.props.jaarOfMaanden === true) {
            for (let i = 0; weatherData.length > 0; i++) {
              arrSplice.push(weatherData.splice(0, 7));
              averages[i] = Math.floor(arrSplice[i].reduce((a, b) => {
              return a + b;
            })/7);
            }
          }
          

          
          // Google data
          const googleData = values[0];
          const googleParsed = JSON.parse(googleData);
          const googleDataArray = googleParsed.default.timelineData;
          const timeData = [];
          for(let i = 0; i < googleDataArray.length; i++) {
            let timeFormat = googleDataArray[i].formattedTime;
            timeData.push(timeFormat);
          }


          const trendsData = [];
          for(let i = 0; i < googleDataArray.length; i++) {
            let trends = Number(googleDataArray[i].value);
            trendsData.push(trends);
          }
          
          

    document.querySelector('canvas').style.display = 'initial';

    const Chart = window.Chart;

    
    this.reactChart = new Chart("myChart", {
        type: 'line',
        data: {
          labels: timeData,
          datasets: [{
            label: 'Zoekvolume (0% - 100%)',
            yAxisID: 'A',
            data: trendsData,
            borderColor: 'black',
            borderWidth: 3,
            fill: false,
          }, {
            label: 'Temperatuur',
            yAxisID: 'B',
            data: this.props.jaarOfMaandenSelect ? averages : weatherData,
            borderColor: 'white',
            borderWidth: 3,
            fill: false,
          }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
          legend: {
            labels: {
                fontColor: 'white',
                fontSize: 14
            }
        },
          title: {
            display: true,
            text: `Online zoekvolume voor ${this.props.input}`,
            fontColor: 'white',
            fontSize: 25
          },
          scales: { 
            xAxes: [{                 
              ticks: {                    
                  fontColor: "white",
                  fontSize: 14,   
              }
          }],
            yAxes: 
            [{
              id: 'A', 
              type: 'linear',
              position: 'left',                              
              font: 'Arial',
              scaleLabel: {
                display: true,
                labelString: 'Zoekvolume',
                fontColor: 'black',
                fontSize: 18
              },  
              ticks: {                   
                fontColor: "black",
                fontSize: 13,                   
                max: 100,
                min: 0 },         
              }, 
              {
              id: 'B',
              type: 'linear',
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: 'Temperatuur',
                fontColor: 'white',
                fontSize: 18
              },
              gridLines: {
                display: false,
              },
              ticks: {
                max: 40,
                min: -10,
                fontColor: "white",
                fontSize: 13,
              },                                   
            }]                
          }
        }
      });


        });    
    }

    }

    componentDidUpdate(prevProps) {
  
          if (prevProps.chartUpdate !== this.props.chartUpdate) {
           
            this.reactChart.options.title.text = `Online zoekvolume voor ${this.props.input}`; 
            this.reactChart.data.labels.pop();
            this.reactChart.data.datasets.forEach((dataset) => {
                  dataset.data.pop();
              });
              this.reactChart.update(); 
          }
        }

        render() {
            return (
            <div>
                <section className="grafiek">
                    <div>
                    <canvas id="myChart" style={{display: 'none'}}></canvas>
                    </div>
                </section>
                <section className="analyse">
                    <p></p>
                </section>
            </div>
            )
        }

   }
    