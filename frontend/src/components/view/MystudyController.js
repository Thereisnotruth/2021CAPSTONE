import React, { useState,useEffect } from 'react';

import { HeaderController } from '../ui';
import MystudyView from './MystudyView';
import { useHistory } from 'react-router-dom';
import useStore from '../useStore';


const MystudyController = ({ viewModel }) => {
    const [list,setList] = useState([]);
    const { Auth } = useStore();
    const history = useHistory();
    const id = Auth.isLogged ? Auth.data.user_id:'';

    const getlist = async () => {
        const test = await viewModel.mylist(id);
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
    return (
        <>
            <HeaderController header='내스터디' />
            <MystudyView 
                groupdata = {list}
            />
        </>
    );
};

export default MystudyController;