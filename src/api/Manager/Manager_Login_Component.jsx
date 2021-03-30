import React, {Component} from 'react'
import '../Css/Manager.css'
import Manager_Service from '../service/Manager_Service'
import AuthenticationService from '../service/AuthenticationService'

class Manager_Login_Component extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            hasLoginFailed : false
        }
        this.loginClicked = this.loginClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

   

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    loginClicked = e => { 
        e.preventDefault()
       Manager_Service.checkLogindetails(this.state)
       .then(response => {
           if(response.data) {
            AuthenticationService.registerSuccessfulLogin(this.state.email)
            this.props.history.push({

                pathname : `/welcome/${response.data}`,
                search: '?query=abc',
                state : { firstname: response.data }
            })
           }
           else {
            this.setState({hasLoginFailed : true})
           }
       })
       .catch(error => {
        this.setState({hasLoginFailed : true})
    })
    }



    render() {
        const { email, password } = this.state
        return(
            
            <div className = "managerLogin">
                 <div class="container-fluid">
                    <div class="row main-content bg-success text-center">
                    <div class="col-md-4 text-center company__info">
                    <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
                            <h4 class="company_title">Your Company Logo</h4>

                    </div>
                    <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                            <div class="container-fluid">
                                <div class="row"><h2>Log In</h2></div>
                                <div class="row">
                                    <form onSubmit = {this.loginClicked} control="" class="form-group">
                                    {this.state.hasLoginFailed &&  <div className = "alert alert-danger">Invalid credentials </div>}
                                        <div class="row">
                                       <input type = "text"   name = "email" placeholder = "Email Id" class="form__input"   onChange= {this.handleChange}></input>
                                        </div>
                                        <div class="row">
                                             <span class="fa fa-lock"></span>
                                         <input type="password" name="password" class="form__input" placeholder = "Password" onChange= {this.handleChange} />
                                        </div>
                                        <div class="row">
                                            <button type="submit" class="login">Login</button>
                                        </div>
                                </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

                                
		
               
           
                    
            </div>
            
        )
    }
}

export default Manager_Login_Component  