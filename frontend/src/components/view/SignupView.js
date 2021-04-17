import React from 'react';
import { Grid, Divider,NativeSelect,Button } from '@material-ui/core';

import { Header } from '../ui';

const SignupView = (props) => {
    return (
        <Grid container direction='column'>
            <Header 
                header={'회원가입'}
            />
            <Grid className='contents'>
                <Grid className='logo'>HELP</Grid>
                <Grid className='join_title'>아이디<Button className='idbtn' onClick={props.IdCheck}>중복확인</Button></Grid>
                <input
                    type='text'
                    className='login' 
                    placeholder={'아이디'}
                    onChange={props.onIdChange}
                />
                <Grid className='join_title'>비밀번호</Grid>
                <input
                    type='password'
                    className='login'
                    placeholder={'비밀번호'}
                    onChange={props.onPwChange}
                />
                <Grid className='join_title'>비밀번호 확인</Grid>
                <input
                    type='password'
                    className='login'
                    placeholder={'비밀번호확인'}
                    onChange={props.onPwCheChange}
                />
                <Grid className='join_title'>이름</Grid>
                <input
                    type='text'
                    className='login'
                    placeholder={'이름'}
                    onChange={props.onNameChange}
                />
                <Grid className='join_title'>성별</Grid>
                <NativeSelect placeholder={'이름'}
                onChange={props.genderChange}
                className='GenderSelect'>
                    <option aria-label="" value="" >성별</option>
                    <option value="M">남자</option>
                    <option value="F">여자</option>
                </NativeSelect>
                <button type='button' className='loginbtn' onClick={props.Signup}>가입하기</button>
                <Divider className='logindivider' />
            </Grid>
        </Grid>
    )    
};

export default SignupView;