import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import GroupMakeView from './GroupMakeView';
import { HeaderController } from '../ui';

const GroupMakeController = ({ viewModel }) => {
	const user = '123';
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
		console.log('user_id: ',user);
        console.log('study_name: ',study);
        console.log('capacity: ', capacity);
        if(study==''|| capacity==''){
            alert('모든 정보를 입력해주세요.');
        }else{
            try {
                await viewModel.MakeStudy(user,study,capacity);
                alert('스터디가 생성되었습니다.');
                history.replace('/grouplist');
            } catch (e) {
                console.log(e);
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