import React from 'react';
import { Grid,Button,Divider } from '@material-ui/core';
import { BoardList,PostList} from '../ui';
import { Link} from 'react-router-dom';

const BoardView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='boardlogo'>HELP</Grid>
            <Divider/>
            <Grid className='boardview'>
                <BoardList boardlist={props.boardlist} 
                            onboardnameChange={props.onboardnameChange}
                            makeboard ={props.makeboard}
                            onboard = {props.onboard}
                            boardlist={props.boardlist}/>
                <Grid className='board'>
                    <Button className='makebtn' onClick ={props.makepost}>게시글 생성</Button>
                    <PostList postlist = {props.postlist}/>
                </Grid>
            </Grid>
        </Grid>
    )    
};

export default BoardView;