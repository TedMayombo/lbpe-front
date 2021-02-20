import React, { Component } from 'react'
import Messages from './Messages';
class MessageContainer extends Component {
    render() {
        return (
            <div className="col-sm-12">

            <ul className="nav nav-tabs responsive-tabs">
              <li className="active"><a href="#home1">Home</a></li>
              <li><a href="#profile1">Profile</a></li>
              <li><a href="#messages1">Messages</a></li>
              <li><a href="#settings1">Settings</a></li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="home1">
                <Messages/>
              </div>

              <div className="tab-pane" id="profile1">
                <p>Profile Content ....</p>
              </div>

              <div className="tab-pane" id="messages1">
                <p>Messages Content .....</p>
              </div>

              <div className="tab-pane" id="settings1">
                <p>Settings Content ....</p>
              </div>
            </div>
            
      </div>
        )
    }
}

export default MessageContainer
