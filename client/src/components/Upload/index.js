
import React, { Component } from "react";
import { ButtonToolbar, Button, Modal, Form, ModalDialog, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap'

//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'

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
            <input type="file" id="fName">
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
