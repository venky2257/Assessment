import React, {Component} from "react"
import HeaderComponent from './HeaderComponent'
import {Link, Redirect} from 'react-router-dom'
import { Button,Modal, Navbar } from 'react-bootstrap'
import Manager_Service from '../service/Manager_Service'
import * as Yup from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import validator from 'react-validation';
import AuthenticationService from '../service/AuthenticationService'

class testfile extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      empId : '',
      firstname : '',
      lastname: '',
      address : '',
      dob : '',
      mobile : '',
      city : '',
      showHide : false,
      employees : [],
      errors : {},
      isConfirm : false,
      isDialogOpen : false
    }
    this.getEmployees = this.getEmployees.bind(this)
    this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this)
    this.handleModalShowHide = this.handleModalShowHide.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
   // this.validate = this.validate.bind(this)
   this.validate = this.validate.bind(this)
   this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this)
   this.openDialog = this.openDialog.bind(this)
   this.confirm = this.confirm.bind(this)
   this.logout = this.logout.bind(this)

   
    
  }

  componentDidMount() {
    this.getEmployees()
    console.log(this.state)

}





validate(values) {
  console.log(values)
  this.state.errors = {}
  if (!values.firstname ) {
      this.state.errors.firstname = 'first name required'
      console.log(this.state.errors.firstname.length)
      console.log(this.state.errors.firstname.length - 1)
    }
    else if(values.firstname[0] == ' ' || values.firstname[values.firstname.length - 1] == ' ') {
      this.state.errors.firstname = 'A First Name should not start or end with spaces'
    
  }  if (!values.lastname) {
    this.state.errors.lastname =  'last name required'
  }  else if(values.lastname[0] == ' ' || values.lastname[values.lastname.length-1] == ' ') {
    this.state.errors.firstname = 'A last Name should not start or end with spaces'
  
}
   if (!values.address) {
    this.state.errors.address = 'address required'
  }  else if(values.address[0] == ' ' || values.address[values.firstname.length-1] == ' ') {
    this.state.errors.firstname = 'A Address should not start or end with spaces'
  
}
     if (!values.dob) {
      this.state.errors.dob = 'date of birth required'
  } 
   if (!values.mobile) {
    this.state.errors.mobile = 'mobile required'
}  else if(values.mobile[0] == ' ' || values.mobile[values.mobile.length -1] == ' ') {
  this.state.errors.mobile = 'A mobile number should not start or end with spaces'
} else if(values.mobile.length > 10 || values.mobile.length < 10) {
  this.state.errors.mobile = 'a mobile number should be equal to 10 numbers'
}

 if (!values.city) {
  this.state.errors.city = 'city required'
} else if(values.city[0] == ' ' || values.city[values.city.length-1] == ' ') {
  this.state.errors.city = 'city should not start or end with spaces'

}
  console.log(this.state.errors)


}


handleSubmit = e =>{
  e.preventDefault()
  console.log(this.state.showHide)
  console.log(this.state)
  this.validate(this.state)
  if(Object.keys(this.state.errors).length == 0 ) {
    this.openDialog()
  
    if(this.state.isConfirm) {
      this.openDialog()
    this.handleModalShowHide()
    Manager_Service.updateEmployee(this.state)
    
    window.location.reload(false)
    }
  }
}


openDialog = () => {
  console.log("callled")
  this.setState({ isDialogOpen: !this.state.isDialogOpen }, () =>{
  console.log("is dialog opened" , this.state.isDialogOpen)

  })
}

confirm = () => {
  this.setState({ isConfirm: !this.state.isConfirm }, ()=> {
    this.openDialog()
    console.log("is confirm ",this.state.isConfirm)
  })

}





handleChange(Event) {
  console.log("came to handle change")
  this.setState({[Event.target.name]: Event.target.value})
  console.log({[Event.target.name]:Event.target.value})
  
}




updateEmployeeClicked = (empDetails) =>{
  console.log(empDetails)
  this.setState(
    { 
      empId : empDetails.empId,
      firstname : empDetails.firstname,
      lastname : empDetails.lastname,
      address : empDetails.address,
      dob : empDetails.dob,
      mobile : empDetails.mobile,
      city :empDetails.city
    }, () => {
      console.log(this.state)
      this.handleModalShowHide()
      }
    
  )

}



