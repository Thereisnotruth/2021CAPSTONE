//아이디찾기 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import IdView from './IdView';
import { HeaderController } from '../ui';

const IdController = ({ viewModel }) => {
    const history = useHistory();
    const [email, setEmail] = useState(''); //email

    const onEmailChange = (e) => {//email작성
        setEmail(e.target.value);
    }
    const find = async () => {//유저가 작성한 email로 유저의 ID를 찾는다.
        const connect = await viewModel.findid(email);//아이디 찾기를 email과 함께 viewModel로 요청
        const status = connect?.status;
        if (status === 200) {
            alert('당신의 아이디는'+connect.data.user_id+'입니다.');
            history.replace('/login');
        } else if (status === 404 || status === 403) {
            if(email===''){
                alert('email을 작성하셔야 합니다.');
            }
            else{
            alert(connect.data.detail);}
        } else {
            alert('내부 서버 오류입니다.');
        }
    }
    return (
        <>
        <HeaderController
            header={'아이디찾기'}
        />
        <IdView
            onEmailChange={onEmailChange}
            find={find}
        />
        </>
    );
};

export default IdController;