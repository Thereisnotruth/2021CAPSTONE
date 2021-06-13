//스터디에서 유저의 시간을 보여주기 위한 UI
//추후 운동중인지 판단을 위해 Memver.js로 옮겼다.
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
const MemberTimer = (props) => {
  
  //시간을 원하는 변수에 설정
  const { startTime } = props;
  const [hours, setHours] = useState(startTime);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const countdown = setInterval(() => {//시간을 흐르게 해준다.
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
            clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds]);
  return (
    <Grid>
      {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </Grid>
  );
}

export default MemberTimer;