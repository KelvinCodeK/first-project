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
          
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:9000/testAPI/trends', true);
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
          xhr.open('GET', 'http://localhost:9000/testAPI/?url=https://www.daggegevens.knmi.nl/klimatologie/daggegevens/?stns=260', true);
          xhr.send();
        });

        Promise.all([theFirstPromise, theSecondPromise]).then((values) => {
          console.log(values);
          // Google data
       
    document.querySelector('canvas').style.display = 'initial';



    const Chart = window.Chart;
    const januariZoekvolume = 90;
    const labelData = [];
    for(let i = 0; i < 89; i++) {
      labelData.push(i + 1)
    }

    this.reactChart = new Chart("myChart", {
        type: 'line',
        data: {
          labels: labelData,
          datasets: [{
            label: 'Zoekvolume (0% - 100%)',
            yAxisID: 'A',
            data: [januariZoekvolume, 70, 60, 76, 10,20,30,40,55,40,30,20],
            borderColor: 'black',
            borderWidth: 3,
            fill: false,
          }, {
            label: 'Temperatuur',
            yAxisID: 'B',
            data: [1,2,3,4,5,6,7,-8,-5,-10,11,12],
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
    