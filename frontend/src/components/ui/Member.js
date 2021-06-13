//스터디 내의 유저들 각각의 정보를 표현해주는 UI (운동상태+운동시간)

import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi";
import MemberTimer from './MemberTimer';

const Member = (props) => {
  
  //유저의 정보를 원하는 변수에 저장
  const { user_id, user_name, exercise_state, start_time } = props;
  const [startTime, setStartTime] = useState(start_time);
  const [exState, setExState] = useState(exercise_state);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //페이지가 렌더링 되고 다른 입력없이 실행되는 함수
  useEffect(() => {
    const t = new Date();

    //운동을 시작한 시간 (h->시,m->분,s->초)
    let h = parseInt(start_time / 3600); 
    let m = parseInt((start_time - h * 3600) / 60); 
    let s = parseInt(start_time - h * 3600 - m * 60);

    //현재시간 - 운동시작시간 = 현재까지 운동한시간
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

    //운동한 시간을 다른 사람들에게 보여주기위해 원하는 변수에 저장
    setHours(diff_h);
    setMinutes(diff_m);
    setSeconds(diff_s);
    const socketPath = 'ws://192.168.0.103:8000/ws/helpapp/' + user_id;
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
      let ddif_s = d.getSeconds() - s;
      setSeconds(d.getSeconds() - s);
      if (ddif_s <= 0) {
        setSeconds(1);
      }
    }
  }, []); 
  useEffect(() => {
    if (exState === true) { // 유저가 운동중인 상태일경우 유저의 시간을 흐르게해준다.
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