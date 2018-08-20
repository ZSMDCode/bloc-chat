import React, { Component } from 'react';
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.usersRef = this.props.firebase.database().ref('users');
  }
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
}
  authenticate(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    console.log("logged in" + this.props.activeUser);
  }
  signOut(){
    this.props.firebase.auth().signOut();
    console.log("logged out")
  }
  render() {
    console.log("active user = " + this.props.activeUser)
    return (
      <div>
      <input type="button" value={"Sign in"} onClick={() => {this.authenticate()}}/>
      <input type="button" value={"Sign out"} onClick={() => {this.signOut()}}/>
        <h2>{this.props.activeUser === null ? '' : "Hello " + this.props.activeUser.displayName }</h2>
      </div>
    );
  }
}
export default User;
