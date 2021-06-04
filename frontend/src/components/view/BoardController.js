import React, { useState,useEffect } from 'react';

import { HeaderController  } from '../ui';
import BoardView from './BoardView';

const BoardController = ({ viewModel }) => {
    const [boardlist,setBoardlist] = useState([]);
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
    
    return (
        <>
        <HeaderController header='게시판' />
        <BoardView 
            boardlist = {boardlist}/>
        </>
    );
};

export default BoardController;