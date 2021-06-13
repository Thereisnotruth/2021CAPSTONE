//홈 화면에서 타이머를 화면을 결정하는 코드
import React, { useState } from 'react';
import { Grid,NativeSelect,Button } from '@material-ui/core';

const Timer = (props) => {//(타이머)+(운동부위 선택)+(운동시작/종료버튼)
    return (
        <Grid className='Timer'>
            <div>{props.time.h < 10 ? `0${props.time.h}` : props.time.h}:{props.time.m < 10 ? `0${props.time.m}` : props.time.m}:{props.time.s < 10 ? `0${props.time.s}` : props.time.s}</div>
            <NativeSelect
                onChange={props.exerciseChange}
                className='ExerciseSelect'>
                    <option aria-label="" value="" >운동부위</option>
                    <option value="1">등</option>
                    <option value="2">가슴</option>
                    <option value="3">어깨</option>
                    <option value="4">복근</option>
                    <option value="5">팔</option>
                    <option value="6">다리</option>
            </NativeSelect>
            <Grid className ='selecterror'>{props.message}</Grid>
            <Grid className ='btnform'>
                {(props.status===0)?
                    <Grid><Button className ='btn' onClick={props.start}>시작</Button></Grid>:""}
                {(props.status===1)?
                    <Grid><Button className ='btn' onClick={props.stop}>정지</Button></Grid>:""}
            </Grid>
        </Grid>
    )
};

export default Timer;