import React, { useState } from 'react';

import LoginView from './LoginView';

const LoginController = ({ viewModel }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const onIdChange = (e) => {
        setId(e.target.value);
    };
    const onPwChange = (e) => {
        setPw(e.target.value);
    }
    const login = () => {
        viewModel.login(id, pw);
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