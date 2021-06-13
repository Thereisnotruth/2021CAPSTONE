//스터디목록 화면을 결정하는 view
import React from 'react';
import { Grid ,Link} from '@material-ui/core';

import { IoSearch } from "react-icons/io5";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { GroupForm  } from '../ui';

const GrouplistView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className ='grouplist'>
                    <GroupForm groupdata = {props.groupdata}/>
                <Fab className = 'makegroupbtn' aria-label="add" onClick = {props.make}>
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    )    
};

export default GrouplistView;