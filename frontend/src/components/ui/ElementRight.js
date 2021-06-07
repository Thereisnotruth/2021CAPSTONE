import React from 'react';

import { Grid } from '@material-ui/core';

const ElementRight = (props) => {
  return(
    <Grid item xs={6} className='element-right'>
      {props.content}
    </Grid>
  )
}

export default ElementRight;