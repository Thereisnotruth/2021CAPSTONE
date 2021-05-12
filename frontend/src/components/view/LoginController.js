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
       try {
            const res = await viewModel.login(id, pw);
            history.replace('/');
        } catch (error) {
            setPw('');
            alert('아이디와 비밀번호가 일치하지 않습니다.');
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