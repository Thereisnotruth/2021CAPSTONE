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
    const [postlist,setPostlist] = useState([]);
    const user_id = Auth.isLogged ? Auth.data.user_id:''
    const [board_name,setBoard_name] = useState('');
    const [board,setBoard] = useState('1');

    const getboardlist = async () => {
        const test = await viewModel.boardlist();
        const status = test?.status;
        console.log(test);
        if (status === 200) {
            setBoardlist(test.data);
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    useEffect(() => {
        getboardlist();
        onboard('1');
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
                getboardlist();
            }
        }
    }
    const onboardnameChange= (e) =>{
        setBoard_name(e.target.value);
    }

    const onboard= async(board_id) =>{
        setBoard(board_id);
        const test = await viewModel.boardpostlist(board_id);
        console.log(test.data);
        setPostlist(test.data);
    }

    const makepost = ()=>{
        if(Auth.isLogged === false){ history.replace('/login');}
        else{
            {history.push({
                pathname: "/postmake",
                state: {board_id: board}
              })}
        }
    }
    return (
        <>
        <HeaderController header='게시판' />
        <BoardView 
            onboardnameChange={onboardnameChange}
            makeboard={makeboard}
            makepost={makepost}
            onboard={onboard}
            boardlist = {boardlist}
            postlist = {postlist}/>
        </>
    );
};

export default BoardController;