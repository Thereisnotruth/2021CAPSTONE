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
    const find = async () => {
        const connect = await viewModel.findid(email);
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