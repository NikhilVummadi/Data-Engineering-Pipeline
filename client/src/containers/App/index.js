import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavigationBar, Canvas, MyFiles, Upload } from "../../components";
import Login from "../../components/Login/login";
import CanvasBanner from '../../images/canvasBanner.jpg';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      canvasTitle: '',
      loginState: false,
      username: '',
      password: '',
      upState: false,
      fileSection: '',
      dataChecks: false,
    }
    this.fileSelection = this.fileSelection.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

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
    // console.log(this.state.loginState);
  };


  handleUserChange = (e) => {
    console.log("Asdfsad")
    console.log(e.target.value)
    this.setState({username: e.target.value})
  };

  handlePassChange = (e) => {
      this.setState({password: e.target.value})
  };


  loginSubmit = () => {
    if (this.state.loginState == true) {
      this.setState({
        loginState: false
      });
    } else {
      this.setState({
        loginState: true
      });
    }
    console.log("Login form submitted")
    console.log("Username: ", this.state.username);
    console.log("Password: ", this.state.password);
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
    // console.log(this.state.upState);
  };

  nextCanvas = (fileType, publicFile) => {
    console.log("File Type: ", fileType)
    console.log("Keep it private or public: ", publicFile)
    console.log("Canv");
    this.setState({ dataChecks: true })
  }

  componentDidMount(){
    this.setState({ nextCanvas: false})
  }

  fileSelection = (section, e) => {
    this.setState({canvasTitle: e})
    this.setState({fileSection: section})
    console.log(e, " file selected")
  }

  render() {
    let login;
    if (this.state.loginState === true) {
      login = (
        <div>
          <Login
            loginBtn={this.loginBtn}
            username={this.state.username}
            password={this.state.password}
            handleUserChange={this.handleUserChange}
            handlePassChange={this.handlePassChange}
            loginSubmit={this.loginSubmit}
          />
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
        <NavigationBar
          uploadFile={this.uploadFile}
          username={this.state.username}
          password={this.state.password}
          loginBtn={this.loginBtn}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: "1" }}>
            <MyFiles fileSelection={this.fileSelection} />
          </div>

          <div style={{ flex: "9", backgroundImage: `url(require(${CanvasBanner}))`}}>
            <Canvas title={this.state.canvasTitle} fileSection={this.state.fileSection} next={this.nextCanvas} nextCanvas={this.state.nextCanvas}/>
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
