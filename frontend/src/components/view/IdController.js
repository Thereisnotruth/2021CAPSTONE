import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import IdView from './IdView';
import { HeaderController } from '../ui';

const IdController = ({ viewModel }) => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const find =() =>{
        if(email !==''){
            const id = viewModel.findid(email);
            const status = id?.status;
            console.log(id);
            if (status === 200) {
                alert('당신의 아이디는:'+id.data+'입니다.');
                history.replace('/login');
            } else if (status === 400 || status === 401) {
                alert('아이디 또는 비밀번호가 잘못되었습니다.')
            } else {
                alert('내부 서버 오류입니다.');
            }
        }
        else{
            alert('위의 항목을 모두 작성해야합니다.');
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