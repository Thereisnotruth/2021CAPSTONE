//유저정보 화면을 결정하는 view
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import { ElementLeft, ElementRight, UserInfoModal } from '../ui';

const ColorButton = withStyles({
    root: {
        backgroundColor: '#8AD3FC',
        margin: '20px 0',
        '&:hover': {
            backgroundColor: '#30B0FD'
        }
    }
})(Button);
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
                        <Grid item xs={12}>
                            <ColorButton
                                variant='contained'
                                className='element-center'
                                onClick={props.handleOpen}
                                color='primary'
                            >
                                내 운동 정보
                            </ColorButton>
                        </Grid>
                        <UserInfoModal
                            open={props.open}
                            handleClose={props.handleClose}
                            data={props.data}
                        />
                        {(props.state===1)?
                        <Grid item xs={12}>
                            <ColorButton
                                variant='contained'
                                className='element-center'
                                onClick={props.pwChange}
                                color='primary'
                            >
                                비밀번호 변경
                            </ColorButton>
                        </Grid>:''}
                        {(props.state===2)?
                            <><ElementLeft
                                content='변경비밀번호 :'
                            />
                            <ElementRight
                                content={
                                    <input
                                        type='password'
                                        className='element-input'
                                        onChange={props.onPwChange}
                                    />
                                }
                            />
                            <ElementLeft
                                content='비밀번호 확인 :'
                            />
                            <ElementRight
                                content={
                                    <>
                                    <input
                                        type='password'
                                        className='element-input'
                                        onChange={props.onCpwChange}
                                    />
                                    <Grid className='errorm'>{props.message}</Grid>
                                    </>
                                }
                            />
                            <Grid item xs={12}>
                                <ColorButton
                                    variant='contained'
                                    className='element-center'
                                    onClick={props.pwChange}
                                    color='primary'
                                >
                                    비밀번호 변경
                                </ColorButton>
                            </Grid></>:''}
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default UserInfoView;