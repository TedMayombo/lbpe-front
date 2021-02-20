import React, { Component, Fragment } from 'react'
import CreatePost from "../CreatePost";
class UserDetails extends Component {
    constructor( props ) {
		super( props );
	}


	render() {
        console.warn( localStorage.getItem( 'token' ) );
        console.log(this.props);
        console.log(this.props);
		return(
			<React.Fragment>
				<div className="jumbotron" style={{ height: '100vh' }}>
					<h4>Welcome {this.props.match.params.username }!!</h4>
					<CreatePost/>
				</div>
			</React.Fragment>
		)
	}
}

export default UserDetails