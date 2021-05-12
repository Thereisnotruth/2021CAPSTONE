import React, { useState } from 'react';

import GroupView from './GroupView';
import { HeaderController } from '../ui';

const GroupController = ({ viewmodel }) => {
    const[groupname,setgroupname] = useState('GroupName');
    const[groupmember,setgroupmember] = useState('10');
    const[Exercisemember,setExercisemember] = useState('6');
    const[notice,setnotice] = useState('notice');
    return (
        <>
        <HeaderController header={'그룹 목록'}/>
        < GroupView 
        groupname={groupname}
        groupmember={groupmember}
        Exercisemember={Exercisemember}
        notice={notice}
        />
        </>
    );
};

export default GroupController;