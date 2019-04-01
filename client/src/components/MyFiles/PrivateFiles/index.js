import React, { Component } from "react";
import NavLink from "react-bootstrap/NavLink";

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
          <NavLink
            key={this.props.id}
            onClick={() => this.props.fileSelection("Private", this.props.name)}
          >
            {this.props.name}
          </NavLink>
        </li>
      </div>
    );
  }
}

export default PrivateFiles;
