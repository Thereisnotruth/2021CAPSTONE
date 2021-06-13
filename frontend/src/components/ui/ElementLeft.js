//원하는 정보를 왼쪽에 위치 시키기위해 만들어놓은 UI이다.
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