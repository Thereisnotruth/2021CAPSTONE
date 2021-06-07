import React from 'react';
import { Grid } from '@material-ui/core';


import { Timer, Char} from '../ui';

const HomeView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='contents'>
                <Grid className ='IdView'>
                    <Char/>
                    <Timer
                        time={props.time}
                        message={props.message}
                        status={props.status}
                        start={props.start}
                        run={props.run}
                        stop={props.stop}
                        exerciseChange={props.exerciseChange}/>
                </Grid>
            </Grid>
        </Grid>
    )    
};

export default HomeView;