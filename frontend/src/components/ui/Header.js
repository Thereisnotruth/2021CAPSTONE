import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const Header = (props) => {
    return (
        <Grid className='header'>
            <Button onClick={props.sideBarOpen}>
                <Menu className='sidebar_button'style={{ fontSize: '10vh' }}/>
            </Button>
            {props.header}
        </Grid>
    )
};

export default Header;