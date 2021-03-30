class Manager_SignUp extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            email : '',
            firstname : '',
            lastname : '',
            Password : '',
            address : '',
            dob : '',
            company : '',
            hasRegisterSuccessful : false,
        }
        
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

        render() {
            let {firstname,lastname,email,Password,address,dob,company} = this.state
            return(
                    <div className = "ManagerSignUp">
                         <Formik
                                    initialValues = {{ }}
                                    validateOnChange = {true}
                                    validateOnBlur = {false}
                                    validate = {this.validate}
                                    enableReinitialize = {true}
                                    onSubmit = {this.onSubmit }

                                 >
                                {
                                     (props) => (
                                     <Form>
                                         
                                         <fieldset className = "form-group">

                                         <fieldset className = "form-group">
                                             <label>Emailid</label>
                                             <Field className = "form-control" type = "text" name = "email" onChange= {this.handleChange}></Field>
                                         </fieldset>

                                             <label>FirstName</label>
                                             <Field className = "form-control" type = "text" name = "firstname" onChange= {this.handleChange} ></Field>
                                         </fieldset>

                                         <fieldset className = "form-group">
                                             <label>LastName</label>
                                             <Field className = "form-control" type = "text" name = "lastname" onChange= {this.handleChange}></Field>
                                         </fieldset>

                                       
                                        
                                         {this.state.hasRegisterFailed &&  <div className = "alert alert-warning">Email Id already exists   </div>}
                                         <fieldset className = "form-group">
                                             <label>Password</label>
                                             <Field className = "form-control" type = "text" name = "password" onChange= {this.handleChange} ></Field>
                                         </fieldset>

                                         <fieldset className = "form-group">
                                             <label>Emailid</label>
                                             <Field className = "form-control" type = "text" name = "address" onChange= {this.handleChange}></Field>
                                         </fieldset>

                                         <fieldset className = "form-group">
                                             <label>Phone Number</label>
                                             <Field className = "form-control" type = "text" name = "dob" onChange= {this.handleChange}></Field>
                                         </fieldset>

                                         <fieldset className = "form-group">
                                             <label>Emailid</label>
                                             <Field className = "form-control" type = "text" name = "company" onChange= {this.handleChange}></Field>
                                         </fieldset>

                                       
                                         <button className = "btn btn-success" onClick = {this.onSubmit} type = "submit">Save</button>
                                
                                    </Form>

                           
                                    )

                                }
                                 </Formik>

                    </div>

            )
        }


    
}