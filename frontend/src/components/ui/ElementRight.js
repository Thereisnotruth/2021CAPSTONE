//원하는 정보를 왼쪽에 위치 시키기위해 만들어놓은 UI이다.
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