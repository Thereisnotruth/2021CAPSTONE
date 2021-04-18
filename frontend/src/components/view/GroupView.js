import React from 'react';
import { Grid } from '@material-ui/core';
import { IoPodiumOutline,IoCalendarOutline } from "react-icons/io5";
import { BsPersonPlus } from "react-icons/bs";
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

import { Header  } from '../ui';

const GroupView = (props) => {
    return (
        <Grid container direction='column'>
            <Header header={'그룹'}/>
            <Grid className='group'>
                <Grid className='grouplogo'><Grid className='groupname'>{props.groupname}</Grid></Grid>
                <Grid className = 'groupmembernumber'>멤버<Grid className = 'groupmember'>{props.groupmember}</Grid>명</Grid>
                <Grid className = 'groupkategorie'>
                    <Grid className='groupicon'><IoPodiumOutline/><Grid>Rank</Grid></Grid>
                    <Grid className='groupicon'><IoCalendarOutline/><Grid>Invite</Grid></Grid>
                    <Grid className='groupicon'><BsPersonPlus/><Grid>Invite</Grid></Grid>
                </Grid>
                <Grid className ='Notice'>공지</Grid>
                <Grid className='noticetxt'>{props.notice}</Grid>
                <Grid className ='doing'>
                    <Grid>지금운동중인 멤버 수<Grid className = 'groupmember'>{props.Exercisemember}</Grid></Grid>
                    <Grid className ='memberstate'><GiWeightLiftingUp/><Grid>이름</Grid><Grid>00:00:00</Grid></Grid>
                    <Grid className ='memberstate'><GiWeightLiftingUp/><Grid>이름</Grid><Grid>00:00:00</Grid></Grid>
                    <Grid className ='memberstate'><GiWeightLiftingDown/><Grid>이름</Grid><Grid>00:00:00</Grid></Grid>
                    <Grid className ='memberstate'><GiWeightLiftingUp/><Grid>이름</Grid><Grid>00:00:00</Grid></Grid>
                    <Grid className ='memberstate'><GiWeightLiftingDown/><Grid>이름</Grid><Grid>00:00:00</Grid></Grid>
                </Grid>
            </Grid>

            
            
        </Grid>
    )    
};

export default GroupView;