deleteEmployeeClicked =(empDetails) => {
  console.log(empDetails)
  this.openDialog()
  
    if(this.state.isConfirm) { 
      console.log("conditon is true")
    this.handleModalShowHide()
  Manager_Service.deleteEmployee(empDetails)
  window.location.reload(false);

 

}
}


    logout = () => {
        console.log("logout came")
        this.props.history.push('/logout')
    
    }

  getEmployees() {
    Manager_Service.retrieveAllEmployees()
    .then (
        response => {
            console.log(response)
            this.setState({employees : response.data})
           
        }
    )
      }

    


    handleModalShowHide(){
      this.state.errors = {}
      this.setState({ showHide: !this.state.showHide })
      
    
  }

  





  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    let {empId, firstname, lastname, address, dob, mobile, city} = this.state
    return(

      <div className = "testfile">
        
                
                <Navbar>
                    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Button class = "btn btn-primary btn-sm"variant="primary" onClick={() => this.handleModalShowHide()}>Add Employee</Button>
                    <Button Button class = "btn btn-primary btn-sm"variant="primary" onClick={() => this.logout()}>Logout</Button>
                    </Navbar.Collapse>
                </Navbar>
                    <div class = "container">
                        <table className = "table">
                            <thead>
                                <tr>
                                    <th> Employee Id </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Date Of Birth</th>
                                    <th>Mobile</th>
                                    <th>City</th>
                                    <th>Update Employee</th>
                                    <th>Delete Employee</th>
                                 </tr>
                            </thead>
                            <tbody>
                          {
                            this.state.employees.map(   
                                employee => 
                                 <tr key = {employee.empId}>
                                     <td>{employee.empId}</td>
                                    <td> {employee.firstname} </td>
                                    <td> {employee.lastname} </td>
                                    <td> {employee.address} </td>
                                    <td> {employee.dob} </td>
                                    <td> {employee.mobile} </td>
                                    <td> {employee.city} </td>
                                    <td><Button className = "updatebutton" onClick={() => this.updateEmployeeClicked(employee)} >Update</Button></td>
                                    <td><Button className = "deletebutton" onClick={() => this.deleteEmployeeClicked(employee)} >Delete</Button></td>
                                   
                                </tr>
                             )
                        }
                    </tbody>
                        </table>
                    </div>

                    <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Update Employee Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Formik 
                        initialValues={{ empId,firstname,lastname,address,dob,mobile,city }}

                       
                      
                        validateOnChange={true}
                        validateOnBlur={true}
                        enableReinitialize={true}
                        validate = {this.validate}
                        enableReinitialize = {true}
                        
        
                        onSubmit = {this.handleSubmit}
                        >
                          
                          { 
                            (props) =>(  
                           

                              
                              <Form onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                    
                                    <label For="employee Id">employee id</label>

                                    <Field name="empId" type="text" disabled value = {this.state.empId} className={'form-control' } />
                                        
                                    </div> 
                                    {this.state.errors.firstname   && <div className = "alert alert-danger"> {this.state.errors.firstname}</div> }
                                    <div className="form-group">
                                        <label For="firstname">First Name</label>
                                        <Field name="firstname" type="text" value = {this.state.firstname} onChange = {this.handleChange }className={'form-control'  } />
                                       
                                    </div>
                                    {this.state.errors.lastname && <div className = "alert alert-danger"> {this.state.errors.lastname}</div> }
                                    <div className="form-group">
                                        <label For="lastname">last Name</label>
                                        <Field name="lastname" type="text" value = {this.state.lastname} onChange = {this.handleChange }className={'form-control'   } />
                                       
                                    </div>
                                    {/* <div className="form-group">
                                        <label For="password">Password</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label For="confirmPassword">Confirm Password</label>
                                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div> */}

                                    {this.state.errors.address && <div className = "alert alert-danger"> {this.state.errors.address}</div> }
                                    <div className="form-group">
                                        <label For="address">Address</label>
                                        <Field name="address" type="text" value = {this.state.address} onChange = {this.handleChange }className={'form-control' } />
                                     
                                    </div>
                                    {this.state.errors.dob && <div className = "alert alert-danger"> {this.state.errors.dob}</div> }
                                    <div className="form-group">
                                        <label For="dob">Date of Birth</label>
                                        <Field name="dob" type="date" value = {this.state.dob} onChange = {this.handleChange }className={'form-control'  } />
                                       
                                    </div>
                                    {this.state.errors.mobile  && <div className = "alert alert-danger">required</div> }
                                    <div className="form-group">
                                        <label For="mobile">Mobile</label>
                                        <Field name="mobile" type="text" value = {this.state.mobile} onChange = {this.handleChange }className={'form-control' } />
                                       
                                    </div>
                                    {this.state.errors.city && <div className = "alert alert-danger">required</div> }
                                    <div className="form-group">
                                        <label For="city">City</label>
                                        <Field name="city" type="text" value = {this.state.city} onChange = {this.handleChange }className={'form-control'  } />
                                       
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="login">Register</button>
                                       
                                    </div>
                          </Form>
                             ) }
                    </Formik>
        
                    </Modal.Body>

                    <Modal.Footer>
                    <button type="submit" className="login" onClick={() => this.handleModalShowHide()} >Close</button>
                    {/* <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button> */}
                    </Modal.Footer>
                </Modal>


                  <Modal show={this.state.isDialogOpen}>
                <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Confirm Employee Creating</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="container">
                         <div class="row">
                            <div class="col">
                                <Button className="login"  onClick = {() => this.confirm()} >Confirm</Button></div>
                            <div class="col">
                                <Button className = "login" onClick = {() => this.openDialog()} type="submit">cancel</Button>
                            </div>
                            </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" className = "login"  onClick={() => this.openDialog()}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal> 


      </div>
    )
  }
 
}

export default testfile