import axios from 'axios';
import useStore from '../useStore';

class LoginModel {
    constructor() {
        // this.Auth = useStore();
        this.login = this.login.bind(this);
    }
    // Model의 로그인 함수
    async login(id, pw) {
        const res = await axios.post('/helpapp/login', {
            user_id: id,
            user_pw: pw
        });
         return res;

    }
}

export default LoginModel;