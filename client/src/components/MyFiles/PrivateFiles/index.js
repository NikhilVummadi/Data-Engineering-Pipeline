import React, { Component } from "react";
import NavLink from "react-bootstrap/NavLink";
// import CheckboxTree from "react-checkbox-tree";
// import "react-checkbox-tree/lib/react-checkbox-tree.css";
import SortableTree from "react-sortable-tree";

class PrivateFiles extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     treeData: [{ title: {}, children: [{ title: "Egg" }] }]
  //   };
  //   // this.state = {
  //   //   checked: [],
  //   //   expanded: [],
  //   //   checkedTwo: [],
  //   //   expandedTwo: [],
  //   //   nodes: [
  //   //     {
  //   //       value: "val",
  //   //       label: "name",
  //   //       children: [
  //   //         { value: "images", label: "Image" },
  //   //         { value: "data", label: "Data" }
  //   //       ]
  //   //     }
  //   //   ]
  //   // };
  // }
  //
  // render() {
  //   // this.state.nodes[0].label = this.props.name;
  //   // this.state.nodes[0].label = this.props.name.toLowerCase();
  //   return (
  //     <div>
  //       {/* //   <li style={this.getStyle()}>
  //     //     <CheckboxTree
  //     //       nodes={this.state.nodes}
  //     //       checked={this.state.checked}
  //     //       expanded={this.state.expanded}
  //     //       onCheck={checked => this.setState({ checked })}
  //     //       onExpand={expanded => this.setState({ expanded })}
  //     //       key={this.props.id}
  //     //       onClick={() => this.props.fileSelection("Private", this.props.name)}
  //     //     />
  //     //   </li> */}
  //       <li style={this.getStyle()}>
  //         <SortableTree
  //           treeData={this.state.treeData}
  //           onChange={treeData => this.setState({ treeData })}
  //         />
  //       </li>
  //     </div>
  //   );
  // }
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: "Chicken", children: [] }]
    };
  }

  getStyle = () => {
    return {
      width: "500",
      height: "400px",
      listStyleType: "none",
      // backgroundColor: "cyan",
      padding: "0.5rem",
      margin: "0.5rem 0.5rem 0.5rem 0"
    };
  };

  render() {
    this.state.treeData[0].title = this.props.name;

    return (
      <li style={this.getStyle()}>
        <div style={{ height: 400, width: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            onClick={() => this.props.fileSelection("Private", this.props.name)}
          />
        </div>
      </li>
    );
  }
}

export default PrivateFiles;
