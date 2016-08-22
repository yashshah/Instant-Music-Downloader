import { default as React, Component } from 'react';
import { render } from 'react-dom';

export class CounterButton extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      count: 0
    };
    this.updateCount = this.updateCount.bind(this);
  }
  updateCount() {
    let updatedCount = this.state.count + 1
    this.setState({
      count: updatedCount  
    });
  }
  render() {
    return(
      <div>
        <a className="btn btn-primary btn-lg" onClick={this.updateCount}>Update count!</a>
        <h5> Counter count: {this.state.count} </h5>
      </div>
    )
  }
}