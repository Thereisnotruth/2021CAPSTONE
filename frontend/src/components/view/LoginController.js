//로그인 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import LoginView from './LoginView';
import { HeaderController } from '../ui';

const LoginController = ({ viewModel }) => {
    const history = useHistory();
    const [id, setId] = useState(''); //ID
    const [pw, setPw] = useState(''); //비밀번호

    const onIdChange = (e) => {//ID작성
        setId(e.target.value);
    }
    const onPwChange = (e) => {//비밀번호작성
        setPw(e.target.value);
    }

    const login = async () => {//로그인
         const connect = await viewModel.login(id, pw);//로그인을 ID,비밀번호와 함께 viewModel로 요청
        const status = connect?.status;
        if (status === 200) {
            history.replace('/');
        } else if (status === 400 || status === 401) {
            setPw('');
            alert('아이디 또는 비밀번호가 잘못되었습니다.')
        } else {
            setPw('');
            alert('내부 서버 오류입니다.');
        }
    }
    return (
        <>
        <HeaderController
            header={'로그인'}
        />
        <LoginView 
            onIdChange={onIdChange}
            onPwChange={onPwChange}
            login={login}
        />
        </>
    );
};

export default LoginController;