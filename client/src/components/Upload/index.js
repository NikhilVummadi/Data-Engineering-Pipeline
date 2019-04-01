
import React, { Component } from "react";
import { ButtonToolbar, Button, Modal, Form, ModalDialog, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'

//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'
handleFileRead = (e) => {
  const content = fileReader.result;
  console.log(content);
}

handleFileChosen = (file) => {
  fileReader = new fileReader();
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);
}


class Upload extends Component {
  render() {
    console.log(this.props);
    return (
      <div
        className="background"
        style={{ position: "absolute", left: "35vw" }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={this.props.uploadFile}>
            <Modal.Title>Submit File for Uploading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <input type="file" id="fName" accept=".csv" onChange={e => handleFileChosen(e.target.files[0])}>
            </input>
            <br></br>
            <br></br>
            <br></br>
			  <Button variant="primary" type="submit" onClick={this.props.uploadFile}>
                Submit
        </Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}

export default Upload;
