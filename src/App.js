import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from './component/AppBar';
import UserSection  from './component/UserSection';  
import MessageContainer from './component/MessageContainer';
import Login from './component/Login';
import LoginForm from './component/LoginForm';
import Dashboard from './component/Dashboard';
import About  from './component/pages/About';
import AppSettings  from './component/pages/AppSettings';
import Blog  from './component/pages/Blog';
import Contact  from './component/pages/Contact';
import Favourite  from './component/pages/Favourite';
import Page404  from './component/pages/Page404';
import SearchResults  from './component/pages/SearchResults';
import UserDetails from './component/pages/UserDetails';
import Terms from './component/Terms';
import Loader from "./loader.gif";
import axios from 'axios';
import clientConfig from './client-config';
import Register from './component/Register';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'


class App extends Component {

  constructor( props ) {
    super( props );
   
      this.state = {
        hasEverSignedIn:false,
       isLoggedIn: false,
       client_id:"wEY5ksuCIzOuftVanqXcwN82gJrE73X5feIupWxE",
       response_type:"code"
       //scope:"",
       //oauthState:""
      };
      
     
    }
   //this.checkLogin();
 
  
  updateState = () => {
    if(window.localStorage.getItem("token")){
      
     this.setState({
      isLoggedIn: true
     },() => {  })
    }
   
    }

    startSignUp = ( event ) => {	
      event.preventDefault();
     
        
    }
      
   
 componentDidMount() { this.updateState()}
  render(){

    const isLoggedIn = this.state. isLoggedIn;
    if( isLoggedIn==true ){
      return (
     
        
            <Fragment>
           
                    <AppBar/>
                    <UserSection  isLoggedIn={this.state.isLoggedIn}/>
                    <Router>
                    <Switch>
                          <Route path="/" exact component={MessageContainer}/>
                          <Route path="/about" component={About}/>
                          <Route path="/app-settings" component={AppSettings}/>
                          <Route path="/blog" component={Blog}/>
                          <Route path="/contact" component={Contact}/>
                          <Route path="/favourite" component={Favourite}/>
                          <Route path="/page404" component={Page404}/>
                          <Route path="/search-results" component={SearchResults}/>
                          <Route path="/userdetails/:username" exact strict component={UserDetails}/>
                          <Route path="/login" component={Login}/>
                          <Route path="/loginForm" component={LoginForm}/>
                          <Route path="/terms" component={Terms}/>
                      </Switch> 
                      </Router>    
              </Fragment>
            
        );
    }
    else{ return (
        
    <Fragment>
        <Router>
                    <Switch>
                          <Route path="/terms" component={Terms} exact strict/>
                         
                      </Switch> 
                      </Router>  
     
    <Login />
    </Fragment>);}
  
  }
}


export default App;
