import axios from 'axios';
import useStore from '../useStore';

const JWT_EXPIRY_TIME = 10 * 1000; // jwt 토큰 만료 시간 10분 ( 10 * 1000밀리초 )
const { Auth } = useStore();
class LoginModel {
    constructor() {
        this.login = this.login.bind(this);
    }
    // Model의 로그인 함수
    login = (id, pw) => {
        this.data = {
            id,
            pw,
        };
        axios.post('/helpapp/login', {
            user_id: id,
            user_pw: pw
        })
        .then(this.loginSuccess)
        .catch((e) => {
            return e;
        });
    }
    silentRefresh = () => {
        axios.post('/helpapp/silent-refresh', this.data)
        .then(this.loginSuccess)
        .catch((e) => {

        });
    }
    loginSuccess = (response) => {
        const accessToken = response.data;
        Auth.login(response.data);
     
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // setTimeout(this.silentRefresh, JWT_EXPIRY_TIME - 60000)
    }
}

export default LoginModel;