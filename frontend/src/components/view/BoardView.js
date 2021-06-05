import React from 'react';
import { Grid,Button } from '@material-ui/core';
import { BoardList} from '../ui';
import { Link} from 'react-router-dom';

const BoardView = (props) => {
    return (
        <Grid container direction='column'>
            <BoardList boardlist={props.boardlist} 
                        onboardnameChange={props.onboardnameChange}
                        makeboard ={props.makeboard}
                        boardlist={props.boardlist}/>
            <Grid className='board'>
                test
            </Grid>
        </Grid>
    )    
};

export default BoardView;