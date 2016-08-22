import { default as React, Component } from 'react';

export class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit(event) {
    console.log("Inside the Submit");
    event.preventDefault();
  }
  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value
    });
    this.props.onChange(event.target.value);
  }
  render() {
    return (
      <div className="search">
        <div className="search-wrapper card">
          <form id="search-form" onSubmit={this.handleSubmit}>
            <input
              id="search-input"
              type="text"
              placeholder="Enter a song name, lyrics, artists.. anything!"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              />
          </form>
        </div>
      </div>
    );
  }
}
