import React from 'react';
import { Grid } from '@material-ui/core';

const UserInfoView = (props) => {
    return(
        <Grid container direction='column' className='content'>
            <Grid className='logo'>HELP</Grid>
                <Grid container>
                    <Grid item xs={6} className='element-left'>
                        아이디 :
                    </Grid>
                    <Grid item xs={6} className='element-right'>
                        {props.data.user_id}
                    </Grid>
                    <Grid item xs={6} className='element-left'>
                        이름 :
                    </Grid>
                    <Grid item xs ={6} className='element-right'>
                        {props.data.user_name}
                    </Grid>
                    <Grid item xs={6} className='element-left'>
                        팔 경험치:
                    </Grid>
                    <Grid item xs={6} className='element-right'>
                        {props.data.arm_exp}
                    </Grid>
                </Grid>
        </Grid>
    )
}

export default UserInfoView;