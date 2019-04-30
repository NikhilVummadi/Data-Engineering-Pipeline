//Login component
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";


//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'

class MyFiles extends Component {

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
    this.props.addBtn();
  }

  render() {
    console.log(this.props);
    return (
      <div
        className="background"
        style={{ position: "absolute", left: "35vw" }}
        ref={node => this.node = node}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={this.props.addBtn}>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ width: "10rem" }}>
                  Rename
                </Form.Label>
                <Form.Control type="email" placeholder="Enter new name" inputRef={ref => this.input = ref}
                />
              </Form.Group>

              

              <div style={{ float: "right" }}>
                
                
                <Button variant="primary" type="submit" onClick={this.props.addNode(this.props.rowInfo, 'vale')}>
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default MyFiles;
