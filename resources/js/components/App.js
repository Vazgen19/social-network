import React, {Component} from 'react';
import SignUp from "./signUp/SignUp";
import SignIn from "./signIn/SignIn";
import Header from "./header/Header";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import FrontPage from "./frontPage/FrontPage"
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


export default class App extends Component {

  render() {  
    const login = localStorage.getItem("isLoggedIn");

    return (
      <div className="App">
          <Router>
            <Header />
            <Route  path="/" exact component={FrontPage}></Route>     
            <Route  path="/sign-up" component={ login ? Home : SignUp }></Route>
            <Route path="/sign-in" component={SignIn}></Route>
            <Route path="/home" component={Home}></Route>
            <Route  path="/profile" component={Profile}></Route>       
          </Router>
      </div>
    );
  }
}