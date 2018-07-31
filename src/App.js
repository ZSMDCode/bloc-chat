import * as firebase from 'firebase';
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import logo from './logo.svg';
import './App.css';
src="https://www.gstatic.com/firebasejs/5.3.0/firebase.js"
// Initialize Firebase
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
      <RoomList />
      </div>
    );
  }
}

export default App;
