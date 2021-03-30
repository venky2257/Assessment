import React from 'react'
import { Button,Modal, Navbar } from 'react-bootstrap'
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../service/AuthenticationService';
import Manager_Service from '../service/Manager_Service';
import { Redirect } from 'react-router';

class BootstrapModal extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showHide : false,
            isDialogOpen : false
           
        }
        this.logout = this.logout.bind(this)
     }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    openDialog() {
        this.setState({ isDialogOpen: !this.state.isDialogOpen })
        console.log(this.state.isDialogOpen)
    }

    logout() {
        <Redirect to = '/logout'></Redirect>
    }
    


    render(){
        return( 
            <div className = "headerComponent">
                
                <Navbar>
                    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Button class = "btn btn-primary btn-sm"variant="primary" onClick={() => this.handleModalShowHide()}>Add Employee</Button>
                    <Button Button class = "btn btn-primary btn-sm"variant="primary" onClick={() => this.logout()}>Logout</Button>
                    </Navbar.Collapse>
                </Navbar>


           

                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Employee Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Formik
                          initialValues={{
                            empId: '',
                            firstname: '',
                            lastname: '',
                            address: '',
                            password: '',
                            confirmPassword: '',
                            dob : '',
                            mobile : '',
                            city :''
                        }}
                        validationSchema={Yup.object().shape({
                            firstname: Yup.string()
                                .required('First Name is required'),
                            lastname: Yup.string()
                                .required('Last Name is required'),
                            empId: Yup.string()
                                .required('Employee Id is required'),
                            password: Yup.string()
                                .min(6, 'Password must be at least 6 characters')
                                .required('Password is required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Confirm Password is required'),
                            address: Yup.string()
                                .required('Address is required'),
                            dob: Yup.string()
                                .required('Date of Birth is required'),
                            mobile: Yup.string()
                                .required('Mobile number is required'),
                            city: Yup.string()
                                .required('City is required'),
                            
                        })}
                    
                        onSubmit={fields => {
                            // alert('Confirm Details \n\n' )
                            // this.openDialog()
                            Manager_Service.addEmployee(fields)
                            
                            this.handleModalShowHide()
                        }}


                        render={({ errors, status, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label For="empId">Employee Id</label>
                                    <Field name="empId" type="text" className={'form-control' + (errors.empId && touched.empId ? ' is-invalid' : '')} />
                                    <ErrorMessage name="empId" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label For="firstname">First Name</label>
                                    <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                                    <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label For="lastname">Last Name</label>
                                    <Field name="lastname" type="text" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                                    <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label For="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label For="confirmPassword">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group">
                                    <label For="address">Address</label>
                                    <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group">
                                    <label For="dob">Date of Birth</label>
                                    <Field name="dob" type="date" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} />
                                    <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group">
                                    <label For="mobile">Mobile</label>
                                    <Field name="mobile" type="text" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                    <ErrorMessage name="mobile" component="div" className="invalid-feedback" />

                                </div>

                                <div className="form-group">
                                    <label For="city">City</label>
                                    <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />

                                </div>

                                <div className="form-group">
                                    <button type="submit" className="login">Register</button>
                                    <button type="reset" className="login">Reset</button>
                                </div>
                            </Form>
                        )}
                    />
        
                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" className="login" onClick={() => this.handleModalShowHide()} >Close</button>
                    {/* <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button> */}
                    </Modal.Footer>
                </Modal>


               

            
          </div>
        
        )
    
    }
    
}

export default BootstrapModal;