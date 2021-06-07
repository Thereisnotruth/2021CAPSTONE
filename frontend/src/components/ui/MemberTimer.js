import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
const MemberTimer = (props) => {
  const { startTime } = props;
  console.log(startTime)
  const [hours, setHours] = useState(startTime);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const countdown = setInterval(() => {
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