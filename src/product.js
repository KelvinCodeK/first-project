import React from 'react';
import './product.css';
//Voeg hier ook nog een kleine hoe werkt het knop toe 


export default class Product extends React.Component {
     //Voeg een if toe die kijkt of Chart bestaat. Zo niet. Laadt de content dan in vanuit een local copy van alles wat in de chart Chart.js file staat.
    // Bij CDN's zijn er meerdere versies beschikbaar. Dit is een verouderde versie omdat die van W3C komt. Daardoor is een gridLines bijv. grid geworden in de nieuwe.
    // ALLES MET BETREKKING TOT DE GRAFIEK LOSKOPPELEN NAAR APARTE COMPONENT. DAN KAN JE NA EEN STATE CHANGE HEM INLADEN MET DE JUISTE PROPS.
    render() {
        return (
            <div>
                <header>
                    <h1>Weather To Sell</h1>
                </header>
                <main>
                    <section className="zoekVak">
                    
                        <p>Kies een periode en vul het product óf de productcategorie in waarover jij meer te weten wil komen</p>
                        {/* input op enter afvuren en een button om te zoeken*/}
                        <div className="search">
                        <select onChange={this.props.jaarOfMaanden}>
                            <option>Periode</option>
                            <option value="jaar">jaar</option>
                            <option value="90">90</option>
                        </select>
                        
                        <input placeholder="zoek naar een product"onKeyUp={this.props.keyUpHandler} type="text"></input>  
                        <button onClick={this.props.chartClick}></button>  
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}