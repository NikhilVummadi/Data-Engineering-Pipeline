import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationBar, Canvas, MyFiles } from '../../components'

class App extends Component {
  uploadFile () {
    console.log("File Uploading")
  }

  render() {
    return (
      <>
        <NavigationBar uploadFile={this.uploadFile}/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: '1'}}>
            <MyFiles/>
          </div>
          <div style={{flex: '8', backgroundColor: '#a6a6a6'}}>
            <Canvas/>
          </div>
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
