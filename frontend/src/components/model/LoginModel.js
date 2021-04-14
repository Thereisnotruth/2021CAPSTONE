import axios from 'axios';

class LoginModel {
    // Model의 로그인 함수
    async login(id, pw) {
        try {
            await axios.post('localhost:4000/v1/auth', {
                userId: id,
                userPw: pw
            }, { withCredentials: true });
        } catch(error) {
            console.log(error);
        }
    }
}

export default LoginModel;