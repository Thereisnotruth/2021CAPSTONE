import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const LoginView = (props) => {
    return (
        <Grid container direction='column'>
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
                <Link className='a' to={'/findid'}>아아디 찾기</Link>
                |<Link className='a' to={'/findpw'}>비밀번호 찾기</Link>
                |<Link className='a' to={'/signup'}>회원가입</Link>
                </Grid>
            </Grid>
        </Grid>
    )    
};

export default LoginView;