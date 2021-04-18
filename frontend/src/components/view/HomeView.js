import React from 'react';
import { Grid } from '@material-ui/core';

import { Header  } from '../ui';

const HomeView = (props) => {
    return (
        <Grid container direction='column'>
            <Header header={'캐릭터'}/>
            <Grid className='contents'>
                <Grid className ='IdView'>
                    <Grid className ='DrawChar'>캐릭터 그릴 공간</Grid>
                    <Grid className ='Timer'>타이머 만들 공간</Grid>
                </Grid>
            </Grid>
        </Grid>
    )    
};

export default HomeView;