import React, { Component } from "react";
import Private from "./PrivateFiles";
import PublicFiles from "./PublicFiles";

class Public extends Component {
  render() {
    console.log(this.props);

    return this.props.publicList.map(item => (
      <PublicFiles
        key={item.id}
        name={item}
        fileSelection={this.props.fileSelection}
        fillBottombar={this.props.fillSidebar}
      />
    ));
  }
}

export default Public;
