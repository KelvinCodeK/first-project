import React from 'react';
import './product.css';

export default class Product extends React.Component {
    render() {
        return (
            <div className="product">
                <header>
                    <h1 className="hMarge">Weather To Sell</h1>
                    <p>{this.props.Language === 'dutch'
                         ? 'Kies een periode en vul het product óf de productcategorie in, waarover jij meer te weten wil komen.'
                          : 'Please note that the search data is based on The Netherlands. You will get the best results by using Dutch search terms.'}</p>
                </header>
                <main>
                    <section className="zoekVak">
                        <div className="search">
                        <select onChange={this.props.jaarOfMaanden}>
                            <option>{this.props.Language === 'dutch'
                             ? 'Periode'
                              : 'Date range'}</option>
                            <option value="jaar">{this.props.Language === 'dutch'
                             ? 'Afgelopen jaar'
                              : 'Past year'}</option>
                            <option value="90">{this.props.Language === 'dutch'
                             ? 'Afgelopen drie maanden'
                              : 'Past three months'}</option>
                        </select>
                        <div className="inputVak">
                        <input placeholder={this.props.Language === 'dutch'
                         ? 'zoek naar een product'
                          : 'Search for a product'} onKeyUp={this.props.keyUpHandler} type="text"></input>  
                        <button onClick={this.props.chartClick}></button>  
                        </div>
                        </div>
                    </section>
                    <div style={{width: '100%', height: '2em', position: 'absolute', top: '60vh', zIndex: '1'}}>{this.props.isLoading
                     ? <p style={{textShadow: '2px 2px black', margin: '0px'}}>
                         {this.props.Language === 'dutch' ? 'Laden...' : 'Loading...'}</p>
                      : null}</div>
                </main>
            </div>
        )
    }
}