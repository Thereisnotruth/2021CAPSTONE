import React, { useState } from 'react';

import { GroupModel } from '../model';
import { GroupMakeController } from '../view';
import { GroupMakeViewModel } from '../viewmodel';


const GroupMakeProvider = () => {
    const model = new GroupModel();
    const [viewModel] = useState(new GroupMakeViewModel(model));
    return (
        <GroupMakeController viewModel={viewModel}/>
    ); 
};

export default GroupMakeProvider;