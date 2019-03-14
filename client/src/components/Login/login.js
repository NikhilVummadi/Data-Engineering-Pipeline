//Login component
import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import './login.css';
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'



//import { Modal, ModalDialog, modalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap/Modal'



class Login extends Component {
	render() {
		return (
			<div className="background">
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input type="text" placeholder="Username"></input>
					<input type="password" placeholder="Password"></input>
				</Modal.Body>
				<Modal.Footer>
					<button>Cancel</button>
					<button>Login</button>
				</Modal.Footer>
			</Modal.Dialog>
			</div>
		);
	}
}

export default Login;