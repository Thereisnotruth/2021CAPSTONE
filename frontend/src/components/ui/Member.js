import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";

import MemberTimer from './MemberTimer';

const Member = (props) => {
  const { user_id, user_name, exercise_state, start_time } = props;
  const [startTime, setStartTime] = useState(start_time);
  const [exState, setExState] = useState(exercise_state);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = new Date();
    let h = parseInt(start_time / 3600);
    let m = parseInt((start_time - h * 3600) / 60);
    let s = parseInt(start_time - h * 3600 - m * 60);
    
    let diff_s = t.getSeconds() - s;
    let diff_m = t.getMinutes() - m;
    let diff_h = t.getHours() - h;

    if (diff_s < 0) {
      diff_m--;
      diff_s+= 60;
    }
    if (diff_m < 0) {
      diff_h--;
      diff_m += 60;
    }
    setHours(diff_h);
    setMinutes(diff_m);
    setSeconds(diff_s);
    const socketPath = 'ws://192.168.0.2:8000/ws/helpapp/' + user_id;
    const socket = new WebSocket(socketPath);
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setExState(data.exercise_state);
      setStartTime(data.time);
      h = parseInt(data.time/3600);
      const d = new Date();
      setHours(d.getHours() - h);
      m = parseInt((data.time - h * 3600) / 60);
      setMinutes(d.getMinutes() - m);
      s = parseInt(data.time - h * 3600 - m * 60);
      setSeconds(d.getSeconds() - s);
    }
  }, []); 
  useEffect(() => {
    if (exState === true) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) < 59) {
          setSeconds(parseInt(seconds) + 1);
        }
        if (parseInt(seconds) >= 59) {
          setSeconds(parseInt(seconds - 59));
          setMinutes(parseInt(minutes) + 1);
          if (parseInt(minutes) >= 59) {
            setMinutes(parseInt(minutes - 59));
            setHours(parseInt(hours) + 1);
          }
        }
      }
      , 1000);
      return () => clearInterval(countdown);
    }
  }, [hours, minutes, seconds])
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
        <Grid>
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Grid>
        :
        ''
      }
    </Grid>
  )
}

export default Member;