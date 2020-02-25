/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDOgHahh1Z_N-68GrCKZYT72NXdpJoYpJIb4k5w7Wcl-hDRhPvTEDhv8RSdaDaQNQ9zWxw3hmFTaeMtqqox8ETU6dv6kODK-ugJC66jw8i-eJCmWL7FOkGzwdeF2Hn4FBsReFWzVw0zhnG7v7kiQyriwCAXISCSWVij9zy2FE-xNyH2Xdwa';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {

  render(){
    const { index, track } =this.props;
    return(
      <div>
        <p>{index} - {track.track.name}</p>
        <img src={track.track.album.images[0].url} />
      </div>
    )
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      nbOfSongs: "",
      songs: [],
    };
  }

  componentDidMount = () => {
      fetch('https://api.spotify.com/v1/playlists/1wCB2uVwBCIbJA9rar5B77/tracks', {
    method: 'GET',
    headers: {
    Authorization: 'Bearer ' + apiToken,
    },
  })
  .then(response => response.json())
  .then((data) => {
    this.setState({nbOfSongs: data.items.length, songs:data.items});
    console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data.items);
  });
    
  };



  render() {
    const { songs,nbOfSongs } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Salut ! Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
      
        <p>{nbOfSongs} chansons dans ton Blindtest</p>
        {songs['0'] ?<> <p>coucou</p><Sound url={songs['0'].track.preview_url} playStatus={Sound.status.PLAYING}/> </>: null}
        {songs.map((song, index) =>   <AlbumCover key={index} index={index} track={song}/>)}
          <p>Il va falloir modifier le code pour faire un vrai Blindtest !</p>
        </div>
        <div className="App-buttons">
        </div>
      </div>
    );
  }
}

export default App;
