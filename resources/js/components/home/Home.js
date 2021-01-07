import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import SearchForm from "./SearchForm";
import axios from 'axios';


export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			users: [],
			msg: "",
			isLoading: false
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
		.get("http://social.loc/api/friend",{data, headers: {"Authorization" : `Bearer ${token}`}} )
		.then((response) => {
			this.SetState({
				isLoading: false,
				users: response.data.users,
				msg: response.data.message
			})
		})
		.catch(
			this.setState({isLoading: false})
		)
	}

	render(){
		const login = localStorage.getItem("isLoggedIn");
		
	    if (!login) {
	      return <Redirect to="/sign-in" />
	    }

		return(
			<div className="card">
				<SearchForm message = {this.state.msg} isLoading = {this.state.isLoading} search = {this.state.search} searchHandler = {this.searchHandler} changeHandler = {this.onChangeHandler} />
			</div>
		);
	}
}