import { default as React, Component } from 'react';
import {SearchBox} from './SearchBox';
import {MusicPlayer} from './MusicPlayer';

export class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(searchInput){
    this.setState({
      query: searchInput
    });
  }
  render() {
    return (
      <div className="container container-table">
        <div className="row vertical-center-row">
          <h2 className="white-text center">Play any song instantly</h2>
          <div className="col s12 m10 l8 offset-m1 offset-l2">
            <SearchBox onChange={this.handleChange} />
          </div>
          <div className="col s12 m10 l8 offset-m1 offset-l2">          
            <MusicPlayer query={this.state.query} />
          </div>            
        </div>
      </div>
    );
  }
}
