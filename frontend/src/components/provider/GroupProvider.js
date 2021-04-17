import React, { useState } from 'react';

import { GroupModel } from '../model';
import { GroupController } from '../view';
import { GroupViewModel } from '../viewmodel';


const GroupProvider = () => {
    const model = new GroupModel();
    const [viewModel] = useState(new GroupViewModel(model));
    return (
        <GroupController viewModel={viewModel}/>
    ); 
};

export default GroupProvider;