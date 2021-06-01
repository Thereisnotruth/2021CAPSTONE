import React, { useState,useEffect } from 'react';

import { HeaderController } from '../ui';
import GrouplistView from './GroupListView';
import { useHistory } from 'react-router-dom';
import useStore from '../useStore';


const GrouplistController = ({ viewModel }) => {
    
    const [Search,setSearch] = useState('');
    const [list,setList] = useState([]);
    const { Auth } = useStore();
    const history = useHistory();

    const getlist = async () => {
        const test = await viewModel.list();
        const status = test?.status;
        console.log(test);
        setList(test.data);
        console.log(list);
        if (status === 200) {
            
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    useEffect(() => {
        getlist();
      },[]);
    console.log(list);


        
    const onsearchChange = (e) => {
        setSearch(e.target.value);
    }
    const onsearchClick = () => {
        
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
                groupdata = {list}
            />
        </>
    );
};

export default GrouplistController;