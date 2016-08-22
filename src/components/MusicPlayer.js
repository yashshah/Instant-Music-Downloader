import { default as React, Component } from 'react';


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