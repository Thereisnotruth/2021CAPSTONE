import React, { useState } from 'react';

import { HeaderController } from '../ui';
import GrouplistView from './GroupListView';
import { useHistory } from 'react-router-dom';
import useStore from '../useStore';


const GrouplistController = ({ viewModel }) => {
    const[Search,setSearch] = useState('');
    const { Auth } = useStore();
    const history = useHistory();
    const state = [
        {
            study_id:1,
            study_name:'PTgroup',
            user_id:'JHT',
            study_total_time:'1시간50분',
            capacity:'8',
            created_at:'2021.4.18',
            
        },{
            study_id:2,
            study_name:'Prism',
            user_id:'Jeon',
            study_total_time:'50분40초',
            capacity:'15',
            created_at:'2021.3.20',
        },{
            study_id:3,
            study_name:'Prism',
            user_id:'Jeon',
            study_total_time:'50분40초',
            capacity:'15',
            created_at:'2021.3.20',
        }]

    const onsearchChange = (e) => {
        setSearch(e.target.value);
    }
    const onsearchClick =() =>{
        
    }
    const make = () =>{
        if(Auth.isLogged){
            history.replace('groupmake');}
        else{
            alert('그룹을 생성하려면 로그인이 필요합니다.');
            history.replace('login');
        }
            
    }
    return (
        <>
            <HeaderController header='그룹 목록' />
            <GrouplistView 
                onsearchChange={onsearchChange}
                onsearchClick={onsearchClick}
                make={make}
                groupdata = {state}
            />
        </>
    );
};

export default GrouplistController;