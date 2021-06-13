//게시판 화면에서 게시판목록을 보여주는 화면
//여기서 BoardListView는 view모델에서 게시판 목록정보를 받아와 목록을 작성하여 보여주는 ui이다.
import React from 'react';
import { Grid, Button, Divider } from '@material-ui/core';
import {BoardListView} from '../ui';
const BoardList = (props) => {
    return (
        <Grid className='boardlist'>
            <input type='text' 
                className='boardmake' 
                placeholder={'게시판 이름'} 
                onChange={props.onboardnameChange}></input>
            <Button className='makebtn' onClick ={props.makeboard}>게시판 생성</Button>
            <Divider/>
            <BoardListView boardlist={props.boardlist} onClickboard={props.onClickboard}/>
        </Grid>
    )
};

export default BoardList;