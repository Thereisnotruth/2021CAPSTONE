import React, { useState } from 'react';

import { ShopModel } from '../model';
import { ShopController } from '../view';
import { ShopViewModel } from '../viewmodel';


const ShopProvider = () => {
    const model = new ShopModel();
    const [viewModel] = useState(new ShopViewModel(model));
    return (
        <ShopController viewModel={viewModel}/>
    ); 
};

export default ShopProvider;