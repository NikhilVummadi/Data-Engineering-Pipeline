import React from 'react';
import { Navbar, Nav, ButtonToolbar, Button } from 'react-bootstrap'

const NavigationBar = ({ uploadFile, loginBtn }) => (
    <>
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">AnalytiQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link"></Nav.Link>
            <ButtonToolbar>
            <Button onClick={uploadFile}  variant="secondary">Upload</Button>
            </ButtonToolbar>
        </Nav>
        <Button variant="primary" onClick={loginBtn}>Login</Button>
        </Navbar.Collapse>
    </Navbar>
    </>
);

export default NavigationBar;
