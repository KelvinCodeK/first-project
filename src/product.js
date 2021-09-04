import React from 'react';
import './product.css';

export default class Product extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>Weather To Sell</h1>
                </header>
                <main>
                    <section className="zoekVak">
                        <p>Kies een periode en vul het product óf de productcategorie in waarover jij meer te weten wil komen</p>
                        <div className="search">
                        <select onChange={this.props.jaarOfMaanden}>
                            <option>Periode</option>
                            <option value="jaar">Afgelopen jaar</option>
                            <option value="90">Afgelopen drie maanden</option>
                        </select>
                        <div className="inputVak">
                        <input placeholder="zoek naar een product"onKeyUp={this.props.keyUpHandler} type="text"></input>  
                        <button onClick={this.props.chartClick}></button>  
                        </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}