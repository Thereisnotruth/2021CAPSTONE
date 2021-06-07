import React from 'react';
import { Grid, Divider,NativeSelect } from '@material-ui/core';

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
                <Grid className='join_title'>이메일</Grid>
                    <input
                        type="email"
                        className='login'
                        placeholder={'email'}
                        onChange={props.onEmailChange}
                    />
                <Grid className='errorm'>{props.message7}</Grid>
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
                <Grid className='join_title'>힌트</Grid>
                    <NativeSelect
                        onChange={props.questChange}
                        className='GenderSelect'>
                        <option aria-label="" value="" >질문</option>
                        <option value="1">당신의 아버지 성함은?</option>
                        <option value="2">당신의 어머니 성함은?</option>
                        <option value="3">당신이 사는 지역은?</option>
                        <option value="4">당신의 모교 이름은?</option>
                    </NativeSelect>
                    <Grid className='errorm'>{props.message6}</Grid>
                    <input
                        type="text"
                        className='login'
                        placeholder={'힌트대답'}
                        onChange={props.onHintChange}
                    />
                    <Grid className='errorm'>{props.message8}</Grid>
                <button type='button' className='loginbtn' onClick={props.Signup}>가입하기</button>
                <Divider />
            </Grid>
        </Grid>
    )    
};

export default SignupView;