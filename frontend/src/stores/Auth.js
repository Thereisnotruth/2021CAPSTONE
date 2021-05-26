import { observable } from 'mobx';

const Auth = observable({
    isLogged: false,
    data: {},

    init() {
        this.data = JSON.parse(localStorage.getItem('userInfo'));
        if (this.data != null)
            this.isLogged = true;
        else {
            this.isLogged = false;
        }
    },
    login(userData) {
        this.isLogged = true;
        localStorage.setItem('userInfo', JSON.stringify(userData));
    },
    logout() {
        this.isLogged = false;
        localStorage.clear();
    },
});

export default Auth;