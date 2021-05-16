import { observable } from 'mobx';

const Auth = observable({
    logged: false,
    login() {
        this.logged = true;
    },
    logout() {
        this.logged = false;
    },
});

export default Auth;