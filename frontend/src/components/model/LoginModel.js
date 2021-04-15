import axios from 'axios';

class LoginModel {
    // Model의 로그인 함수
    login(id, pw) {
        try {
            console.log(id, pw);
        } catch(error) {
            console.log(error);
        }
    }
}

export default LoginModel;