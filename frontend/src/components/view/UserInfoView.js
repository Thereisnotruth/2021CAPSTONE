import React from 'react';
import { Grid, Button } from '@material-ui/core';

import { ElementLeft, ElementRight } from '../ui';

const UserInfoView = (props) => {
    return(
        <Grid container direction='column'>
            <Grid className='contents'>
                <Grid className='logo'>HELP</Grid>
                    <Grid container>
                        <ElementLeft
                            content='아이디 :'
                        />
                        <ElementRight
                            content={props.data.user_id}
                        />
                        <ElementLeft
                            content='이름 :'
                        />
                        <ElementRight
                            content={props.data.user_name}
                        />
                        <ElementLeft
                            content='비밀번호 :'
                        />
                        <ElementRight
                            content={
                                <input
                                    type='password'
                                    className='element-input'
                                />
                            }
                        />
                        <ElementLeft
                            content='비밀번호 확인 :'
                        />
                        <ElementRight
                            content={
                                <input
                                    type='password'
                                    className='element-input'
                                />
                            }
                        />
                        <Grid item xs={12}>
                            <Button variant='contained' />
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            팔 경험치 :
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.arm_exp}
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            가슴 경험치 : 
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.back_exp}
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            등 경험치 :
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.back_exp}
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            어깨 경험치 :
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.shoulder_exp}
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            복근 경험치 :
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.belly_exp}
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            하체 경험치 :
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.leg_exp}   
                        </Grid>
                        <Grid item xs={6} className='element-left'>
                            총 운동 시간 :
                        </Grid>
                        <Grid item xs={6} className='element-right'>
                            {props.data.exercise_time}
                        </Grid>
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default UserInfoView;