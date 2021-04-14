class LoginViewModel {
    constructor(loginStore) {
        this.store = loginStore;
    }

    login(id, pw) {
        this.store.login(id, pw);
    }
}

export default LoginViewModel;