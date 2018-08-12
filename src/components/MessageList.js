import React, { Component } from 'react';
import * as firebase from 'firebase';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],

      username: '',
      content: '',
      sentAt: '',
      messageId: '',
      roomId: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(message);
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

handleSubmit(newMessageName) {
    if (!this.state.newMessageName) { return }
    console.log(newMessageName);
    console.log(this.props.roomId);
    this.setState ({
      username: this.state.username,
      content: this.state.content,
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      roomId: this.state.roomId
    });
    this.messagesRef.push({
      name:newMessageName
    });
    this.setState({ newMessageName: '' });
    console.log(this.state.username)
  }
handleChange(e){
    this.setState({ newMessageName: e.target.value })
  }
  render() {
    return (
      <div>
      {
        this.state.messages.map((message, index) =>
        <div key={index}>{message.name}</div>
      )}
      <form onSubmit={ (e) => {
        e.preventDefault();
        this.handleSubmit(this.state.newMessageName) }
      }>
      <input type="text" value={ this.state.newMessageName }  onChange={ (e) => this.handleChange(e)}/>
      <input type="submit"/>
      </form>
      </div>
    );
  }
  }
  export default MessageList;
