class AuthenticationService {
    registerSuccessfulLogin(username) {
        sessionStorage.setItem('authenticatedUser',username)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedin() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) return false
        return true
    } 

    
    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }


    getUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) return ''
        return user
    }
}


export default new AuthenticationService()