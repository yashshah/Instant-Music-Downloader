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
      title: "Buffering the video...",
      currentTime: '--:--',
      duration: '--:--',
      player: null,
      isPlaying: false,
      progress: 0,
    };
    this.onReady = this.onReady.bind(this);
    this.handleVideoControl = this.handleVideoControl.bind(this);
    this.handleVideoSeek = this.handleVideoSeek.bind(this);
    this.handleVideoStatusChange = this.handleVideoStatusChange.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let self = this;
    if (nextProps.query !== this.state.query) {
      this.setState({
        query: nextProps.query
      }, function () {
        self.playMusic();
      });
    }
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
      clearInterval(this.interval)
    } else {
      this.state.player.playVideo();
      this.iterval = setInterval(this.updateTime, 1000);
    }
  }

  handleVideoSeek(event) {
    let percentage = (event.clientX - this.refs.progress.getBoundingClientRect().left) / this.refs.progress.offsetWidth;
    this.state.player.seekTo(this.state.player.getDuration() * percentage);
  }

  playMusic(relatedRecommendation = false) {
    let self = this;
    let params = Object.assign({}, config);
    if (!relatedRecommendation)
      params.q = this.state.query;
    else
      params.relatedToVideoId = this.state.videoId;
    axios({
      url: youtubeURL,
      method: 'get',
      params: params
    })
      .then(function (response) {
        if (!response.data || !response.data.items || response.data.items.length === 0) {
          console.log("No Results found");
        } else {
          self.setState({
            title: response.data.items[0].snippet.title,
            videoId: response.data.items[0].id.videoId,
            isPlaying: true
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleVideoStatusChange(event) {
    let self = this;
    if (event.data === 1) {
      let duration = this.state.player.getDuration();
      this.setState({
        duration: self.formatTime(duration)
      });
      self.iterval = setInterval(self.updateTime, 1000);
    }
    else if (event.data === 0) {
      this.playMusic(true);
    }
  }

  updateTime() {
    let self = this;
    let currentTime = this.state.player.getCurrentTime();
    let duration = this.state.player.getDuration();
    this.setState({
      currentTime: self.formatTime(currentTime),
      progress: (currentTime / duration) * 100,
    });
  }

  formatTime(timeInS) {
    return moment.utc(timeInS * 1000).format('mm:ss');
  }

  render() {
    let downloadButton = '';
    if (this.state.videoId) {
      let downloadLink = `http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=${this.state.videoId}&autostart=1`;
      downloadButton = <a href={downloadLink} className='download-link icon-arrow-down'>Download</a>;
    }
    let widthPercentage = `${this.state.progress}%`;
    let progressWidth = {
      width: widthPercentage
    };
    return (
      <div className="player">
        <a
          className={this.state.isPlaying ? 'btn icon-pause' : 'btn icon-play'}
          onClick={this.handleVideoControl}
          />
        <div className="player-title">{downloadButton}  {this.state.title}</div>
        <div id="progress" onMouseUp={this.handleVideoSeek} ref="progress">
          <div className="progress-bar" style={progressWidth} />
        </div>
        <div className="time">
          <span>{this.state.currentTime}</span>/<span>{this.state.duration}</span>
        </div>
        <YouTube
          videoId={this.state.videoId}
          opts={opts}
          onStateChange={this.handleVideoStatusChange}
          onReady={this.onReady}
          className="youtube-player"
          />
      </div>
    );
  }
}
