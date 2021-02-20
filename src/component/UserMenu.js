import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown, Form, FormControl,Button } from "react-bootstrap";
import LogoWhite from "./../assets/logo-white.svg";
import classnames from 'classnames';
import UserLogBtn from "./UserLogBtn";
class UserMenu extends Component {
    render() {
        return (
            <Navbar bg="#fff" expand="lg" className={classnames('UserNav', this.props.styleName)}>
  <Navbar.Brand href="#home"><img className="logo" src={LogoWhite} alt="Status - Parent d'élève"/>Parent d'élève</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="#home" title="Compposer un message"><i className="fas fa-edit"></i></Nav.Link>
      <Nav.Link href="#home" title="Changer de statut"><i className="fas fa-exchange-alt"></i></Nav.Link>
      <Nav.Link href="#link" title="Notifications"><i className="fas fa-bell"></i></Nav.Link>
      <Nav.Link href="#link" title="Paramètres de l'utilisateur"><i className="fas fa-user-cog"></i></Nav.Link>
      <Nav.Link href="#link" title="Votre Payement Expire Bientôt"><i className="far fa-money-bill-alt"></i></Nav.Link>
      <Nav.Link href="#link" title="Faire une recherche"><i className="fas fa-search"></i></Nav.Link>
      <Nav.Link href="#link" title="Vos Favorits"><i className="fas fa-thumbs-up"></i></Nav.Link>
      <UserLogBtn/>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        )
    }
}

export default UserMenu
