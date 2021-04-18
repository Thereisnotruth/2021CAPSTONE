import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import LoginView from './LoginView';

const LoginController = ({ viewmodel }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const history = useHistory();
    const onIdChange = (e) => {
        setId(e.target.value);
    };
    const onPwChange = (e) => {
        setPw(e.target.value);
    }
    const login = () => {
       try {
           viewmodel.login(id, pw);
           history.replace("/");
    } catch (error) {
        setPw('');
        window.alert('아이디와 비밀번호가 일치하지 않습니다.');
    }
}
    return (
        <LoginView 
            onIdChange={onIdChange}
            onPwChange={onPwChange}
            login={login}
        />
    );
};

export default LoginController;