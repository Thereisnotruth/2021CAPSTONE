import React from 'react';
import { Grid ,Link} from '@material-ui/core';

import { IoSearch } from "react-icons/io5";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { GroupForm  } from '../ui';

const GrouplistView = (props) => {
    console.log(props.groupdata);
    return (
        <Grid container direction='column'>
            <Grid className ='grouplist'>
                {/*<Grid className ='searchform'>
                    <IoSearch/>
                    <input 
                    type='text'
                    className = 'searchgroup'
                    placeholder={'검색'}
                    onChange={props.onsearchChange}
                    />
                    <button type='button' onClick={props.onsearchClick}>Search</button>
    </Grid>*/}
                    <GroupForm groupdata = {props.groupdata}/>
                <Fab className = 'makegroupbtn' aria-label="add" onClick = {props.make}>
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    )    
};

export default GrouplistView;