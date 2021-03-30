import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import login from './login'
import WelcomeComponent from './WelcomeComponent'
import Manager_Login_Component from './Manager_Login_Component'
import HeaderComponent from './HeaderComponent'
import formComponent from './formComponent'
import UpdateEmployee from './UpdateEmployee'
import testfile from './testfile'
import functionfile from './funtionfile'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'


class Application extends Component {
    render() {
        return(
            <div className = "Application">
                <Router>
                    <Switch>
                        <Route path = "/" exact component = {Manager_Login_Component}></Route>
                        <Route path = "/login"  component = {Manager_Login_Component}></Route>
                        <AuthenticatedRoute path ="/welcome/:name" component = {WelcomeComponent}/>
                         <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                         <Route component={ErrorComponent}/>
                     
                    </Switch>

                </Router>
            </div>
        )
    }
}

export default Application