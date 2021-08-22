import React from 'react';
import './chart.css';

   export default class ChartComponent extends React.Component {
    componentDidMount() {
        const Chart = window.Chart;
        const januariZoekvolume = 90;
        new Chart("myChart", {
            type: 'line',
            data: {
              labels: ['januari', 'februari', 'maart', 'april', 'mei','juni','juli', 'augustus', 'september', 'oktober', 'november','december'],
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
          
        }

        render() {
            return (
            <div>
                <section className="grafiek">
                    <div>
                    <canvas id="myChart" ></canvas>
                    </div>
                </section>
                <section className="analyse">
                    <p>Uitleg</p>
                </section>
            </div>
            )
        }

   }
    