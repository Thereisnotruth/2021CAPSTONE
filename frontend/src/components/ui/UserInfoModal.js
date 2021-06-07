import React from 'react';

import { Paper, Grid, Modal } from '@material-ui/core';

import { ElementLeft, ElementRight } from '../ui';

const UserInfoModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='user-exercise-info-title'
      aria-describedby='user-exercise-info'
    >
      <Paper className='modal'>
        <Grid container>
          <ElementLeft 
            content='팔 경험치 :'
          />
          <ElementRight 
            content={props.data.arm_exp}
          />
          <ElementLeft
            content='가슴 경험치 :'
          />
          <ElementRight
            content={props.data.chest_exp}
          />
          <ElementLeft
            content='등 경험치 :'
          />
          <ElementRight
            content={props.data.back_exp}
          />
          <ElementLeft
            content='어깨 경험치 :'
          />
          <ElementRight
            content={props.data.shoulder_exp}
          />
          <ElementLeft
            content='복근 경험치 :'
          />
          <ElementRight
            content={props.data.belly_exp}
          />
          <ElementLeft
            content='하체 경험치 :'
          />
          <ElementRight
            content={props.data.leg_exp}
          />
        </Grid>
      </Paper>
    </Modal>
  )
}

export default UserInfoModal;