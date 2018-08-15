import React, { Component } from 'react';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
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
  render() {
    let messageContent = this.state.messages.map((message, index) => {
      if (message.roomId === this.props.activeRoom){
        return <div key={index}>{message.content}</div>
      }
      else
      {
        return undefined
      }
    })
    return (
      <div>
      <ul>
      {messageContent}
      </ul>
      </div>
    )}
  }
  export default MessageList;
