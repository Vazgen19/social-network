import React, {Component} from 'react';
import withDataContext from '../context/consumers/DataConsumer';
import SignUp from "./signUp/SignUp";
import SignIn from "./signIn/SignIn";
import Header from "./header/Header";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


class App extends Component {

  render() {  
    const login = this.props.isLogedIn;

    return (
      <div className="App">
          <Router>
            <Header />
            <Route  path="/" exact component={SignIn}></Route>     
            <Route  path="/sign-up" component={SignUp }></Route>
            <Route path="/sign-in" component={SignIn}></Route>
            <Route path="/home" component={Home}></Route>
            <Route  path="/profile" component={Profile}></Route>       
          </Router>
      </div>
    );
  }
}

export default withDataContext(App, ['isLogedIn'])