import React from 'react';
import { Grid } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const Header = (props) => {
    return (
        <Grid className='header'>
            <Menu className='sidebar_button'style={{ fontSize: '10vh' }}/>
            {props.header}
        </Grid>
    )
};

export default Header;