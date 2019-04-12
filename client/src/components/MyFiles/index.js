import React, { Component } from "react";
import Private from "./Private";
import Public from "./Public";
import SortableTree from "react-ui-sortable-tree";
import {
  getNodeAtPath,
  addNodeUnderParent,
  removeNodeAtPath,
  find,
  insertNode,
  getVisibleNodeCount,
  walk
} from "react-sortable-tree";
import "react-sortable-tree/style.css";

class MyFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {
          title: "Source",
          children: [
            {
              title: <a href="#">Private</a>,
              children: this.takeTwo(this.props.privateList)
            },
            {
              title: <a href="#">Public</a>
            }
          ]
        }
      ]
    };
  }

  addNode = rowInfo => {
    console.log(path);
    let NEW_NODE = { title: "" };
    let { node, treeIndex, path } = rowInfo;
    path.pop();

    let parentNode = getNodeAtPath({
      treeData: this.state.treeData,
      path: path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: true
    });
    let getNodeKey = ({ node: object, treeIndex: number }) => {
      return number;
    };
    let parentKey = getNodeKey(parentNode);
    if (parentKey == -1) {
      parentKey = null;
    }
    let newTree = addNodeUnderParent({
      treeData: this.state.treeData,
      newNode: NEW_NODE,
      expandParent: true,
      parentKey: parentKey,
      getNodeKey: ({ treeIndex }) => treeIndex
    });
    this.setState({ treeData: newTree.treeData });
  };

  removeNode(row) {
    let { node, treeIndex, path } = row;
    this.setState({
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path: path, // You can use path from here
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
          console.log(number);
          return number;
        },
        ignoreCollapsed: false
      })
    });
  }

  takeTwo = list => {
    let newList = [];
    for (var i in list) {
      newList.push({
        title: (
          <Private
            fileSelection={this.props.fileSelection}
            privateList={this.props.privateList}
            item={i}
          />
        )
      });
    }
    console.log(list);
    return newList;
  };

  updateTree = treeData => {
    console.log(treeData[0].children);
    this.setState({ treeData: [...treeData, { title: "newitem" }] });
  };

  render() {
    console.log(this.props);
    // set state with item from list
    this.state.treeData[0].children[0].children = this.takeTwo(
      this.props.privateList
    );

    return (
      <div>
        <h4>Files</h4>
        <div style={{ height: 1000, width: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={this.updateTree}
            getNodeKey={({ node }) => node._id}
            generateNodeProps={row => ({
              buttons: [
                <div>
                  <button
                    label="Delete"
                    onClick={event => this.removeNode(row)}
                  >
                    Remove
                  </button>
                  <button label="Add" onClick={event => this.addNode(row)}>
                    Add
                  </button>
                </div>
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default MyFiles;
