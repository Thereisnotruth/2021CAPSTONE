//모든화면 상단에 위치하며 좌측상단에 사이드바 매뉴를 보여주는 버튼이 있는 UI이다.

import React, { useState } from 'react';

import Header from './Header';
import SideBar from './SideBar';

const HeaderController = (props) => {
    const [open, setOpen] = useState(0); // 값에따라 사이드바를 볼 수 있다.

    const sideBarOpen = () => { // 사이드바를 보여주기위해 open을 1로 설정
        setOpen(1);
    }
    const sideBarClose = () => {// 사이드바를 닫기위해 open을 2로 설정
        setOpen(0);
    }
    return (
        <>
        <Header
            header={props.header}
            sideBarOpen={sideBarOpen}
        />
        {
				open ?
					<SideBar
						open={open}
                        sideBarClose={sideBarClose}
					/> : undefined
			}
        </>
    );
};

export default HeaderController;