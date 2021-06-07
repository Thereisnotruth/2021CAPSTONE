import React, { useState } from 'react';

import Header from './Header';
import SideBar from './SideBar';

const HeaderController = (props) => {
    const [open, setOpen] = useState(0);

    const sideBarOpen = () => {
        setOpen(1);
    }
    const sideBarClose = () => {
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