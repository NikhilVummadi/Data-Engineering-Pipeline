import React, { Component } from "react";
import Private from "./Private";
import Public from "./Public";

class MyFiles extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <h4>Private</h4>
        <Private
          privateList={this.props.privateList}
          fileSelection={this.props.fileSelection}
          fillSidebar={this.props.fillSidebar}
        />
        <hr />
        <h4>Public</h4>
        <Public
          publicList={this.props.publicList}
          fileSelection={this.props.fileSelection}
          fillBottombar={this.props.fillSidebar}
        />
      </div>
    );
  }
}

export default MyFiles;
