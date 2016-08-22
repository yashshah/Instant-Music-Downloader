import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { render } from 'react-dom';
import {HomePage} from './components/HomePage'
import {CounterButton} from './components/CounterButton'

class App extends React.Component {
  render() {
    return(
      <div>
        <HomePage />
        <CounterButton / >
      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"));
