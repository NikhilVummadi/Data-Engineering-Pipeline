//Login component
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./login.css";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ButtonGroup from 'react-bootstrap/ButtonGroup'

//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'
const Login = ({ username, password, handleUserChange, handlePassChange, loginBtn, loginSubmit }) =>  (
      <div
        className="background"
        style={{ position: "absolute", left: "35vw" }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={() => loginBtn()}>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
<<<<<<< HEAD
                <Form.Label style={{ width: "10rem" }}>
                  Email address
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
=======
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={username} onChange={handleUserChange}/>
>>>>>>> 4af834829b7a9f39dd28f3a1883f95707133b46f
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassChange}/>
              </Form.Group>

<<<<<<< HEAD
              <div style={{ float: "right" }}>
                <Button variant="link">Forgot Password?</Button>
                <br />

                <Button
                  variant="dark"
                  onClick={this.props.loginBtn}
                  style={{ marginRight: "1rem" }}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" style={{ width: "30rem" }}>
              Register a new account
            </Button>
          </Modal.Footer>
=======
      			  <Form.Group>
                    <Button variant="link">Forgot Password?</Button>
                    <Button variant="link">Register a new account</Button>
      			  </Form.Group>

      			  <Button variant="primary" onClick={() => loginSubmit()}>
                Submit
              </Button>
      			  <Button variant="secondary" onClick={() => loginBtn()}>
      			    Cancel
      			  </Button>
            </Form>
          </Modal.Body>
>>>>>>> 4af834829b7a9f39dd28f3a1883f95707133b46f
        </Modal.Dialog>
      </div>
    );

export default Login;
