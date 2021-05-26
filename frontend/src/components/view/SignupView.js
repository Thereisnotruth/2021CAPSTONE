import React from 'react';
import { Grid, Divider,NativeSelect } from '@material-ui/core';

import { Header } from '../ui';

const SignupView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='contents'>
                <Grid className='logo'>HELP</Grid>
                <Grid className='join_title'>아이디</Grid>
                <input
                    type='text'
                    className='login' 
                    placeholder={'아이디'}
                    onChange={props.onIdChange}
                />
                <Grid className='errorm'>{props.message1}</Grid>
                <Grid className='join_title'>비밀번호</Grid>
                <input
                    type='password'
                    className='login'
                    placeholder={'비밀번호'}
                    onChange={props.onPwChange}
                />
                <Grid className='errorm'>{props.message2}</Grid>
                <Grid className='join_title'>비밀번호 확인</Grid>
                <input
                    type='password'
                    className='login'
                    placeholder={'비밀번호확인'}
                    onChange={props.onPwCheChange}
                />
                <Grid className='errorm'>{props.message3}</Grid>
                <Grid className='join_title'>이름</Grid>
                <input
                    type='text'
                    className='login'
                    placeholder={'이름'}
                    onChange={props.onNameChange}
                />
                <Grid className='errorm'>{props.message4}</Grid>
                <Grid className='join_title'>성별</Grid>
                <NativeSelect
                    onChange={props.genderChange}
                    className='GenderSelect'>
                    <option aria-label="" value="" >성별</option>
                    <option value="M">남자</option>
                    <option value="F">여자</option>
                </NativeSelect>
                <Grid className='errorm'>{props.message5}</Grid>
                <button type='button' className='loginbtn' onClick={props.Signup}>가입하기</button>
                <Divider />
            </Grid>
        </Grid>
    )    
};

export default SignupView;