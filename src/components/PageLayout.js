import { default as React, Component } from 'react';
import {SearchBox} from './SearchBox';

export class PageLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container container-table">
        <div className="row vertical-center-row">
          <h2 className="white-text center">Play any song instantly</h2>
          <SearchBox />
        </div>
      </div>
    );
  }
}
