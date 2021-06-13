//스터디생성 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import GroupMakeView from './GroupMakeView';
import { HeaderController } from '../ui';
import useStore from '../useStore';

const GroupMakeController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();         
	const user = Auth.data.user_id;                 //로그인 되어있으면 현재 사용자id, 안되어있으면 공백
    const [study, setStudy] = useState('');         //만들 스터디 이름
    const [capacity, setCapacity] = useState('');   //만들 스터디 수용인원
    const [message1,setMessage1] = useState('');    //오류메시지1
    const [message2,setMessage2] = useState('');    //오류메시지2
	
    const onStudyChange = (e) => {//만들 스터디 이름
        if(e.target.value==='')
            setMessage1('스터디명을 입력해주세요.');
        else{
            setStudy(e.target.value);
            setMessage1('');
        }
    };
    const CapacityChange = (e) =>{//만들 스터디 수용인원
        if(e.target.value==='')
            setMessage2('최대인원수를 선택해주세요.');
        else{
            setMessage2('');
            setCapacity(e.target.value);}
    }
    const MakeStudy = async () => {//스터디 생성
        if(study==''|| capacity==''){//모든 정보를 입력했는지 확인
            alert('모든 정보를 입력해주세요.');
        }else{
            try {
                await viewModel.makeStudy(user,study,capacity);//스터디 생성을 viewModel로 필요정보와 함께 요청
                alert('스터디가 생성되었습니다.');
                history.replace('/grouplist');
            } catch (e) {
            }
        }

    }
    
    return (
        <>
            <HeaderController header='그룹생성' />
            <GroupMakeView 
                onStudyChange={onStudyChange}
                CapacityChange={CapacityChange}
                message1={message1}
                message2={message2}
                MakeStudy={MakeStudy}
            />
        </>
    );
};

export default GroupMakeController;