import React, { Component } from 'react'
import { Nav, Navbar} from "react-bootstrap";
import LogoWhite from "./../assets/logo-white.svg";
import classnames from 'classnames';
export class AppBar extends Component {
    
    render() {
        return (
          <Navbar className={classnames('AppNav', this.props.styleName)} collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"><img className="logo" src={LogoWhite} alt="logo - Le bon parent d'élève"/>Le bon parent d'élève</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="about"><i className="fas fa-home"></i></Nav.Link>              
              <Nav.Link href="blog"><i className="fas fa-newspaper"></i></Nav.Link>
              <Nav.Link href="contact"><i className="fas fa-comments"></i></Nav.Link>
              <Nav.Link href="app-settings"><i className="fas fa-cog"></i></Nav.Link>
              {/* <NavDropdown title={<i class="fas fa-cog"></i>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"><i class="fa fa-car"></i></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
           
          </Navbar.Collapse>
        </Navbar>   
  )
    }
}

export default AppBar