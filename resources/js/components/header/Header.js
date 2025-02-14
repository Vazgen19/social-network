import React, { Component } from 'react';
import { NavLink, Redirect } from "react-router-dom";
import withDataContext from '../../context/consumers/DataConsumer';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";



class Header extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoggout: false
		}

	}


	handleLogout = () => {
		const token  = localStorage.getItem('token');
		axios.post("http://social.loc/api/logout", {}, { headers: {"Authorization" : `Bearer ${token}`} })
			.then((response) => {
				localStorage.clear();
				this.setState({isLoggout: response.data.status === 200});				
			})
	}

	render() {
		const login = localStorage.getItem("isLoggedIn");
		const isLoggout = this.state.isLoggout;
		if(isLoggout) {
			return <Redirect to='/' />
		}
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
			   	 <span className="navbar-toggler-icon"></span>
			  	</button>			  
			  <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
			    <NavLink to="/" className="navbar-brand">Social Network </NavLink>
			    <ul className="navbar-nav  mt-2 mt-lg-0">
			    {this.props.isLogedIn && (
					<>
						<li className="nav-item">
						<NavLink to="/home" className="navbar-brand">Home </NavLink>
						</li>
						<li className="nav-item">
								<NavLink to="/profile" className="navbar-brand">Profile </NavLink>
						</li>
						<li className="nav-item">
								<Button className="btn btn-success" onClick={this.handleLogout}>Logout</Button>
						</li>
					</>
				)
			      }
			      
			    </ul>
			  </div>
			</nav>
		);
	}
}

export default withDataContext(Header, ['isLogedIn', 'toggleLogedIn'])