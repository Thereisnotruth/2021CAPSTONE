//로그인 되었을때 저장되는 정보들
import { observable } from 'mobx';

const Auth = observable({
    isLogged: false,    //로그인 됨=true,안됨=false
    data: {},           //로그인 한 유저의 정보

    init() {
        this.data = JSON.parse(localStorage.getItem('userInfo'));
        if (this.data != null)
            this.isLogged = true;
        else {
            this.isLogged = false;
        }
    },
    login(userData) {//로그인시 유저 정보 저장
        this.isLogged = true;
        this.data = userData;
        localStorage.setItem('userInfo', JSON.stringify(userData));
    },
    logout() {//로그아웃시 저장된 정보 clear
        this.isLogged = false;
        localStorage.clear();
    },
});

export default Auth;