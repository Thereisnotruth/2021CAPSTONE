import React, { useState } from 'react';

import GroupView from './HomeView';

const GroupController = ({ viewmodel }) => {
    const[groupname,setgroupname] = useState('');
    
    return (
        < GroupView groupname={groupname}/>
    );
};

export default GroupController;