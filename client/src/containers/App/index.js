import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavigationBar, Canvas, MyFiles, Upload } from "../../components";
import Login from "../../components/Login/login";
import CanvasBanner from "../../images/canvasBanner.jpg";
import NavLink from "react-bootstrap/NavLink";
import Tree from "../../components/MyFiles/tree";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasTitle: "",
      loginState: false,
      username: "",
      password: "",
      upState: false,
      fileSection: "",
      dataChecks: false,
      publicList: [],
      privateList: [],
      checked: false
    };
    this.fileSelection = this.fileSelection.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
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

  handleUserChange = e => {
    console.log("Asdfsad");
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  };

  handlePassChange = e => {
    this.setState({ password: e.target.value });
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
    console.log("Login form submitted");
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
    console.log("File Type: ", fileType);
    console.log("Keep it private or public: ", publicFile);
    console.log("Canv");
    this.setState({ dataChecks: true });
  };

  componentDidMount() {
    this.setState({ nextCanvas: false });
  }
  componentDidUpdate() {
    this.fillSidebar();
  }

  fileSelection = (section, e) => {
    this.setState({ canvasTitle: e });
    this.setState({ fileSection: section });
    console.log(e, " file selected");
  };

  //increment list with upload item whenever submit is clicked
  incrementOnUpload = fileName => {
    if (fileName !== undefined) {
      const list = [...this.state.privateList, fileName.name];
      this.setState({
        privateList: list
      });
      console.log(list);
    }
  };

  //fill sidebar with filename from list
  fillSidebar = item => {
    //map through list
    return (
      <li>
        <NavLink onClick={() => this.fileSelection("Private", item)}>
          {item}
        </NavLink>
      </li>
    );
  };

  //move from private to public
  moveFile = title => {
    console.log(this.state.checked);
    if (this.state.checked === true) {
      if (title !== undefined) {
        const list = [...this.state.publicList, title];
        this.setState({
          publicList: list
        });
        console.log(list);
      }
      console.log(this.state.publicList);
    }
  };

  fillBottombar = item => {
    //map through list
    return (
      <li>
        <NavLink onClick={() => this.fileSelection("Public", item)}>
          {item}
        </NavLink>
      </li>
    );
  };

  checkboxTrigger = checkbox => {
    console.log(checkbox);
    if (checkbox === false) {
      this.setState({
        checked: false
      });
    } else {
      this.setState({
        checked: true
      });
    }
  };

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
          <Upload
            uploadFile={this.uploadFile}
            incrementOnUpload={this.incrementOnUpload}
          />
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
            <MyFiles
              fileSelection={this.fileSelection}
              fillSidebar={this.fillSidebar}
              fillBottombar={this.fillBottombar}
              privateList={this.state.privateList}
              publicList={this.state.publicList}
            />
          </div>
          {/* <Tree /> */}
          {/* <div /> */}

          <div
            style={{
              flex: "9",
              backgroundImage: `url(require(${CanvasBanner}))`
            }}
          >
            <Canvas
              title={this.state.canvasTitle}
              fileSection={this.state.fileSection}
              next={this.nextCanvas}
              nextCanvas={this.state.nextCanvas}
              moveFile={this.moveFile}
              canvasTitle={this.state.canvasTitle}
              checkboxTrigger={this.checkboxTrigger}
            />
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
