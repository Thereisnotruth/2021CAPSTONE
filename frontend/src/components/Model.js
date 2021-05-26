import axios from 'axios';

import useStore from './useStore';

const { Auth } = useStore();

class Model {
    constructor() {
        this.login = this.login.bind(this);
    }
    // 스터디 생성
    makeStudy(user, study, capacity) {
        axios.post('/helpapp/study/new', {
            study_leader: user,
            study_name:study,
            study_capacity: capacity,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    // 로그인
    login = (id, pw) => {
        this.loginData = {
            id,
            pw,
        };
        const result = axios.post('/helpapp/login', {
            user_id: id,
            user_pw: pw
        })
        .then((res) => {
            this.loginSuccess(res);
            return res;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return result;
    }
    silentRefresh = () => {
        axios.post('/helpapp/silent-refresh', this.loginData)
        .then(this.loginSuccess)
        .catch(() => {
            Auth.logout();
        });
    }
    loginSuccess = (response) => {
        const accessToken = response.data;
        Auth.login(response.data);
     
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // setTimeout(this.silentRefresh, JWT_EXPIRY_TIME - 60000)
    }
    // 회원가입
    signUp(id, pw, name,gender) {
        axios.post('/helpapp/users/new', {
            user_id: id,
            user_pw: pw,
            user_name: name,
            gender: gender
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        })
    }
    // 운동
    exercise(expart,times) {
        axios.post('/helpapp/exercise', {
            expart: expart,
            times: times
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
    }
}

export default Model;