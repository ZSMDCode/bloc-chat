import React, { Component } from 'react';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageName: '',
      username: '',
      content: '',
      sentAt: '',
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
    this.messagesRef.push({
      name:newMessageName
    });
    this.setState({ newMessageName: '' });
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
