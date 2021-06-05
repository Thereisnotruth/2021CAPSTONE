import React from 'react';
import { Grid, Button, Divider } from '@material-ui/core';

import {BoardListView} from '../ui';
import useStore from '../useStore';
const BoardList = (props) => {
    return (
        <Grid className='boardlist'>
            <input type='text' 
                className='boardmake' 
                placeholder={'게시판 이름'} 
                onChange={props.onboardnameChange}></input>
            <Button className='makebtn' onClick ={props.makeboard}>게시판 생성</Button>
            <Divider/>
            <BoardListView boardlist={props.boardlist}/>
        </Grid>
    )
};

export default BoardList;