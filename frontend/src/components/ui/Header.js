//모든화면 상단에 위치하며 페이지의 이름을 보여준다.
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