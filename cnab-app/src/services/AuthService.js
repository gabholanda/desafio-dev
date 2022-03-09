class AuthService {
    constructor() {
        // this.service = service;
        this.isAuthenticated.bind(this);
        this.isNotAuthenticated.bind(this);
    }


    isAuthenticated = () => true;
    isNotAuthenticated = () => true;
}

export default AuthService;