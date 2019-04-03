import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavigationBar, Canvas, MyFiles, Upload } from "../../components";
import Login from "../../components/Login/login";

const privateData = {
  name: 'root',
  toggled: true,
  children: [
      {
          name: 'Contacts',
          children: [
              { name: 'Customers.csv' },
              { name: 'Phone.csv' }
          ]
      },
      {
          name: 'Buyers',
          children: [
              {
                  name: 'Schools',
                  children: [
                      { name: 'NJIT' },
                      { name: 'Rutgers' }
                  ]
              }
          ]
      }
  ]
};
const publicData = {
  name: 'root',
  toggled: true,
  children: [
      {
          name: 'Items',
          children: [
              { name: 'Phones.csv' },
              { name: 'Stocks.csv' }
          ]
      },
      {
          name: 'Sales',
          children: [
              {
                  name: 'Newark',
                  children: [
                      { name: 'IHOP' },
                      { name: 'GDS' }
                  ]
              }
          ]
      }
  ]
};
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      canvasTitle: '',
      loginState: false,
      upState: false
    }
    this.fileSelection  =this.fileSelection.bind(this)
    this.onToggle = this.onToggle.bind(this);
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

  componentDidMount(){
    
  }

  fileSelection = (section, e) => {
    this.setState({canvasTitle: e})
    console.log(e)
    console.log(section)
  }

  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  onClick(e){
    console.log("askdfhbglsdf")
  }

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
          <div style={{ flex: "1", paddingLeft: 5 }}>
            <MyFiles privateData={privateData} publicData={publicData} onToggle={this.onToggle} onClick={this.onClick} fileSelection={this.fileSelection} />
          </div>

          <div style={{ flex: "8", backgroundColor: "#a6a6a6" }}>
            <Canvas title={this.state.canvasTitle}/>
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
