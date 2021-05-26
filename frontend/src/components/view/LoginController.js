import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import LoginView from './LoginView';
import { HeaderController } from '../ui';

const LoginController = ({ viewModel }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const history = useHistory();
    const onIdChange = (e) => {
        setId(e.target.value);
    }
    const onPwChange = (e) => {
        setPw(e.target.value);
    }

    const login = async () => {
 
        const test = await viewModel.login(id, pw);
        const status = test?.status;

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