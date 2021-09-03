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

      // GOOGLE TRENDS EN KNMI BIJ INTRO HREFS VAN MAKEN NAAR DE SITES
      // network error afhandelen als het netwerk niet live staat. er wordt geen status terug gestuurd. Misschien met een settimeout die checked of iets is gevuld na 5 secs en anders een alert geeft.

        const theFirstPromise = new Promise((resolve, reject) => {
              const zoekwoord = this.props.input;
              const googleStartDate = this.props.dates[0];
              const googleEndDate = this.props.dates[2];
          
                var xhr = new XMLHttpRequest();
                xhr.open('GET', `http://localhost:9000/testAPI/trends/${zoekwoord}/${googleStartDate}/${googleEndDate}`, true);
                //onload, ik stuur alleen een 200 terug vanaf de proxy server.
                xhr.onload = () => {
                  if(xhr.status === 200) {
                    this.props.isLoading();  
                    resolve(xhr.responseText);
                } 
               
                else{
                  reject('De server reageert niet');
                }
              }
              
              xhr.send(); 
              this.props.isLoading();  
                
        });

        const theSecondPromise = new Promise((resolve, reject) => {
          const knmiStartDate = this.props.dates[1];
          const knmiEndDate = this.props.dates[3];
          var xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              resolve(xhr.responseText);
          } 
          else{
            reject('De server reageert niet');
          }
        }
          xhr.open('GET', `http://localhost:9000/testAPI/weer/${knmiStartDate}/${knmiEndDate}/?url=https://www.daggegevens.knmi.nl/klimatologie/daggegevens/?stns=260`, true);
          xhr.send();
          console.log('err');
        });

        Promise.all([theFirstPromise, theSecondPromise]).then((values) => {
         
        
          if(values[0] === '{"default":{"timelineData":[],"averages":[]}}') {
           window.alert('De zoekterm heeft te weinig zoekvolume. Probeer iets anders');
           this.props.chartReset();
         }
         else {
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
          const weatherDataJaar = weatherData.slice(0, weatherData.length);
          console.log(weatherDataJaar);
          var arrSplice = [];
          var averages = [];
          if(this.props.selectOptions === true) {
            for (let i = 0; weatherDataJaar.length > 0; i++) {
              arrSplice.push(weatherDataJaar.splice(0, 7));
              
              averages.push(Math.floor(arrSplice[i].reduce((a, b) => {
              return a + b;
            })/arrSplice[i].length));
            
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

    const screenWidth = window.screen.width;

    const Chart = window.Chart;

    if(screenWidth >= 768) {

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
            data: this.props.selectOptions ? averages : weatherData,
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
                max: 30,
                min: -10,
                fontColor: "white",
                fontSize: 13,
              },                                   
            }]                
          }
        }
      });

    }

    if(screenWidth < 768) {
      this.reactChart = new Chart("myChart", {
        type: 'line',
        data: {
          labels: timeData,
          
          datasets: [{
            label: 'Zoekvolume (0% - 100%)',
            yAxisID: 'A',
            data: trendsData,
            borderColor: 'black',
            borderWidth: 1,
            fill: false
          }, {
            label: 'Temperatuur',
            yAxisID: 'B',
            data: this.props.selectOptions ? averages : weatherData,
            borderColor: 'white',
            borderWidth: 1,
            fill: false,
          }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 1
              }
            },
          legend: {
            labels: {
                fontColor: 'white',
                fontSize: 9
            }
        },
          title: {
            display: true,
            text: `Online zoekvolume voor ${this.props.input}`,
            fontColor: 'white',
            fontSize: 14
          },
          scales: { 
            xAxes: [{  
                             
              ticks: {                    
                  fontColor: "white",
                  fontSize: 9,   
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
                fontSize: 11
              },  
              ticks: {                   
                fontColor: "black",
                fontSize: 9,                   
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
                fontSize: 11
              },
              gridLines: {
                display: false,
              },
              
              ticks: {
                max: 30,
                min: -10,
                fontColor: "white",
                fontSize: 9,
              },                                   
            }]                
          }
        }
      });

    }
    
       } })   
    }
    }

    componentDidUpdate(prevProps) {
  
          if (prevProps.chartUpdate !== this.props.chartUpdate) {
            const theFirstPromise = new Promise((resolve, reject) => {
              const zoekwoord = this.props.input;
              const googleStartDate = this.props.dates[0];
              const googleEndDate = this.props.dates[2];
          
                var xhr = new XMLHttpRequest();
                xhr.open('GET', `http://localhost:9000/testAPI/trends/${zoekwoord}/${googleStartDate}/${googleEndDate}`, true);
                //onload, ik stuur alleen een 200 terug vanaf de proxy server.
                xhr.onload = () => {
                  if(xhr.status === 200) {
                    this.props.isLoading();  
                    resolve(xhr.responseText);
                } 
                else{
                  reject('De server reageert niet');
                }
              }
              
              xhr.send(); 
              this.props.isLoading();    
                
        });

        const theSecondPromise = new Promise((resolve, reject) => {
          const knmiStartDate = this.props.dates[1];
          const knmiEndDate = this.props.dates[3];
          var xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              resolve(xhr.responseText);
          } 
          else{
            reject('De server reageert niet');
          }
        }
          xhr.open('GET', `http://localhost:9000/testAPI/weer/${knmiStartDate}/${knmiEndDate}/?url=https://www.daggegevens.knmi.nl/klimatologie/daggegevens/?stns=260`, true);
          xhr.send();
        });

        Promise.all([theFirstPromise, theSecondPromise]).then((values) => {
          if(values[0] === '{"default":{"timelineData":[],"averages":[]}}') {
            window.alert('De zoekterm heeft te weinig zoekvolume. Probeer iets anders');
            this.props.chartReset();
          }
          else {
         

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
          const weatherDataJaar = weatherData.slice(0, weatherData.length);
          console.log(weatherDataJaar);
          var arrSplice = [];
          var averages = [];
          if(this.props.selectOptions === true) {
            for (let i = 0; weatherDataJaar.length > 0; i++) {
              arrSplice.push(weatherDataJaar.splice(0, 7));
              averages.push(Math.floor(arrSplice[i].reduce((a, b) => {
              return a + b;
            })/arrSplice[i].length));
            
            }
          }
          console.log(averages);

          
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
          this.reactChart.options.title.text = `Online zoekvolume voor ${this.props.input}`; 
            this.reactChart.data.labels = timeData;
            this.reactChart.data.datasets[0].data = trendsData;
            this.reactChart.data.datasets[1].data = this.props.selectOptions ? averages : weatherData;
            this.reactChart.update(); 
        }}) 
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

            </div>
            )
        }

   }
    