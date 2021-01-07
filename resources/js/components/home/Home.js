import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import axios from 'axios';


export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			users: [],
			msg: "",
			isLoading: false,
			errMsg: "",
		};
	}

	onChangeHandler = (e) => {
		e.preventDefault();
		this.setState({search: e.target.value});
	}

	searchHandler = (e) => {
		e.preventDefault();
		this.setState({isLoading: true});
		const token  = localStorage.getItem('token');
	    const header = { headers: {"Authorization" : `Bearer ${token}`} };
	    const data = {
	    	search: this.state.search
		};
		
		axios
		.post("http://social.loc/api/find-friend",data, header)
		.then((response) => {
			if(response.data.status === 200){
				this.setState({
					isLoading: false,
					users: response.data.users,
					msg: response.data.message
				})
			}
			if (response.data.status === "failed") {
				this.setState({
				  errMsg: response.data.errors.search,
				});
				setTimeout(() => {
				  this.setState({ errMsg: "" });
				}, 2000);
			  }
		})
		.catch(
			this.setState({isLoading: false})
		)
	}

	sendFriendResquestHandler = (id) => {

	}

	render(){
		const login = localStorage.getItem("isLoggedIn");
		
	    if (!login) {
	      return <Redirect to="/sign-in" />
	    }

		return(
			<div className="card">
				<SearchForm 
				isLoading = {this.state.isLoading}
				errMsg = {this.state.errMsg}
				search = {this.state.search}
				searchHandler = {this.searchHandler} 
				changeHandler = {this.onChangeHandler}  />
				
				{ this.state.users.length > 0 && (
					<SearchResult message = {this.state.msg} users = {this.state.users} sendFriendResquestHandler = {this.sendFriendResquestHandler}  />
				) }

			</div>
		);
	}
}