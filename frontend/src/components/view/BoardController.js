import React, { useState,useEffect } from 'react';

import { HeaderController  } from '../ui';
import BoardView from './BoardView';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';
import { set } from 'mobx';

const BoardController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();
    const [boardlist,setBoardlist] = useState([]);
    const user_id = Auth.isLogged ? Auth.data.user_id:''
    const [board_name,setBoard_name] = useState('');
    console.log(user_id);
    const getboardlist = async () => {
        const test = await viewModel.boardlist();
        const status = test?.status;
        console.log(test);
        if (status === 200) {
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    useEffect(() => {
        getboardlist();
      },[]);

    const makeboard = ()=>{
        if(Auth.isLogged === false){ history.replace('/login');}
        else{
            if(board_name===''){
                alert('게시판 이름을 작성해야합니다.');
            }
            else{
                viewModel.makeboard(user_id, board_name);
                setBoard_name('');
            }
        }
    }
    const onboardnameChange= (e) =>{
        setBoard_name(e.target.value);
    }
    

    return (
        <>
        <HeaderController header='게시판' />
        <BoardView 
            onboardnameChange={onboardnameChange}
            makeboard={makeboard}
            boardlist = {boardlist}/>
        </>
    );
};

export default BoardController;