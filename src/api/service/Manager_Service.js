import axios from 'axios'

class Manager_Service{

    checkLogindetails(userDetails) {
        return axios.post('http://localhost:8080/managerLogin', userDetails)
    }

    retrieveAllEmployees() {
        return axios.get('http://localhost:8080/allEmployees')
    }

    addEmployee(employee_details) {
        return axios.post('http://localhost:8080/addEmployee', employee_details)
    }

    updateEmployee(employee_updated_details) {
        console.log(employee_updated_details)
        return axios.post('http://localhost:8080/updateEmployee', employee_updated_details)
    }

    deleteEmployee(employee_details) {
        console.log(employee_details)
        return axios.post('http://localhost:8080/deleteEmployee', employee_details)
    } 

}


export default new Manager_Service()