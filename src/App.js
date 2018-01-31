import React, {Component} from 'react';
import './App.css';
import ComponenteHeader from './components/header';
import 'jplayer'
import $ from 'jquery';
import Player from './page/palyer'
import {MUSIC_LIST} from './config/musiclist';
import MusicList from './page/musiclist';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Pubsub from 'pubsub-js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
  }
  playMusic(musicItem) {
    $('#player')
      .jPlayer('setMedia', {mp3: musicItem.file})
      .jPlayer('play');
    this.setState({currentMusicItem: musicItem})
  }
  playNext(type = "next") {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length
    if (type === 'next') {
      newIndex = (index + 1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.playMusic(this.state.musicList[newIndex]);
  }
  findMusicIndex(musicItem) {
    return this
      .state
      .musicList
      .indexOf(musicItem);
  }
  componentDidMount() {
    $('#player').jPlayer({supplied: "mp3", wmode: 'window'});
    this.playMusic(this.state.currentMusicItem);
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    })
    console.log(this.state.musiclist)
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this
          .state
          .musicList
          .filter(item => {
            return item !== musicItem;
          })
      })
    });
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });
    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev');
    });
    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext();
    });

  }
  componentWillUnmount() {
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended)
  }
  render() {
    const Home = () => (<Player currentMusicItem={this.state.currentMusicItem}/>);
    const List = () => ( < MusicList currentMusicItem = {
      this.state.currentMusicItem
    }
    musicList = {
      this.state.musicList
    } > </MusicList>)
    return (
      <Router>
        <div>
          <ComponenteHeader></ComponenteHeader>
          <div id="player"></div>
          <Route exact path="/" component={Home}/>
          <Route path="/list" component={List}/>
        </div>
      </Router>

    );
  }
}

export default App;
