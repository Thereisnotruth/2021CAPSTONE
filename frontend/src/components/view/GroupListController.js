//스터디목록 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState,useEffect } from 'react';

import { HeaderController } from '../ui';
import GrouplistView from './GroupListView';
import { useHistory } from 'react-router-dom';
import useStore from '../useStore';


const GrouplistController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();

    const [list,setList] = useState([]); //스터디 목록


    const getlist = async () => {//스터디 목록을 가져오는 함수
        const test = await viewModel.list(); //스터디 목록을 viewModel에 요청
        const status = test?.status;
        setList(test.data);
        if (status === 200) {
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }

    //페이지가 렌더링 되고 다른 입력없이 실행되는 함수(스터디 목록을 가져온다.)
    useEffect(() => {
        getlist();
      },[]);


    const make = () =>{                                     //스터디 생성버튼
        if(Auth.isLogged){                                  //로그인시 스터디 생성페이지로 이동
            history.replace('groupmake');}                  
        else{                                               //비로그인시 로그인 페이지로 이동
            alert('그룹을 생성하려면 로그인이 필요합니다.');
            history.replace('login');
        }
            
    }
    return (
        <>
            <HeaderController header='그룹 목록' />
            <GrouplistView 
                make={make}
                groupdata = {list}
            />
        </>
    );
};

export default GrouplistController;