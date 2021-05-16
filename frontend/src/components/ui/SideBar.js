import React from 'react';
import { Grid, Button, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';
const SideBar = (props) => {
    return (
        <Grid className='sidebar'>
            <Grid className="sidebar-header">
				<Button onClick={props.sideBarClose} className='close-button'>
					<Close />
				</Button>
			</Grid>
			<Link to='login' className='sidebar-link'>
				<Button className='login-button'>
					로그인
				</Button>
			</Link>
			<Divider />
			<Link to='/' className='sidebar-link'>
				<Button className='sidebar-item'>
					캐릭터
				</Button>
			</Link>
			<Link to='/grouplist' className='sidebar-link'>
				<Button className='sidebar-item'>
					그룹 목록
				</Button>
			</Link>
        </Grid>
    )
};

export default SideBar;