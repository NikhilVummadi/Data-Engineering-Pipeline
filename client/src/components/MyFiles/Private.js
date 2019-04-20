import React, { Component } from "react";
import PrivateFiles from "./PrivateFiles";

class Private extends Component {
  render() {
    console.log(this.props.privateList);
    // this.state.treeData[0].children = this.props.privateList;

    return (
      <a
        href="#"
        key={this.props.privateList[this.props.item]}
        onClick={() => {
          this.props.fileSelection(
            "Private",
            this.props.privateList[this.props.item]
          );
        }}
      >
        {this.props.privateList[this.props.item]}
      </a>
    );
  }
}

export default Private;
