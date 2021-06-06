import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PwView from './PwView';
import { HeaderController } from '../ui';

const PwController = ({ viewModel }) => {
    const history = useHistory();
    const [quest, setQuest] = useState('');
    const [hint, setHint] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setUserid] = useState('');

    const onHintChange = (e) =>{
        setHint(e.target.value);
    }
    const onQuestChange = (e) =>{
        setQuest(e.target.value);
    }
    const onEmailChange = (e) =>{
        setEmail(e.target.value);
    }
    const onIdChange = (e) =>{
        setUserid(e.target.value);
    }
    const findPw = () =>{
        if(quest==='' || hint==='' || email==='' || userid===''){
            alert('위의 항목들을 모두 작성해야합니다.');
        }else{
            const pw = viewModel.findpw(userid,email,quest,hint);
            console.log(pw);
            alert('당신의 아이디는:'+pw.data+'입니다.');
            history.replace('/login');
        }
    }

    return (
        <>
        <HeaderController
            header={'비밀번호찾기'}
        />
        <PwView
            onHintChange={onHintChange}
            onQuestChange={onQuestChange}
            onEmailChange={onEmailChange}
            onIdChange={onIdChange}
            findPw={findPw}
        />
        </>
    );
};

export default PwController;