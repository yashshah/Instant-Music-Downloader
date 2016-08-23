import { default as React, Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import YouTube from 'react-youtube';
import moment from 'moment';

let youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
const opts = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 1
  }
};
export class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null,
      query: this.props.query,
      title: "Title will go here...",
      currentTime: '00: 00',
      duration: '00: 00',
      player: null,
      isPlaying: false,
    };
    this.onReady = this.onReady.bind(this);
    this.handleVideoControl = this.handleVideoControl.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let self = this;
    if (nextProps.query !== this.state.query)
      this.setState({
        query: nextProps.query
      }, function () {
        self.playMusic();
      });
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
  }

  handleVideoControl() {
    let currentValue = this.state.isPlaying;
    this.setState({
      isPlaying: !currentValue
    });
    if (currentValue) {
      this.state.player.pauseVideo();
    } else {
      this.state.player.playVideo();
    }
  }


  playMusic(relatedRecommendation = false) {
    let self = this;
    if (!relatedRecommendation)
      config.q = this.state.query;
    else
      config.relatedToVideoId = this.state.id;
    axios({
      url: youtubeURL,
      method: 'get',
      params: config
    })
      .then(function (response) {
        if (!response.data || !response.data.items || response.data.items.length === 0) {
          console.log("No Results found");
        } else {
          self.setState({
            title: response.data.items[0].snippet.title,
            videoId: response.data.items[0].id.videoId
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setPlayerTitle(title, videoId) {

  formatTime(timeInS) {
    return moment.utc(timeInS * 1000).format('mm:ss');
  }
  render() {
    let downloadLink = `http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=${this.state.videoId}`;
    let downloadButton = <a href={downloadLink} className='download-link icon-arrow-down'>Download</a>;
    return (
      <div className="player">
        <a className={this.state.isPlaying ? 'btn icon-pause' : 'btn icon-play'} onClick={this.handleVideoControl} ></a>
        <div className="player-title">{downloadButton}  {this.state.title}</div>
        <div id="progress" onMouseUp={this.handleVideoSeek}>
          <div className="progress-bar"></div>
        </div>
        <div className="time">
          <span>{this.state.currentTime}</span>/<span>{this.state.duration}</span>
        </div>
        <YouTube
          videoId={this.state.videoId}
          opts={opts}
          onReady={this.onReady}
          className="youtube-player"
          />
      </div>
    );
  }
}
