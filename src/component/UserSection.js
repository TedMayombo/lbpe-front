import React, { Component } from 'react'
import {Row, Col, Image } from "react-bootstrap";
import DefaultUserMale from "./../assets/DefaultUserMale.svg";
import UserMenu from "./UserMenu";

class UserSection extends Component {
  constructor( props ) {
    super( props );
    var mainLoggedIn = false; 

    
    
  }
  
    render() {
      const displayName =window.localStorage.getItem("userDisplayName");
     	
        return (
            <Container-fluid>
             
             <p>{displayName}</p> 
            <Row>
              <Col bsPrefix="col-2"> <Image src={DefaultUserMale} width="100%" roundedCircle /></Col>
              <Col bsPrefix="col-10">
                          <Row>
        <Col bsPrefix="col-12"><h2 className="UserName">{}</h2></Col>
                            </Row>
                            <Row>
                            <Col bsPrefix="col-12">
                             <UserMenu/>
                            </Col>
                                
                            </Row>                                            
                    
              </Col>
            </Row>
            
           
          </Container-fluid>
        )
    }
}

export default UserSection
