import React, { Component } from "react";
//import { ButtonToolbar, Button, Form } from "react-bootstrap";
import "./Canvas.css";
// import DataChecks from "./DataChecks";
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
  };

  render() {
    const { title, columns, rows, datachecks } = this.props;
    // const { fileType, publicFile } = this.state;
    // console.log("THIS IS THE HEADERS", header)
    console.log("THIS IS COLUMNS", columns)
    console.log("ROWS: ", rows)
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
            {columns? 
              <DisplayTable columns={columns} rows={rows} datachecks={datachecks} />
              : 
              <>
               <h3 style={{ textAlign: "center" }}> THERE IS NO DATA TO BE DISPLAYED </h3>
              </>
            }
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Canvas;
