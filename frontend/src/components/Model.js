import { ContactSupportOutlined } from '@material-ui/icons';
import axios from 'axios';

import useStore from './useStore';

const { Auth } = useStore();

class Model {
    constructor() {
        this.login = this.login.bind(this);
    }
    // 스터디 생성
    makeStudy(user, study, capacity) {
        axios.post('/helpapp/studies/new', {
            user_id: user,
            study_name:study,
            capacity: capacity,
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
        const result = axios.post('/helpapp/users/new', {
            user_id: id,
            user_pw: pw,
            user_name: name,
            gender: gender
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return result;
    }
    // 운동
    exercise(expart, times) {
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
    //가입
    join(user,study) {
        axios.post('../helpapp/studies/'+study+'/join', {
            study_id: study,
            user_id: user
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    //탈퇴
    disjoin(user,study) {
        axios.post('../helpapp/studies/'+study+'/disjoin', {
            study_id: study,
            user_id: user
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    //스터디 목록
    list = () =>{ 
        let data = axios.get('helpapp/studies')
            .then((res)=>{
                return res;});
        console.log(data);
        return data;
    }
    //스터디 세부정보
    study_detail = (study_id) =>{ 
        let data = axios.post('../../helpapp/studies/'+study_id,{
            study_id: study_id})
            .then((res)=>{
                return res;});
        console.log(data);
        return data;
    }
    //스터디내의 유저들정보
    member = (study_id) =>{ 
        let data = axios.post('../../helpapp/studies/'+study_id+'/userlist',{
            study_id: study_id
        })
            .then((res)=>{
                return res;});
        console.log(data);
        return data;
    }
}

export default Model;