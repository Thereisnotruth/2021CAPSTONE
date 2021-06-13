//비밀번호찾기 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PwView from './PwView';
import { HeaderController } from '../ui';

const PwController = ({ viewModel }) => {
    const history = useHistory();
    const [quest, setQuest] = useState('');     //질문번호
    const [hint, setHint] = useState('');       //대답
    const [userid, setUserid] = useState('');   //유저ID
    const [name, setName] = useState('');       //이름

    const onIdChange = (e) =>{//아이디작성
        setUserid(e.target.value);
    }
    const onNameChange = (e) =>{//이름작성
        setName(e.target.value);
    }
    const onQuestChange = (e) =>{//질문선택
        setQuest(e.target.value);
    }
    const onHintChange = (e) =>{//대답작성
        setHint(e.target.value);
    }
    
    
    
    const findPw = async() =>{//비밀번호 찾기 함수
        if(quest==='' || hint==='' || name==='' || userid===''){
            alert('위의 항목들을 모두 작성해야합니다.');
        }else{
            const connect = await viewModel.findpw(userid,name,quest,hint);//비밀번호 찾기를 필요정보와함께 viewModel에게 요청
            const status = connect?.status;
            if (status === 200) {
                alert(userid+'아이디의 비밀번호는'+connect.data.user_pw+'입니다.');
                history.replace('/login');
            } else if (status === 403) {//이름과 힌트를 다시 확인해주세요.
                alert(connect.data.message);
            }else if(status === 404){//찾을 수 없습니다.
                alert(connect.data.detail);
            }
             else {
                alert('내부 서버 오류입니다.');
            }
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
            onNameChange={onNameChange}
            onIdChange={onIdChange}
            findPw={findPw}
        />
        </>
    );
};

export default PwController;