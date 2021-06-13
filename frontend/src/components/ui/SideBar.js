//사이드바의 화면을 결정하는 코드
import React from 'react';
import { Grid, Button, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import useStore from '../useStore';
const SideBar = (props) => {
	const { Auth } = useStore();
	const history = useHistory();
	const test = () => { //로그아웃버튼 클릭후 실행 (로그아웃+홈화면)
		Auth.logout();
		history.replace('/');
	}
    return (
        <Grid className='sidebar'>
            <Grid className="sidebar-header">
				<Button onClick={props.sideBarClose} className='close-button'>
					<Close />
				</Button>
			</Grid>
			{
				Auth.isLogged?
				<Link to='/info' className='sidebar-link'>
					<Button className='login-button'>
						{Auth.data.user_id}
					</Button>
				</Link>
				:		
				<Link to='login' className='sidebar-link'>
					<Button className='login-button'>
						로그인
					</Button>
				</Link>
			}
	
			<Divider />
			<Link to='/' className='sidebar-link'>
				<Button className='sidebar-item'>
					캐릭터
				</Button>
			</Link>
			{
				Auth.isLogged?
			<Link to='/mygroup' className='sidebar-link'>
				<Button className='sidebar-item'>
					내 스터디 목록
				</Button>
			</Link>:''
			}
			<Link to='/grouplist' className='sidebar-link'>
				<Button className='sidebar-item'>
					스터디 목록
				</Button>
			</Link>
			<Link to='/board' className='sidebar-link'>
				<Button className='sidebar-item'>
					게시판
				</Button>
			</Link>
			{
				Auth.isLogged?
				<Button className='login-button' onClick={test}>
					로그아웃
				</Button>
				:		
				undefined
			}
        </Grid>
    )
};

export default SideBar;