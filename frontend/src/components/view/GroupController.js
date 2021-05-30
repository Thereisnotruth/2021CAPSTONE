import React, { useState } from 'react';
import { GiRun } from 'react-icons/gi';

import GroupView from './GroupView';
import { HeaderController } from '../ui';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';

const GroupController = ({ viewModel }) => {
    const[groupname,setgroupname] = useState('GroupName');
    const[groupmember,setgroupmember] = useState('5');
    const[Exercisemember,setExercisemember] = useState('2');
    const[notice,setnotice] = useState('notice');
    const { Auth } = useStore();
    const id = Auth .data.user_id;
    const history = useHistory();
    const state = [
        {
            id:1,
            name:'abc',
            time:1234,
            state:0,
        },{
            id:2,
            name:'def',
            time:4321,
            state:0,
            
        },{
            id:3,
            name:'jht',
            time:1111,
            state:1,
           
        },{
            id:4,
            name:'lch',
            time:2222,
            state:1,
           
        },{
            id:5,
            name:'Ktj',
            time:3600,
            state:0,
        }]
        console.log(history);
        const join=()=>{
            if(Auth.isLogged === false){ history.replace('/login');}
            else{
                try {
                    viewModel.join(id);
                    alert('가입되었습니다.');
                } catch (e) {
                    console.log(e);
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
            groupmembers = {state}
            join = {join}
        />
        </>
    );
};

export default GroupController;