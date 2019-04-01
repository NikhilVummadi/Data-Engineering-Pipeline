import React, { Component } from "react";
import PrivateFiles from "./PrivateFiles";

class Private extends Component {
  render() {
    console.log(this.props);

    return this.props.privateList.map(item => (
      <PrivateFiles
        key={item.id}
        name={item}
        fileSelection={this.props.fileSelection}
        fillSidebar={this.props.fillSidebar}
      />
    ));
  }
}

export default Private;
