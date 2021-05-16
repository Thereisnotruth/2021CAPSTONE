import { observable } from 'mobx';

const Auth = obsevable({
    logged: False,
    login() {
        this.logged = True;
    },
    logout() {
        this.logged = False;
    },
});

export default Auth;