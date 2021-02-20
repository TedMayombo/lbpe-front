import React, { Component } from 'react';
import  MessageItem from './MessageItem';
import axios from 'axios';
export class Messages extends Component {
   
    state ={
        messages: [],
        isLoaded: false
    }
    //make the http request
    componentDidMount(){
       
        axios.get( '/wp-json/wp/v2/messages')
        .then(res => this.setState({
                    messages:res.data,
                    isLoaded: true }))
        .catch(err => console.log(err) );
    }
    render() {
       const {messages, isLoaded} = this.state;
        if(isLoaded){
            return (
                <div>
                    {messages.map( message=>(
                        <MessageItem key={message.id} message={message}/>
                    )
                    )}
                    
                </div>
            );
        }
        return <h3>Loading...</h3>
    }
}

export default Messages
