import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavigationBar, Canvas, MyFiles, Upload } from "../../components";
import Login from "../../components/Login/login";

class App extends Component {
  state = {
    loginState: false,
    upState: false
  };

  loginBtn = () => {
    if (this.state.loginState == true) {
      this.setState({
        loginState: false
      });
    } else {
      this.setState({
        loginState: true
      });
    }
    console.log(this.state.loginState);
  };

  uploadFile = () => {
    if (this.state.upState == true) {
      this.setState({
        upState: false
      });
    } else {
      this.setState({
        upState: true
      });
    }
    console.log(this.state.upState);
  };

  render() {
    let login;
    if (this.state.loginState === true) {
      login = (
        <div>
          <Login loginBtn={this.loginBtn} />
        </div>
      );
    }
    
    let upload;
    if (this.state.upState === true) {
      upload = (
        <div>
          <Upload uploadFile={this.uploadFile} />
        </div>
      );
    }

    return (
      <>
        <NavigationBar uploadFile={this.uploadFile} loginBtn={this.loginBtn} />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: "1" }}>
            <MyFiles />
          </div>

          <div style={{ flex: "8", backgroundColor: "#a6a6a6" }}>
            <Canvas />
          </div>

          {login}
          {upload}
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
