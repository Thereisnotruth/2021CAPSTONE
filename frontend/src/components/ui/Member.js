import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

import MemberTimer from './MemberTimer';

const Member = (props) => {
  const { user_id, user_name, exercise_state, start_time } = props;
  const [startTime, setStartTime] = useState(0);
  const [exState, setExState] = useState(exercise_state);
  useEffect(() => {
    const socketPath = 'ws://192.168.0.2:8000/ws/helpapp/' + user_id;
    const socket = new WebSocket(socketPath);
    socket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    setExState(data.exercise_state);
    setStartTime(data.time);
    console.log(data.time);
  }
  }, []); 
  const today = new Date();
  
  return (
    <Grid className ='memberstate'>
      {
        exState?
          <GiWeightLiftingUp/>
          :
          <GiWeightLiftingDown/>
      }
      <Grid>
        {user_name}
      </Grid>
      {
        exState?
        <MemberTimer
          startTime={startTime}
        />
        :
        ''
      }
    </Grid>
  )
}

export default Member;