import React, { useState,useEffect } from 'react';
import { GiRun } from 'react-icons/gi';

import GroupView from './GroupView';
import { HeaderController } from '../ui';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';

const GroupController = ({ viewModel }) => {
    const [memberlist,setMemberlist] = useState([]);
    const [studydetail,setStudydetail] = useState([]);
    const [groupname,setgroupname] = useState('');
    const [groupmember,setgroupmember] = useState('');
    const [Exercisemember,setExercisemember] = useState('');
    const [notice,setnotice] = useState('notice');
    const { Auth } = useStore();
    const id = Auth.isLogged ? Auth.data.user_id:'';
    const [ismember,setIsmember] = useState(false);
    const history = useHistory();
    const address = (history.location.pathname);
    const study_id = address.replace(/[^0-9]/g,'');
    const getmember = async () => {
        const test = await viewModel.member(study_id);
        const status = test?.status;
        setMemberlist(test.data);
        if(test.data.find(element => element.user_id === id)===undefined){
            setIsmember(false);
        }else{
            setIsmember(true);
        }
        const exercise = test.data.filter(element => true === element.exercise_state).length;
        setExercisemember(exercise);
        
        if (status === 200) {
            
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    const getstudy_detail = async () => {
        const test = await viewModel.study_detail(study_id);
        const status = test?.status;
        setStudydetail(test.data);
        setgroupname(test.data.study_name);
        setgroupmember(test.data.current_user_count);
        
        if (status === 200) {
            
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }

    useEffect(() => {
        getstudy_detail();
        getmember();
      },[]);
      
        
        const join=()=>{
            if(Auth.isLogged === false){ history.replace('/login');}
            else{
                if(ismember===false){
                    try {
                        viewModel.join(id,study_id);
                        alert('가입되었습니다.');
                        setnotice('탈퇴됨');
                        setIsmember(true);
                        getstudy_detail();
                        getmember();
                    } catch (e) {
                        console.log(e);
                    }
                }
                else{
                    alert('이미 가입된 곳 입니다.');
                }
            }  
        }
        const disjoin=()=>{
            if(Auth.isLogged === false){ history.replace('/login');}
            else{
                if(ismember===true){
                    try {
                        viewModel.disjoin(id,study_id);
                        alert('탈퇴되었습니다.');
                        setnotice('가입됨');
                        setIsmember(false);
                        getstudy_detail();
                        getmember();
                    } catch (e) {
                        console.log(e);
                    }
                }
                else{
                    alert('해당 스터디의 맴버가 아닙니다.');
                }
            }
        }
        

    return (
        <>
        <HeaderController header={'그룹'}/>
        < GroupView 
            groupname={groupname}
            groupmember={groupmember}
            Exercisemember={Exercisemember}
            notice={notice}
            groupmembers = {memberlist}
            ismember = {ismember}
            join = {join}
            disjoin = {disjoin}
        />
        </>
    );
};

export default GroupController;