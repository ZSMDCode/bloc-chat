import * as firebase from 'firebase';
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      activeUser: ''
    };
  }
  handleRoomClick = (room) => {
    this.setState({ activeRoom: room});
  }

  setUser = (user) => {
    this.setState({activeUser: user});
  }

  render() {
    return (
      <div className="App">
      <RoomList firebase={firebase} activeRoom={this.state.activeRoom} handleRoomClick={this.handleRoomClick}/>
      <MessageList firebase={firebase} activeRoom={this.state.activeRoom} setUser={this.setUser} activeUser={this.state.activeUser}/>
      <User firebase={firebase} setUser={this.setUser} activeUser={this.state.activeUser}/>
      </div>
    );
  }
}

export default App;
