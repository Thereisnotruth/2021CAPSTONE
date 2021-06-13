//아이디 찾기 화면을 결정하는 view
import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const IdView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='contents'>
                <Grid className='logo'>HELP</Grid>
                    <Grid className='join_title'>이메일</Grid>
                    <input
                        type="email"
                        className='login'
                        placeholder={'email'}
                        onChange={props.onEmailChange}
                    />
                    <button type='button' className='loginbtn' onClick={props.find}>아이디 찾기</button>
                    <Divider/>
                    <Grid className='link'>
                        <Link className='a' to={'/login'}>로그인</Link>|
                        <Link className='a' to={'/findpw'}>비밀번호 찾기</Link>|
                        <Link className='a' to={'/signup'}>회원가입</Link>
                    </Grid>
            </Grid>
        </Grid>
    )    
};

export default IdView;