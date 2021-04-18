import React, { useState } from 'react';

import GrouplistView from './GrouplistView';

const GroupController = ({ viewmodel }) => {
    const[Search,setSearch] = useState('');
    const state ={ groupdata:[{
        id:1,
        area:'동대문구',
        groupname:'PTgroup',
        number:'3',
        maxnumber:'8',
        leader:'JHT',
        attendance:'100%',
        exercisetime:'1시간50분',
        startdate:'2021.4.18',
        notion:'notion1',
    },{
        id:2,
        area:'서울',
        groupname:'Prism',
        number:'2',
        maxnumber:'15',
        leader:'Jeon',
        attendance:'99%',
        exercisetime:'50분40초',
        startdate:'2021.3.20',
        notion:'notion2',
    }]
}
    const onsearchChange = (e) => {
        setSearch(e.target.value);
    }
    const onsearchClick =() =>{
        
    }
    return (
        < GrouplistView 
        onsearchChange={onsearchChange}
        onsearchClick={onsearchClick}
        groupdata = {state.groupdata}
        />
    );
};

export default GroupController;