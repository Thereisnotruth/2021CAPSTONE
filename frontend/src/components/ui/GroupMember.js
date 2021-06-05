import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

import Member from './Member';

const GroupMember = (props) => {

    const list = props.groupmembers.map((groupmembers, index) => {  
            return (
                <Member
                    user_id={groupmembers.user_id}
                    user_name={groupmembers.user_name}
                    start_time={groupmembers.start_time}
                    exercise_state={groupmembers.exercise_state}
                    key={index}
                />
            )
        });
        
    
    return (
        <Grid>
            {list}
        </Grid>
        )
};                
export default GroupMember;