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
    exercise(expart, times, btn) {
        let socketPath = 'ws://10.42.127.222:8000/ws/helpapp/' + Auth.data.user_id;
        console.log(btn)
        const socket = new WebSocket(socketPath);

        socket.onopen = function () {
            socket.send(
                JSON.stringify({
                    user_id: Auth.data.user_id,
                    time: times,
                    expart: expart,
                    btn: btn
                })
            )
        }
    }
    //가입
    join(user,study) {
        axios.post('../helpapp/studies/'+study+'/join', {
            study_id: study,
            user_id: user
        })
        .then((res) => {
            return res;
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
            return res;
        })
        .catch((e) => {
            console.log(e);
        });
    }
    //스터디 목록
    list = () => { 
        let data = axios.get('/helpapp/studies')
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
        return data;
    }
    //스터디내의 유저들정보
    member = (study_id) =>{ 
        let data = axios.post('../../helpapp/studies/'+study_id+'/userlist',{
            study_id: study_id
        })
            .then((res)=>{
                return res;});
        return data;
    }
    //게시판 리스트
    boardlist = () =>{ 
        let data = axios.get('/helpapp/boards')
            .then((res)=>{
                return res;});
        return data;
    }
    //게시판 생성
   makeboard = (user_id, board_name) =>{ 
    let data = axios.post('/helpapp/boards/new',{
        user_id: user_id, 
        board_name: board_name
    })
        .then((res)=>{
            return res;});
    console.log(data);
    return data;
    }
   //게시판 조회
   board_search = (board_id) =>{ 
    let data = axios.post('/helpapp/boards/'+board_id,{
        board_id: board_id
    })
        .then((res)=>{
            return res;});
    console.log(data);
    return data;
    }
    //게시판 수정
    board_update = (board_id,board_name,user_id) =>{ 
    let data = axios.post('/helpapp/boards/'+board_id+'/update',{
        board_id: board_id,
        board_name: board_name,
        user_id: user_id
    })
        .then((res)=>{
            return res;});
    console.log(data);
    return data;
    }
    //게시판 삭제
    board_delete = (user_id,board_id) =>{ 
    let data = axios.post('/helpapp/boards/'+board_id+'/delete',{
        user_id: user_id,
        board_id: board_id
    })
        .then((res)=>{
            return res;});
    console.log(data);
    return data;
    }
    //특정 게시판글들 조회
    boardpostlist = (board_id) =>{ 
    let data = axios.post('/helpapp/boards/'+board_id+'/board_postlist',{
        board_id: board_id
    })
        .then((res)=>{
            return res;});
    console.log(data);
    return data;
    }
    //게시판글 작성
    makepost= (board_id,user_id,post_title,post_content) =>{ 
    let data = axios.post('/helpapp/posts/new',{
        board_id: board_id,
        user_id: user_id,
        post_title: post_title,
        post_content: post_content
    })
        .then((res)=>{
            return res;});
    console.log(data);
    return data;
    }
    //특정 게시글 조회
    postdetail = (post_id) =>{ 
        let data = axios.post('/helpapp/posts/'+post_id,{
            post_id: post_id
        })
            .then((res)=>{
                return res;});
        console.log(data);
        return data;
        }
    
}

export default Model;