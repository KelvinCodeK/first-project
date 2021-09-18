import React from 'react';
import './howItWorks.css';

export default class HowItWorks extends React.Component {
    render() {
        return (
            <div className="howItWorks">
                <h1 className="hMarge">{this.props.Language === 'dutch' ? 'Hoe het werkt' : 'How it works'}</h1>
                {this.props.Language === 'dutch' ? 
                <p> Door online zoekvolume uit <a href="https://trends.google.nl/trends/?geo=NL">Google Trends</a> met weerdata van het <a href="https://www.knmi.nl/nederland-nu/klimatologie/daggegevens">KNMI</a> te combineren krijg je inzicht in:</p> 
                : <p> By combining online search data from <a href="https://trends.google.nl/trends/?geo=NL">Google Trends</a> with weatherdata from the <a href="https://www.knmi.nl/nederland-nu/klimatologie/daggegevens">KNMI</a> you can determine:</p>}
                
                <ul className="ulHow">
                    <li className="liHow">{this.props.Language === 'dutch' ? 'Optimale verkoopmomenten door het jaar heen' : 'Optimal moments to sell throughout the year'}</li>
                    <li className="liHow">{this.props.Language === 'dutch' ? 'Of warme/koude dagen jouw online verkoop kunnen beïnvloeden' : 'Whether warm/cold days influence your online sales'}</li>
                    <li className="liHow">{this.props.Language === 'dutch' ? 'De producten die het meest worden beïnvloed door het weer' : 'Which products are most affected by the weather'}</li>
                </ul>
                <button className="button" onClick={this.props.onClickHowToGo}>{this.props.Language === 'dutch' ? 'aan de slag!' : 'try it out!'}</button>
            </div>
        )
    }
}