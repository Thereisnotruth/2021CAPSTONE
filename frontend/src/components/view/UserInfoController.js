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
    const [state,setState] = useState(1);
    const user_id = Auth.isLogged ? Auth.data.user_id:''
    const onPwChange = (e) => {
        if (cpw===''){
            setMessage('');
            setPw(e.target.value);
        }else{
            if(e.target.value===cpw){
                setMessage('');
                setPw(e.target.value);
            }else{
                setMessage('비밀번호가 일치하지 않습니다.');
                setPw(e.target.value);
            }
        }
    }
    const onCpwChange = (e) => {
        if (e.target.value !== pw) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setCpw(e.target.value);
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
        if(state===1){
            setPw('');
            setCpw('');
            setMessage('');
            setState(2);
        }else if(state===2){
            if(pw===cpw&&pw!==''){
                await viewModel.changepw(user_id,pw);
                alert('비밀번호가 변경되었습니다.');
            }
            setState(1);
        }
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
            pwChange={pwChange}
            message={message}
            state={state}
        />
        </>
    );
};

export default UserInfoController;