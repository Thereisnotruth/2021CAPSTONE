import React from 'react';
import { Grid, Divider, NativeSelect } from '@material-ui/core';
import { Link } from 'react-router-dom';

const PwView = (props) => {
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
                    <Grid className='join_title'>이름</Grid>
                    <input
                        type="text"
                        className='login'
                        placeholder={'이름'}
                        onChange={props.onNameChange}
                    />
                    <Grid className='join_title'>힌트</Grid>
                    <NativeSelect
                        onChange={props.onQuestChange}
                        className='GenderSelect'>
                        <option aria-label="" value="" >질문</option>
                        <option value="1">당신의 아버지 성함은?</option>
                        <option value="2">당신의 어머니 성함은?</option>
                        <option value="3">당신이 사는 지역은?</option>
                        <option value="4">당신의 모교는?</option>
                    </NativeSelect>
                    <input
                        type="text"
                        className='login'
                        placeholder={'힌트대답'}
                        onChange={props.onHintChange}
                    />
                    <button type='button' className='loginbtn' onClick ={props.findPw}>비밀번호 찾기</button>
                    <Divider/>
                    <Grid className='link'>
                        <Link className='a' to={'/login'}>로그인</Link>|
                        <Link className='a' to={'/findid'}>아이디 찾기</Link>|
                        <Link className='a' to={'/signup'}>회원가입</Link>
                    </Grid>
            </Grid>
        </Grid>
    )    
};

export default PwView;