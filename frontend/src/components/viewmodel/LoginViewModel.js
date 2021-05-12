class LoginViewModel {
    constructor(loginStore) {
        this.store = loginStore;
        this.login = this.login.bind(this);
    }

    login(id, pw) {
        return this.store.login(id, pw);
    }
}

export default LoginViewModel;