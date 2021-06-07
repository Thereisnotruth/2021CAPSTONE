import React from 'react';
import { Grid, Divider,NativeSelect } from '@material-ui/core';

const GroupMakeView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='contents'>
                <Grid className='logo'>HELP</Grid>
                <Grid className='join_title'>스터디명</Grid>
                <input
                    type='text'
                    className='login' 
                    placeholder={'스터디명'}
                    onChange={props.onStudyChange}
                />
                <Grid className='errorm'>{props.message1}</Grid>
                <Grid className='join_title'>최대인원수</Grid>
                <NativeSelect
                    onChange={props.CapacityChange}
                    className='GenderSelect'>
                    <option aria-label="" value="" ></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
                </NativeSelect>
                <Grid className='errorm'>{props.message2}</Grid>
                <button type='button' className='loginbtn' onClick={props.MakeStudy}>스터디생성</button>
                <Divider />
            </Grid>
        </Grid>
    )    
};

export default GroupMakeView;
