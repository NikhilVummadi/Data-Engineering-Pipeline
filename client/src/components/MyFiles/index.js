import React, { Component } from "react";
import Private from "./Private";
import Public from "./Public";
import SortableTree from "react-sortable-tree";
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
              title: "Private",
              children: this.takeTwo(this.props.privateList)
            },
            {
              title: "Public"
            }
          ]
        }
      ]
    };
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

  render() {
    console.log(this.props);
    //set state with item from list
    this.state.treeData[0].children[0].children = this.takeTwo(
      this.props.privateList
    );

    return (
      <div>
        <h4>Files</h4>
        <div style={{ height: 1000, width: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            getNodeKey={({ node }) => node._id}
            generateNodeProps={
              (onclick = node => {
                if (node.treeIndex === 2) console.log(node.node.title);
              })
            }
          />
        </div>
      </div>
    );
  }
}

export default MyFiles;
