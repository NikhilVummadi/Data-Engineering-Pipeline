import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import { NavigationBar, Canvas, MyFiles } from '../../components';
import Login from '../../components/Login/login';

class App extends Component {
  state = {
    loginState: false
  }

  loginBtn = () => {
    if(this.state.loginState == true){
      this.setState(
        {
          loginState: false
        }
      )
    } else {
      this.setState({
        loginState: true
      })
    }
    console.log(this.state.loginState);
  }

=======
import { NavigationBar, Canvas, MyFiles } from '../../components'

class App extends Component {
>>>>>>> a8e30ac0ce9f3f1d5adc6fc543740dfb789b8849
  uploadFile () {
    console.log("File Uploading")
  }

  render() {
<<<<<<< HEAD
    let login;
    if(this.state.loginState === true){
      login = <div><Login/></div>
    }

    return (
      <>
        <NavigationBar uploadFile={this.uploadFile} loginBtn={this.loginBtn}/>
=======
    return (
      <>
        <NavigationBar uploadFile={this.uploadFile}/>
>>>>>>> a8e30ac0ce9f3f1d5adc6fc543740dfb789b8849
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: '1'}}>
            <MyFiles/>
          </div>
          <div style={{flex: '8', backgroundColor: '#a6a6a6'}}>
            <Canvas/>
          </div>
<<<<<<< HEAD
          {login}
=======
>>>>>>> a8e30ac0ce9f3f1d5adc6fc543740dfb789b8849
        </div>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div> */}
      </>
    );
  }
}

export default App;
