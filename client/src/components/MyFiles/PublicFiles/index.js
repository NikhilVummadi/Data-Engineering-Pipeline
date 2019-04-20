import React, { Component } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

class PublicFiles extends Component {
  constructor() {
    super();

    this.state = {
      checked: [],
      expanded: [],
      checkedTwo: [],
      expandedTwo: [],
      nodes: [
        {
          value: "val",
          label: "name",
          children: [
            { value: "images", label: "Image" },
            { value: "data", label: "Data" }
          ]
        }
      ]
    };
  }

  handleClick = () +> {
    console.log("RIGHT CLICK");
  }

  getStyle = () => {
    return {
      width: "300px",
      listStyleType: "none",
      // backgroundColor: "cyan",
      padding: "0.5rem",
      margin: "0.5rem 0.5rem 0.5rem 0"
    };
  };

  render() {
    console.log(this.props);
    this.state.nodes[0].label = this.props.name;
    this.state.nodes[0].label = this.props.name.toLowerCase();

    return (
      <div>
        <li style={this.getStyle()}>
          <CheckboxTree
            nodes={this.state.nodes}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={checked => this.setState({ checked })}
            onExpand={expanded => this.setState({ expanded })}
            key={this.props.id}
            onClick={() => this.props.fileSelection("Public", this.props.name)}
          />
        </li>
      </div>
    );
  }
}

export default PublicFiles;
