import React from 'react';
import './product.css';

export default class Product extends React.Component {
    render() {
        return (
            <div className="product">
                <header>
                    <h1>Weather To Sell</h1>
                    {/* p verzet naar header */}
                    <p>{this.props.Language === 'dutch' ? 'Kies een periode en vul het product óf de productcategorie in, waarover jij meer te weten wil komen.'
                        : 'Please note that the search data is based on The Netherlands. You will get the best results'}</p>
                </header>
                <main>
                    <section className="zoekVak">
                        
                        <div className="search">
                        <select onChange={this.props.jaarOfMaanden}>
                            <option>{this.props.Language === 'dutch' ? 'Periode' : 'Date'}</option>
                            <option value="jaar">{this.props.Language === 'dutch' ? 'Afgelopen jaar' : 'Past year'}</option>
                            <option value="90">{this.props.Language === 'dutch' ? 'Afgelopen drie maanden' : 'Past three months'}</option>
                        </select>
                        <div className="inputVak">
                        <input placeholder={this.props.Language === 'dutch' ? "zoek naar een product" : 'Search a product'} onKeyUp={this.props.keyUpHandler} type="text"></input>  
                        <button onClick={this.props.chartClick}></button>  
                        </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}