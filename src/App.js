import React, {Component} from 'react';
import './App.css';
import ComponenteHeader from './components/header';
import 'jplayer'
import $ from 'jquery';
import Player from './page/palyer'
import {MUSIC_LIST} from './config/musiclist';
import MusicList from './page/musiclist';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[2]
    }
  }

  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        $(this)
          .jPlayer('setMedia', {
          mp3: 'http://www.170mv.com/kw/other.web.ri01.sycdn.kuwo.cn/resource/n1/96/84/152318981' +
              '4.mp3'
        })
          .jPlayer('play');
      },
      supplied: "mp3",
      wmode: 'window'
    });
    console.log(this.state.musiclist)

  }

  render() {
    const Home = () => { < Player currentMusicItem = {
        this.state.currentMusicItem
      } > </Player>
    }
    const List = () => { < MusicList
      currentMusicItem = {
        this.state.currentMusicItem
      }
      musicList = {
        this.state.musicList
      } > </MusicList>
    }
    return (
      <Router>
        <div>
          <ComponenteHeader></ComponenteHeader>
          <div id="player"></div>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
        </div>
      </Router>

    );
  }
}

export default App;
