import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationBar, Canvas, MyFiles } from '../../components'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      canvasTitle: '',
    }
    this.fileSelection  =this.fileSelection.bind(this)
  }

  uploadFile () {
    console.log("File Uploading")
  }

  componentDidMount(){
    
  }

  fileSelection = (section, e) => {
    this.setState({canvasTitle: e})
    console.log(e)
    console.log(section)
  }

  render() {
    console.log(this.state)
    return (
      <div >
        <NavigationBar uploadFile={this.uploadFile}/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: '1'}}>
            <MyFiles fileSelection={this.fileSelection} />
          </div>
          <div style={{flex: '8', backgroundColor: '#a6a6a6'}}>
            <Canvas title={this.state.canvasTitle}/>
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
      </div>
    );
  }
}

export default App;
