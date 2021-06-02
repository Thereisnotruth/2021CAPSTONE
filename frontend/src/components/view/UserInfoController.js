import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import UserInfoView from './UserInfoView';

import { HeaderController } from '../ui';
import useStore from '../useStore';

const { Auth } = useStore();

const UserInfoController = ({ viewModel }) => {
    const [data] = useState(Auth.data);
    const [open, setOpen] = useState(false);
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [message,setMessage] = useState('');

    const onPwChange = (e) => {
        setPw(e.target.value);
    }
    const onCpwChange = (e) => {
        if (e.target.value !== pw) {
            setMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setMessage('');
            setCpw(e.target.value);
        }
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const pwChange = async () => {
        const connect = await viewModel.pwChange()
    }
    return (
        <>
        <HeaderController
            header={'회원정보'}
        />
        <UserInfoView
            data={data}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onPwChange={onPwChange}
            onCpwChange={onCpwChange}
            message={message}
        />
        </>
    );
};

export default UserInfoController;