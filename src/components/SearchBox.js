import { default as React, Component } from 'react';

export class SearchBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col s12 m10 l8 offset-m1 offset-l2">
        <div className="search">
          <div className="search-wrapper card">
            <form id="search-form">
              <input id="search-input" type="text" placeholder="Enter a song name, lyrics, artists.. anything!" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
