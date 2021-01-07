import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FriendsList from "./FriendsList";

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userData: JSON.parse(localStorage.getItem('userData'))
		}
	}

  onChangehandler = (e) => {
    const { userData } = this.state;    
    userData[e.target.name] = e.target.value;
    this.setState({ userData });
  };
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const token  = localStorage.getItem('token');
    const header = { headers: {"Authorization" : `Bearer ${token}`} };
    const data = {
    	name: this.state.userData.name,
    	surname: this.state.userData.surname
    }
    axios
      .post("http://social.loc/api/profile", data, header)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
          this.setState({
            msg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }

        if (response.data.status === "failed") {
          this.setState({ msg: response.data.message });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  };

	render() {
		const isLoading = this.state.isLoading;
		const login = localStorage.getItem("isLoggedIn");
	    if (!login) {
	      return <Redirect to="/sign-in" />
	    }
		return (
		  <div className="container card ">
		        <Form className="containers">
		          <FormGroup>
		            <Label for="name">Name</Label>
		            <Input
		              type="text"
		              name="name"
		              placeholder="Enter name"
		              defaultValue={this.state.userData.name}
		              onChange={this.onChangehandler}
		            />
		          </FormGroup>
		          <FormGroup>
		            <Label for="surname">Surname</Label>
		            <Input
		              type="text"
		              name="surname"
		              placeholder="Enter your surname"
		              defaultValue={this.state.userData.surname}
		              onChange={this.onChangehandler}
		            />
		          </FormGroup>
		          <p className="text">{this.state.msg}</p>
		          <Button
		            className="text-center mb-4"
		            color="success"
		            onClick={this.onSubmitHandler}
		          >
		            Update
		            {isLoading ? (
		              <span
		                className="spinner-border spinner-border-sm ml-5"
		                role="status"
		                aria-hidden="true"
		              ></span>
		            ) : (
		              <span></span>
		            )}
		          </Button>
		        </Form>
		        <FriendsList />
		  </div>
		);
	}
}