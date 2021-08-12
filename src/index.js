import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './norm.css'
import Introduction from './Introduction';

// houdt de standaard structuur aan. Als dingen gebeuren zet je pas je de state aan en en stuur je de nieuwe state door met props
// conditionele opdrachten zijn belangrijk ? :
// debug de state door in Components weergave naar de stateful component te gaan

class Stateful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styling: {},
      styling2: {}
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
  }

  mouseOverHandler(e) {
    e.target.className === 'buttonEen' ?
    this.setState({styling: {
      background: 'linear-gradient(210deg, #f00 0%, #e619e6 25%, #8000ff 50%, #0080ff 75%, #00eaff 100%)'
    }}) 
    :
      this.setState({styling2: {
        background: 'linear-gradient(210deg, #f00 0%, #e619e6 25%, #8000ff 50%, #0080ff 75%, #00eaff 100%)'
    }})
  }

  mouseOutHandler(e) {
    e.target.className === 'buttonEen' ?
    this.setState({styling: {
      color: 'linear-gradient(210deg, #00eaff 0%, #0080ff 25%, #8000ff 50%, #e619e6 75%, #f00 100%)'
    }}) 
    :
    this.setState({styling2: {
      background: 'linear-gradient(210deg, #00eaff 0%, #0080ff 25%, #8000ff 50%, #e619e6 75%, #f00 100%)'
    }})
  }

  render(){
    return <Introduction styling={this.state.styling} styling2={this.state.styling2} handler={this.mouseOverHandler} handlerOut={this.mouseOutHandler} />
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Stateful />
  </React.StrictMode>,
  document.getElementById('root')
);
