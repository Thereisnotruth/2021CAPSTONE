import React, { useState } from 'react';
import { Grid,NativeSelect,Button } from '@material-ui/core';

const Timer = (props) => {
    return (
        <Grid className='Timer'>
            
            <div>{props.time.h < 10 ? `0${props.time.h}` : props.time.h}:{props.time.m < 10 ? `0${props.time.m}` : props.time.m}:{props.time.s < 10 ? `0${props.time.s}` : props.time.s}</div>
            <NativeSelect
                onChange={props.exerciseChange}
                className='ExerciseSelect'>
                    <option aria-label="" value="" >운동부위</option>
                    <option value="1">팔</option>
                    <option value="2">다리</option>
                    <option value="3">어깨</option>
                    <option value="4">등</option>
                    <option value="5">복근</option>
                    <option value="6">허벅지</option>
            </NativeSelect>
            <>{props.message}</>
            {(props.status===0)?
            <Button onClick={props.start}>시작</Button>:""}
            {(props.status===1)?
            <Grid><Button onClick={props.stop}>일시정지</Button><Button onClick={props.exit}>정지</Button></Grid>:""}
            {(props.status===2)?
            <Grid><Button onClick={props.start}>시작</Button><Button onClick={props.exit}>정지</Button></Grid>:""}
        </Grid>
    )
};

export default Timer;