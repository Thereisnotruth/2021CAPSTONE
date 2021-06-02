import React from 'react';
import {Grid} from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

const Groupmember = (props) => {

    const list = props.groupmembers.map(
        (groupmembers, index) => (<Grid className ='memberstate' key={index}>
            {(groupmembers.exercise_state===false)?<GiWeightLiftingDown/>:<GiWeightLiftingUp/>}
            <Grid>{groupmembers.user_id}</Grid>
            {/*<Grid>
                {parseInt(parseInt(groupmembers.time/60)/60) < 10? `0${parseInt(parseInt(groupmembers.time/60)/60)}`:parseInt(parseInt(groupmembers.time/60)/60)}:
                {parseInt(groupmembers.time/60)%60<10? `0${parseInt(groupmembers.time/60)%60}`:parseInt(groupmembers.time/60)%60}:
                {groupmembers.time%60<10? `0${groupmembers.time%60}`:groupmembers.time%60}</Grid>*/}
            </Grid>)
      );
    return (
        <Grid>
            {list}
        </Grid>
        )
};                
export default Groupmember;