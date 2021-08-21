import React from 'react';
import './product.css';
//Voeg hier ook nog een kleine hoe werkt het knop toe 


export default class Product extends React.Component {
    componentDidMount() {
        //Voeg een if toe die kijkt of Chart bestaat. Zo niet. Laadt de content dan in vanuit een local copy van alles wat in de chart Chart.js file staat.
        const Chart = window.Chart;
        const januariZoekvolume = 100;
        const chartObject = new Chart("myChart", {
            type: 'line',
            data: {
              labels: ['1', '2', '3', '4', '5','6','7', '8', '9', '10', '11','12'],
              datasets: [{
                label: 'Zoekvolume',
                yAxisID: 'A',
                data: [januariZoekvolume, 96, 84, 76, 10,20,30,40,55,40,30,20],
                borderColor: 'black',
                borderWidth: 3,
                fill: false,
                backgroundColor: '#00eaff',
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
              legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
              title: {
                display: true,
                text: 'Chart',
                fontColor: 'white',
                fontSize: 25
  
              },
              scales: {
                xAxes: [{
                  ticks: {
                      fontColor: "white",
                      fontSize: 13,
                      stepSize: 1,
                      beginAtZero: true
                  }
              }],
                yAxes: 
                [{
                  ticks: {
                    fontColor: "white",
                    fontSize: 13,
                    beginAtZero: true},
                  id: 'A',
                  type: 'linear',
                  position: 'left',
                  grid: {
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                    drawBorder: false // only want the grid lines for one axis to show up
                  },
                  
                  font: 'Arial'
                }, {
                  id: 'B',
                  type: 'linear',
                  position: 'right',
                  ticks: {
                    max: 32,
                    min: -10,
                    fontColor: "white",
                    fontSize: 13,
                  },
                 

                }]
                 
              }
            }
          });
          
          console.log(chartObject.height)
             
    }
    render() {
        return (
            <div>
                <header>
                    <h1>Weather To Sell</h1>
                </header>
                <main>
                    <section className="zoekVak">
                        <p>Vul het product in waarover jij meer te weten wil komen</p>
                        {/* input op enter afvuren en een button om te zoeken*/}
                        <input onKeyUp={this.props.keyUpHandler} type="text"></input>
                    </section>
                    <section className="grafiek">
                        <canvas id="myChart" style={{width:'100%', height: '500px'}}></canvas>
                    </section>
                    <section className="analyse">
                        <p>Uitleg</p>
                    </section>
                </main>
            </div>
        )
    }
}