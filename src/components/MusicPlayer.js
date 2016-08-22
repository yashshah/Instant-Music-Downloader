import { default as React, Component } from 'react';
import axios from 'axios';
import config from '../config.js';

let youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

export class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      query: "Ik Kudi",
      title: "Title will go here...",
      currentTime: '00: 00',
      duration: '00: 00',

    };
  }

  componentDidMount() {
    let self = this;
    config.q = this.state.query;
    axios({
      url: youtubeURL,
      method: 'get',
      params: config
    })
    .then(function (response) {
      if (!response.data || !response.data.items || response.data.items.length === 0) {
        console.log("no results while searching for: '" + config.q + "'.");
      } else {
        self.setPlayerTitle(response.data.items[0].snippet.title, response.data.items[0].id.videoId);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  setPlayerTitle(title, videoId) {
    let downloadLink = `http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=${videoId}`;
    let downloadButton = <a href={downloadLink} className='download-link icon-arrow-down'>Download</a>;
    this.setState({
      title: downloadButton + title
    });
  }
  render() {
    return (
      <div id="player">
        <a id="play" className="btn icon-play"></a>
        <a id="pause" className="btn icon-pause"></a>
        <div id="player-title">{this.state.title}</div>
        <div id="progress">
          <div id="progress-bar"></div>
        </div>
        <div id="time">
          <span id="current-time">{this.state.currentTime}</span>/<span id="duration">{this.state.duration}</span>
        </div>
      </div>
    );
  }
}