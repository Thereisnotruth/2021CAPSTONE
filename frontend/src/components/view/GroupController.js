import React, { useState } from 'react';

import GroupView from './GroupView';

const GroupController = ({ viewmodel }) => {
    const[groupname,setgroupname] = useState('GroupName');
    const[groupmember,setgroupmember] = useState('10');
    const[Exercisemember,setExercisemember] = useState('6');
    const[notice,setnotice] = useState('notice');
    return (
        < GroupView 
        groupname={groupname}
        groupmember={groupmember}
        Exercisemember={Exercisemember}
        notice={notice}
        />
    );
};

export default GroupController;