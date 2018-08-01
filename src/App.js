import * as firebase from 'firebase';
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';
  var config = {
    apiKey: "AIzaSyAE3TkOoZoRyBQnlg2JTWcsF9IZaounnXU",
    authDomain: "blocchatfirebase.firebaseapp.com",
    databaseURL: "https://blocchatfirebase.firebaseio.com",
    projectId: "blocchatfirebase",
    storageBucket: "blocchatfirebase.appspot.com",
    messagingSenderId: "282531310560"
  };
  firebase.initializeApp(config);
class App extends Component {
  render() {
    return (
      <div className="App">
      <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
