import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import GroupMakeView from './GroupMakeView';
import { HeaderController } from '../ui';
import useStore from '../useStore';

const GroupMakeController = ({ viewModel }) => {
    const { Auth } = useStore();
	const user = Auth.data.user_id;
    const [study, setStudy] = useState('');
    const [capacity, setCapacity] = useState('');
    const [message1,setMessage1] = useState('');
    const [message2,setMessage2] = useState('');
    const history = useHistory();
	
    const onStudyChange = (e) => {
        if(e.target.value==='')
            setMessage1('스터디명을 입력해주세요.');
        else{
            setStudy(e.target.value);
            setMessage1('');
        }
    };
    const CapacityChange = (e) =>{
        if(e.target.value==='')
            setMessage2('최대인원수를 선택해주세요.');
        else{
            setMessage2('');
            setCapacity(e.target.value);}
    }
    const MakeStudy = async () => {
        if(study==''|| capacity==''){
            alert('모든 정보를 입력해주세요.');
        }else{
            try {
                await viewModel.makeStudy(user,study,capacity);
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