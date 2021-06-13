//내스터디 목록 화면을 결정하는 view
import React from 'react';
import { Grid } from '@material-ui/core';
import { GroupForm  } from '../ui';

const MystudyView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className ='grouplist'>
                    <GroupForm groupdata = {props.groupdata}/>
            </Grid>
        </Grid>
    )    
};

export default MystudyView;