import React from 'react';
import './product.css';
//Voeg hier ook nog een kleine hoe werkt het knop toe 


export default class Product extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>Weather To Sell</h1>
                </header>
                <main>
                    <section className="zoekVak">
                        <p>Vul hier onder het product in waarvan jij meer te weten wil komen</p>
                        {/* input op enter afvuren en een button om te zoeken*/}
                        <input onKeyUp={this.props.keyUpHandler} type="text"></input>
                    </section>
                    <section className="grafiek">
                        <div></div>
                    </section>
                    <section className="analyse">
                        <p>Uitleg</p>
                    </section>
                </main>
            </div>
        )
    }
}