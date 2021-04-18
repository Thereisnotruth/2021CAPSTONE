import React, { useState } from 'react';

import { UserModel, GroupModel } from '../model';
import { GrouplistController } from '../view';
import { GrouplistViewModel } from '../viewmodel';


const GrouplistProvider = () => {
    const umodel = new UserModel();
    const gmodel = new GroupModel();
    const [viewModel] = useState(new GrouplistViewModel(umodel,gmodel));
    return (
        <GrouplistController viewModel={viewModel}/>
    ); 
};

export default  GrouplistProvider;