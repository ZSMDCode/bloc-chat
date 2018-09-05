import React, { Component } from 'react';
import * as firebase from 'firebase';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
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
    this.setState({ newMessage: e.target.value })
  }
  newMessage(newMessage) {
    this.messagesRef.push({
      content: newMessage,
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom,
      user: !this.props.user ? 'Guest' : this.props.user.displayName
    });
    this.setState({ newMessage: '' });
  }
  deleteMessage(message){
    this.messagesRef.child(message.key).remove();
    const index = this.state.messages.indexOf(message);
    this.state.messages.splice(index, 1);
    this.setState({messages: this.state.messages})
 }
  render() {
    return (
      <div>
      {this.state.messages.filter(message => message.roomId === this.props.activeRoom).map((message, index) =>
        <li key={index}>{this.props.activeUser === null ? '' : this.props.activeUser.displayName + ' : ' + message.content + '  '}
          <button className="DeleteButton" onClick={ () => this.deleteMessage(message)}>Delete</button>
        </li>
      )
    }
      <form onSubmit={ (e) => {
      e.preventDefault();
      this.newMessage(this.state.newMessage) }
        }>
        <h5>Type Message: <input type="text" value=  { this.state.newMessage }  onChange={ (e) => this.handleChange(e)}/>
        {' '}<input className="SubmitButton" type="submit"/>
        </h5>
      </form>
    </div>
  )}
}
export default MessageList;
