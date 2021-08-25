import React from 'react';
import './howItWorks.css';

export default class HowItWorks extends React.Component {
    render() {
        return (
            <div className="howItWorks">
                <h1>Hoe het werkt</h1>
                <p>Door online zoekvolume uit Google met weerdata van het KNMI te combineren krijg je inzicht in:</p>
                <ul>
                    <li>Optimale verkoopmomenten door het jaar heen</li>
                    <li>Of warme/koude dagen jouw online verkoop kunnen beïnvloeden</li>
                    <li>De producten die het meest worden beïnvloed door het weer</li>
                </ul>
                <button className="button" onClick={this.props.onClickHowToGo}>aan de slag!</button>
            </div>
        )
    }
}