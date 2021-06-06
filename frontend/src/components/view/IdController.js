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
            console.log(id);
            alert('당신의 아이디는:'+id.data+'입니다.');
            history.replace('/login');
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