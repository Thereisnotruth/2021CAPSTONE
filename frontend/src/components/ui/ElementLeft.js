import React from 'react';

import { Grid } from '@material-ui/core';

const ElementLeft = (props) => {
  return(
    <Grid item xs={6} className='element-left'>
      {props.content}
    </Grid>
  )
}

export default ElementLeft;