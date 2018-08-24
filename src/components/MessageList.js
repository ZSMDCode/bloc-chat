import React, { Component } from 'react';
import * as firebase from 'firebase';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: [],
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  handleChange(e){
    this.setState({ messages: e.target.value })
  }
  newMessage(newMessage) {
      if (!this.state.newMessage) { return }
      this.messagesRef.push({
        messages: newMessage,
        sentAt: firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom,
        user: this.props.activeUser,
      });
      this.setState({ newMessage: '' });
    }


  render() {
       return (
         <div>
         {this.state.messages.filter(message => message.roomId === this.props.activeRoom).map((message, index) =>
        <li key={index}>{message.content}</li>
        )
        }

        <h5>Type Message: <input type="text" value=  { this.state.newMessage }  onChange={ (e) => this.handleChange(e)}/>
  <input type="submit"/>
  </h5>        <form onSubmit={ (e) => {
            e.preventDefault();
            this.newMessage(this.state.newMessage) }
          }>
</form>
         </div>
     )}
     }
     export default MessageList;
