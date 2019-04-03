import React, { Component } from "react";
import NavLink from "react-bootstrap/NavLink";
<<<<<<< HEAD
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';

const nodes = [{
    value: this.props.id,
    label: this.props.name,
    children: [
        { value: 'images', label: 'Images' },
        { value: 'data', label: 'Data' },
    ],
}];
=======
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
>>>>>>> e059215751a20c01733d126b6cfa0fb7ee3b3576

class PrivateFiles extends Component {
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
    this.state.nodes[0].label = this.props.name;
    this.state.nodes[0].label = this.props.name.toLowerCase();

    return (
      <div>
        <li style={this.getStyle()}>
<<<<<<< HEAD
        <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                onClick={() => this.props.fileSelection("Private", this.props.name)}
            />
=======
          <CheckboxTree
            nodes={this.state.nodes}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={checked => this.setState({ checked })}
            onExpand={expanded => this.setState({ expanded })}
            key={this.props.id}
            onClick={() => this.props.fileSelection("Private", this.props.name)}
          />
>>>>>>> e059215751a20c01733d126b6cfa0fb7ee3b3576
        </li>
      </div>
    );
  }
}

export default PrivateFiles;
