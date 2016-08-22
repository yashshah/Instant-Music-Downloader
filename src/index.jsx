import { default as React, Component } from 'react';
import { render } from 'react-dom';
import {PageLayout} from './components/PageLayout';
import './styles/index.css';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return (
      <div className="background">
        <PageLayout />
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
