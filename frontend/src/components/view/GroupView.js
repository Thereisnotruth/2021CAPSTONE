import React from 'react';
import { Grid , Button} from '@material-ui/core';
import { IoPodiumOutline,IoCalendarOutline } from "react-icons/io5";
import { BsPersonPlus } from "react-icons/bs";

import { GroupMember } from '../ui';
import { useHistory } from 'react-router-dom';

const GroupView = (props) => {
    const history = useHistory();
    return (
        <Grid container direction='column'>
            <Grid className='group'>
                <Grid className='grouplogo'><Grid className='groupname'>{props.groupname}</Grid></Grid>
                <Grid className = 'groupmembernumber'>멤버<Grid className = 'groupmember'>{props.groupmember}</Grid>명</Grid>
                <Grid className = 'groupkategorie'>
                    <Grid className='groupicon'><IoPodiumOutline/><Grid>Rank</Grid></Grid>
                    <Grid className='groupicon'><IoCalendarOutline/><Grid>Calendar</Grid></Grid>
                    <Grid className='groupicon'><Button onClick={props.join}><BsPersonPlus/><Grid>가입</Grid></Button></Grid>
                </Grid>
                <Grid className ='Notice'>공지</Grid>
                <Grid className='noticetxt'>{props.notice}</Grid>
                <Grid className ='doing'>
                    <Grid>지금운동중인 멤버 수<Grid className = 'groupmember'>{props.Exercisemember}</Grid></Grid>
                    <GroupMember groupmembers={props.groupmembers}></GroupMember>
                </Grid>
            </Grid>

            
            
        </Grid>
    )    
};

export default GroupView;