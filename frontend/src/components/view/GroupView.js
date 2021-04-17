import React from 'react';
import { Grid } from '@material-ui/core';


import { Header  } from '../ui';

const GroupView = (props) => {
    return (
        <Grid container direction='column'>
            <Header header={props.groupname}/>
            
            
        </Grid>
    )    
};

export default GroupView;