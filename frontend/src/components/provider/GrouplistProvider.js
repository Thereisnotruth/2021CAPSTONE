import React, { useState } from 'react';

import { GrouplistModel } from '../model';
import { GrouplistController } from '../view';
import { GrouplistViewModel } from '../viewmodel';


const GrouplistProvider = () => {
    const model = new GrouplistModel();
    const [viewModel] = useState(new GrouplistViewModel(model));
    return (
        <GrouplistController viewModel={viewModel}/>
    ); 
};

export default  GrouplistProvider;