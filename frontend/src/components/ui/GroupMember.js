import React, { useEffect } from 'react';
import {Grid} from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

const GroupMember = (props) => {
    const list = props.groupmembers.map((groupmembers, index) => {
        let socketPath = 'ws://192.168.0.2:8000/ws/helpapp/' + groupmembers.user_id;

        const socket = new WebSocket(socketPath);

        socket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            console.log(data);
        }
        
        return (<Grid className ='memberstate' key={index}>
            {(groupmembers.exercise_state===false)?<GiWeightLiftingDown/>:<GiWeightLiftingUp/>}
            <Grid>{groupmembers.user_name}</Grid>
            {
                groupmembers.exercise_state?
                <Grid>Test</Grid>
                :
                ''
            }
        </Grid>)
    });
    return (
        <Grid>
            {list}
        </Grid>
        )
};                
export default GroupMember;