import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Header } from '../ui';
import axios from 'axios';


const LoginView = (props) => {
    return (
        <Grid container direction='column'>
            <Header 
                header={'로그인'}
            />
            <Grid className='contents'>
                <Grid className='logo'>HELP</Grid>
                <input
                    type='text'
                    className='login' 
                    placeholder={'아이디'}
                    onChange={props.onIdChange}
                />
                <input
                    type='password'
                    className='login'
                    placeholder={'비밀번호'}
                    onChange={props.onPwChange}
                />
                <button type='button' className='loginbtn' onClick={props.login}>로그인</button>
                <Divider className='logindivider' />
                <Grid className='link'>
                    아이디찾기| 비밀번호찾기|구글로그인|
                    <Link className='a' to={'/signup'}>회원가입</Link>
                </Grid>
            </Grid>
        </Grid>
    )    
};

export default LoginView;