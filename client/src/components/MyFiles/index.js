import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import Upload from "../Upload/index";

export default class MyFiles extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <a href="#" onClick={this.props.treeClick(this.props.item)}>
          {this.props.item}
        </a>
      </React.Fragment>
    );
  }
}
