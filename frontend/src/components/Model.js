//서버와 연동하는 부분//

import { ContactSupportOutlined } from '@material-ui/icons';
import axios from 'axios';
import useStore from './useStore';
const { Auth } = useStore();

class Model {
    constructor() {
        this.login = this.login.bind(this);
    }
    // 스터디 생성 (유저id,스터디이름,스터디수용가능인원)
    makeStudy(user, study, capacity) {
        axios.post('/studies/new', {
            user_id: user,
            study_name:study,
            capacity: capacity,
        })
        .then((res) => {
        })
        .catch((e) => {
        });
    }
    // 로그인(아이디,비밀번호)
    login = (id, pw) => {
        this.loginData = {
            id,
            pw,
        };
        const result = axios.post('/login', {
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
        axios.post('/silent-refresh', this.loginData)
        .then(this.loginSuccess)
        .catch(() => {
            Auth.logout();
        });
    }
    // 로그인 성공시 {Auth}에 유저 정보 저장
    loginSuccess = (response) => {
        const accessToken = response.data;
        Auth.login(response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // setTimeout(this.silentRefresh, JWT_EXPIRY_TIME - 60000)
    }

    // 회원가입(아이디,비밀번호,이름,성별,e-mail,질문,대답)
    signUp(id, pw, name,gender, email, quest, hint) {
        const result = axios.post('/users/new', {
            user_id: id,
            user_pw: pw,
            user_name: name,
            gender: gender,
            question_number: Number(quest),
            hint: hint,
            email: email
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return result;
    }
    // 운동 (부위, 시간, 운동상태전송) 1=>운동중, 2=>운동종료
    exercise(expart, times, btn) {
        let socketPath = 'ws://192.168.0.103:8000/ws/helpapp/' + Auth.data.user_id;
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
    //가입(유저ID,스터디ID)
    join(user,study) {
        axios.post('../studies/'+study+'/join', {
            study_id: study,
            user_id: user
        })
        .then((res) => {
            return res;
        })
        .catch((e) => {
        });
    }
    //탈퇴(유저ID,스터디ID)
    disjoin(user,study) {
        axios.post('../studies/'+study+'/disjoin', {
            study_id: study,
            user_id: user
        })
        .then((res) => {
            return res;
        })
        .catch((e) => {
        });
    }
    //스터디 목록 - DB에 있는 스터디들의 정보를 가져온다.
    list = () => { 
        let data = axios.get('/studies')
            .then((res)=>{
                return res;});
        return data;
    }
    //스터디 세부정보(스터디ID) - DB에 있는 특정 스터디의 세부정보를 가져온다.
    study_detail = (study_id) =>{ 
        let data = axios.post('../../studies/'+study_id,{
            study_id: study_id})
            .then((res)=>{
                return res;});
        return data;
    }
    //스터디내의 유저들정보(스터디ID)
    member = (study_id) =>{ 
        let data = axios.post('../../studies/'+study_id+'/userlist',{
            study_id: study_id
        })
            .then((res)=>{
                return res;});
        return data;
    }
    //게시판 리스트 -DB에 있는 게시판들의 정보를 가져온다.
    boardlist = () =>{ 
        let data = axios.get('/boards')
            .then((res)=>{
                return res;});
        return data;
    }
    //게시판 생성(유저ID, 게시판이름)
   makeboard = (user_id, board_name) =>{ 
    let data = axios.post('/boards/new',{
        user_id: user_id, 
        board_name: board_name
    })
        .then((res)=>{
            return res;});
    return data;
    }
   //게시판 조회 (게시판ID)
   board_search = (board_id) =>{ 
    let data = axios.post('/boards/'+board_id,{
        board_id: board_id
    })
        .then((res)=>{
            return res;});
    return data;
    }
    //게시판 수정 (게시판ID, 수정될게시판이름, 유저ID) - 유저ID가 게시판 만든유저와 같아야 수정된다.
    board_update = (board_id,board_name,user_id) =>{ 
    let data = axios.post('/boards/'+board_id+'/update',{
        board_id: board_id,
        board_name: board_name,
        user_id: user_id
    })
        .then((res)=>{
            return res;});
    return data;
    }
    //게시판 삭제 (유저ID, 게시판ID) - 유저ID가 게시판 만든유저와 같아야 삭제된다.
    board_delete = (user_id,board_id) =>{ 
    let data = axios.post('/boards/'+board_id+'/delete',{
        user_id: user_id,
        board_id: board_id
    })
        .then((res)=>{
            return res;});
    return data;
    }
    //특정 게시판글들 조회(게시판ID) - 특정게시판에 있는 게시글들의 정보를 배열로 가져온다.
    boardpostlist = (board_id) =>{ 
    let data = axios.post('/boards/'+board_id+'/board_postlist',{
        board_id: board_id
    })
        .then((res)=>{
            return res;});
    return data;
    }
    //게시판글 작성(게시판ID, 유저ID,제목,내용)
    makepost= (board_id,user_id,post_title,post_content) =>{ 
    let data = axios.post('/posts/new',{
        board_id: board_id,
        user_id: user_id,
        post_title: post_title,
        post_content: post_content
    })
        .then((res)=>{
            return res;});
    return data;
    }
    //특정 게시글 조회 (게시글ID)
    postdetail = (post_id) =>{ 
        let data = axios.post('/posts/'+post_id,{
            post_id: post_id
        })
            .then((res)=>{
                return res;});
        return data;
    }
    //특정 게시글 수정 (게시글ID, 유저ID,수정제목,수정내용) - 유저ID가 생성한유저와 같아야 수정된다.
    updatepost = (post_id, user_id, post_title, post_content) =>{ 
        let data = axios.post('/posts/'+post_id+'/update',{
            post_id: post_id,
            user_id: user_id,
            post_title: post_title,
            post_content: post_content

        })
            .then((res)=>{
                return res;});
        return data;
    }
    //특정 게시글 삭제 (게시글ID, 유저ID) - 유저ID가 생성한유저와 같아야 삭제된다.
    deletepost = (post_id, user_id) =>{ 
        let data = axios.post('/posts/'+post_id+'/delete',{
            post_id: post_id,
            user_id: user_id
        })
            .then((res)=>{
                return res;});
        return data;
    }
    //아이디 찾기(e-mail) - DB에 e-mail이 존재할경우 ID를 return
    findid =(email)=>{
        const data = axios.post('/users/find_id',{
            email: email
        })
        .then((res)=>{
            return res;})
        .catch((error) => {
            return error.response;
        });
        return data;
    }
    //비밀번호 찾기 (유저ID, 유저이름, 질문, 대답) - 전부 DB내용과 일치해야 비밀번호를 return해준다.
    findpw =(userid,user_name,quest,hint)=>{
        const data = axios.post('/users/find_pw',{
            user_id: userid, 
            user_name: user_name, 
            question_number: Number(quest),
            hint: hint
        })
        .then((res)=>{
            return res;})
        .catch((error) => {
            return error.response;
        });
        return data;
    }
    //비밀번호변경(유저id, 변경할비밀번호)
    changepw = (id, pw) => {
        this.loginData = {
            id,
            pw,
        };
        const result = axios.post('/users/change_pw', {
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
    //내 스터디 목록 (유저ID) 해당유저가 속한 스터디들을 배열로 return해준다.
    mylist = (user_id) =>{ 
        const data = axios.post('users/'+user_id+'/mygroups',{
            user_id: user_id
        })
            .then((res)=>{
                return res;});
        return data;
    }
    
}

export default Model;