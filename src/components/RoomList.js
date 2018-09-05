import React, { Component } from 'react';
class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: '',
      activeRoom: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  handleSubmit(newRoomName) {
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({
      name:newRoomName
    });
    this.setState({ newRoomName: '' });
  }
  handleChange(e){
    this.setState({ newRoomName: e.target.value })
  }
  deleteRoom(room){
    this.roomsRef.child(room.key).remove();
    const index = this.state.rooms.indexOf(room);
    this.state.rooms.splice(index, 1);
    this.setState({rooms: this.state.rooms})
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }
  render() {
    return (
      <div>
      <h1>{"Alphagility Chat Room"}</h1>
      <h3>{"Chat Rooms - Click the Name to Enter:"}</h3>
      {
        this.state.rooms.map((room, index) =>
        <div key={index} onClick={() => this.props.handleRoomClick(room.key)}>{room.name}:
        <button  onClick={ () => this.deleteRoom(room)}>Delete</button>
        </div>
      )}
      <form onSubmit={ (e) => {
        e.preventDefault();
        this.handleSubmit(this.state.newRoomName) }
      }>
      <h5>Type New Room Name: <input type="text" value={ this.state.newRoomName }  onChange={ (e) => this.handleChange(e)}/>
      <input type="submit"/>
      </h5>
      </form>
      </div>
    );
  }
}
export default RoomList;
