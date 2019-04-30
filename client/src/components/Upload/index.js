import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "./Upload.css";

//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'

class Upload extends Component {

  
  constructor(props){
    super(props)
  }

  componentWillMount(){
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if(this.node.contains(e.target)){
      return;
    }
    this.handleClickOutside();
  }

  handleClickOutside = () => {
    this.props.uploadFile();
  }

  render() {
    let currentFile;
    return (
      <div
        className="background"
        style={{ position: "absolute", left: "35vw" }}
        ref={node => this.node = node}
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
                  this.props.createNewTree(
                    this.props.treeData,
                    currentFile.name
                  );
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
