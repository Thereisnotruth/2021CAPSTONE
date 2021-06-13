//내스터디 목록 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState,useEffect } from 'react';

import { HeaderController } from '../ui';
import MystudyView from './MystudyView';
import { useHistory } from 'react-router-dom';
import useStore from '../useStore';


const MystudyController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();

    const [list,setList] = useState([]);                //내스터디 목록
    const id = Auth.isLogged ? Auth.data.user_id:'';    //로그인 되어있으면 현재 사용자id, 안되어있으면 공백

    const getlist = async () => {//내스터디 목록을 가져오는 함수
        const test = await viewModel.mylist(id);//내스터디 목록을 viewModel에 요청
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