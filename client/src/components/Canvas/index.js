import React, { Component } from "react";
import { ButtonToolbar, Button, Form } from "react-bootstrap";
import "./Canvas.css";
import DataChecks from "./DataChecks";
import DisplayTable from "../../components/DisplayTable"

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: "master",
      publicFile: true,
    };
  }

  handleFileType = async e => {
    await this.setState({ fileType: e.target.value });
  };

  handlePublic = e => {
    let { publicFile } = this.state;
    this.setState({ publicFile: !publicFile });
    this.props.checkboxTrigger(this.state.publicFile);
    console.log(this.state.publicFile);
  };

  render() {
    console.log(this.props);
    const { title, fileSection, next } = this.props;
    const { fileType, publicFile } = this.state;
    return (
      <div className="container">
        {title ? (
          <>
            <h3 style={{ textAlign: "center" }}>{title}</h3>
            <div
              style={{
                padding: "10px",
                float: "left",
                margin: "4"
              }}
            >

            </div>
			<DisplayTable />
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Canvas;
