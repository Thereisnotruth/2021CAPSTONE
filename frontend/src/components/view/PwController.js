import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PwView from './PwView';
import { HeaderController } from '../ui';

const PwController = ({ viewModel }) => {
    const history = useHistory();
    const [quest, setQuest] = useState('');
    const [hint, setHint] = useState('');
    const [userid, setUserid] = useState('');
    const [name, setName] = useState('');

    const onHintChange = (e) =>{
        setHint(e.target.value);
    }
    const onQuestChange = (e) =>{
        setQuest(e.target.value);
    }
    const onNameChange = (e) =>{
        setName(e.target.value);
    }
    const onIdChange = (e) =>{
        setUserid(e.target.value);
    }
    const findPw = async() =>{
        if(quest==='' || hint==='' || name==='' || userid===''){
            alert('위의 항목들을 모두 작성해야합니다.');
        }else{
            const connect = await viewModel.findpw(userid,name,quest,hint);
            const status = connect?.status;
            if (status === 200) {
                alert(userid+'아이디의 비밀번호는'+connect.data.user_pw+'입니다.');
                history.replace('/login');
            } else if (status === 403) {
                alert(connect.data.message);
            }else if(status === 404){
                alert(connect.data.detail);
            }
             else {
                alert('내부 서버 오류입니다.');
            }
        }
    }
    const find = async () => {
        
    }

    return (
        <>
        <HeaderController
            header={'비밀번호찾기'}
        />
        <PwView
            onHintChange={onHintChange}
            onQuestChange={onQuestChange}
            onNameChange={onNameChange}
            onIdChange={onIdChange}
            findPw={findPw}
        />
        </>
    );
};

export default PwController;