import React from 'react';
import './product.css';
//Voeg hier ook nog een kleine hoe werkt het knop toe 


export default class Product extends React.Component {
    componentDidMount() {
        const Chart = window.Chart;
        var xValues = [50,60,70,80,90,100,110,120,130,140,150];
        var yValues = [7,8,8,9,9,9,10,11,14,14,15];
        new Chart("myChart", {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
              }]
            },
            options: {
              legend: {display: false},
              scales: {
                yAxes: [{ticks: {min: 6, max:16}}],
              }
            }
          });
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
                        <canvas id="myChart" style={{width:'100%', maxWIdth:'600px'}}></canvas>
                    </section>
                    <section className="analyse">
                        <p>Uitleg</p>
                    </section>
                </main>
            </div>
        )
    }
}