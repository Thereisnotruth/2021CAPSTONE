//유저정보 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import UserInfoView from './UserInfoView';

import { HeaderController } from '../ui';
import useStore from '../useStore';

const { Auth } = useStore();

const UserInfoController = ({ viewModel }) => {
    const [data] = useState(Auth.data);                     //로그인한 유저의 정보
    const [open, setOpen] = useState(false);                //true=유저정보화면열기,false=유저정보화면닫기
    const [pw, setPw] = useState('');                       //변경 비밀번호
    const [cpw, setCpw] = useState('');                     //변경 비밀번호 확인
    const [message,setMessage] = useState('');              //오류메시지
    const [state,setState] = useState(1);                   //1=비밀번호변경X,2=비밀번호변경O
    const user_id = Auth.isLogged ? Auth.data.user_id:''    //로그인 되어있으면 현재 사용자id, 안되어있으면 공백

    const onPwChange = (e) => {//변경 비밀번호 작성
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
    const onCpwChange = (e) => {//변경 비밀번호 확인 작성
        if (e.target.value !== pw) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setCpw(e.target.value);
        } else {
            setMessage('');
            setCpw(e.target.value);
        }
    }
    const handleOpen = () => {//유저운동정보를 화면보기
        setOpen(true);
    }
    const handleClose = () => {//유저운동정보를 화면닫기
        setOpen(false);
    }
    const pwChange = async () => { //비밀번호 변경 함수
        if(state===1){
            setPw('');
            setCpw('');
            setMessage('');
            setState(2);
        }else if(state===2){
            if(pw===cpw&&pw!==''){
                await viewModel.changepw(user_id,pw);//viewModel에 비밀번호 변경 요청
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