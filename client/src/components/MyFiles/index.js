import React, { Component } from "react";
import Private from "./Private";
import Public from "./Public";

class MyFiles extends Component {
  render() {
    console.log(this.props);

    return (
        <>
            <div style={{paddingLeft: 10, height: '30vh'}}>
                <h4>Private</h4>
                <Private
                privateList={this.props.privateList}
                fileSelection={this.props.fileSelection}
                fillSidebar={this.props.fillSidebar}
                />
            </div>
            <div style={{paddingLeft: 10, height: '30vh'}}>        
                <hr />
                <h4>Public</h4>
                <Public
                publicList={this.props.publicList}
                fileSelection={this.props.fileSelection}
                fillBottombar={this.props.fillSidebar}
                />
            </div>
        </>
    );
  }
}

export default MyFiles;
