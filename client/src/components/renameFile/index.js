//Login component
import React, { Component } from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import { Modal, Button, Form, FormGroup, FormControl } from "react-bootstrap";


//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'

class Rename extends Component {

  constructor(props){
    super();
    this.state = {
      name: ''
    }
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
    this.props.renameFile();
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = (e) => {
    return this.state.name;
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
          <Modal.Header closeButton onClick={this.props.renameFile}>
            <Modal.Title>Rename</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="formBasicEmail">
                <Form.Label style={{ width: "10rem" }}>
                  Rename
                </Form.Label>
                <FormControl type="text" placeholder="Enter new name" onChange={this.handleNameChange}/>
              </FormGroup>

              

              <div style={{ float: "right" }}>
                
                
                <Button variant="primary" type="submit" onClick={e => {this.props.renameFile(e); this.props.rename(this.props.rowInfo, this.handleSubmit())}}>
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

export default Rename;
