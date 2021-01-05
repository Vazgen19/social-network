import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        surname: "",
        email: "",
        password: "",
        isLoading: "",
      },
      msg: "",
    };
  }

  onChangehandler = (e) => {
    const { signupData } = this.state;    
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://social.loc/api/sign-up", this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              name: "",
              surname: "",
              email: "",
              password: "",
            },
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
    return (
      <div className="container card justify-content-center align-items-center">
        <Form className="containers">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input
              type="text"
              name="surname"
              placeholder="Enter your surname"
              defaultValue={this.state.signupData.surname}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              defaultValue={this.state.signupData.email}
              onChange={this.onChangehandler}
            />
          </FormGroup>          
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              defaultValue={this.state.signupData.password}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-white">{this.state.msg}</p>
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSubmitHandler}
          >
            Sign Up
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
          <Link to="/sign-in" className="text ml-5">I'm already member</Link>
        </Form>
      </div>
    );
  }
}