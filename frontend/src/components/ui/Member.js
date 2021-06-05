import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

const Member = (props) => {
  const { user_id, user_name, exercise_state, start_time } = props;
  const [startTime, setStartTime] = useState(0);
  const [exState, setExState] = useState(exercise_state);
  let socketPath = 'ws://10.42.127.222:8000/ws/helpapp/' + user_id;
  const socket = new WebSocket(socketPath);
  socket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    setExState(data.exercise_state);
    setStartTime(data.time);
    console.log()
    console.log(data);
  }
  useEffect(() => {

  }, [exState])
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
        <Grid>{startTime}</Grid>
        :
        ''
      }
    </Grid>
  )
}

export default Member;