import React, { Component } from "react";
import NavLink from "react-bootstrap/NavLink";
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

class PrivateFiles extends Component {
  getStyle = () => {
    return {
      width: "200px",
      listStyleType: "none",
      // backgroundColor: "cyan",
      color: "white",
      padding: "0.5rem",
      margin: "0.5rem 0.5rem 0.5rem 0"
    };
  };

  render() {
    return (
      <div>
        <li style={this.getStyle()}>
        <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                onClick={() => this.props.fileSelection("Private", this.props.name)}
            />
        </li>
      </div>
    );
  }
}

export default PrivateFiles;
