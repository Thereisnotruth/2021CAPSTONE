import React from 'react';
import { Grid } from '@material-ui/core';

import { Header ,Timer } from '../ui';

const HomeView = (props) => {
    return (
        <Grid container direction='column'>
            <Header header={'캐릭터'}/>
            <Grid className='contents'>
                <Grid className ='IdView'>
                    <Grid className ='DrawChar'>캐릭터 그릴 공간</Grid>
                    <Timer 
                        time={props.time}
                        message={props.message}
                        status={props.status}
                        start={props.start}
                        run={props.run}
                        stop={props.stop}
                        exit={props.exit}
                        exerciseChange={props.exerciseChange}/>
                </Grid>
            </Grid>
        </Grid>
    )    
};

export default HomeView;