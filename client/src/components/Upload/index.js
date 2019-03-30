import React, { Component } from "react";
import {
  ButtonToolbar,
  Button,
  Modal,
  Form,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "react-bootstrap";

//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'

class Upload extends Component {
  render() {
    let currentFile;
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
              <input
                type="file"
                id="fName"
                onChange={e => (currentFile = e.target.files[0])}
              />
              <br />
              <br />
              <br />
              <Button
                variant="primary"
                type="submit"
                onClick={e => {
                  this.props.uploadFile(e);
                  this.props.incrementOnUpload(currentFile);
                  console.log(currentFile.name);
                }}
              >
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
