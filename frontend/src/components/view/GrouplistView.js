import React from 'react';
import { Grid } from '@material-ui/core';

import { IoSearch } from "react-icons/io5";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Header, Groupform  } from '../ui';

const GrouplistView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className ='grouplist'>
                <Grid className ='searchform'>
                    <IoSearch/>
                    <input 
                    type='text'
                    className = 'searchgroup'
                    placeholder={'검색'}
                    onChange={props.onsearchChange}
                    />
                    <button type='button' onClick={props.onsearchClick}>Search</button>
                </Grid>
                    <Groupform groupdata = {props.groupdata}/>
                <Fab className = 'makegroupbtn' aria-label="add">
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    )    
};

export default GrouplistView;