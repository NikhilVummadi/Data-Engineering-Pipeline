import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import Upload from "../Upload/index";

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkUpdate: false,
      prevArray: [],
      upState: true,
      treeData: [
        {
          title: "Source",
          children: [{ title: "Private" }, { title: "Public" }]
        }
      ]
    };
  }

  checkArrayUpdate = () => {
    //check for update button click through prop
    console.log(this.props.upState);
  };

  changeTree = () => {
    this.setState({
      treeData: [{ title: "title", children: [] }]
    });
  };

  render() {
    console.log(this.props);
    let upload;
    if (this.state.upState === true) {
      upload = (
        <div>
          <Upload
            uploadFile={this.props.uploadFile}
            incrementOnUpload={this.props.incrementOnUpload}
          />
        </div>
      );
    }

    return (
      <div style={{ height: 400, width: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={this.updateTreeData}
          onMoveNode={({ node, treeIndex, path }) =>
            global.console.debug(
              "node:",
              node,
              "treeIndex:",
              treeIndex,
              "path:",
              path
            )
          }
          canDrag={({ node }) => !node.noDragging}
          canDrop={({ node }) => !node.noDrop}
          shouldCopyOnOutsideDrop={false}
        />
      </div>
    );
  }
}
