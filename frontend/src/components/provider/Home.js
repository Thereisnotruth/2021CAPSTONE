import React, { useState } from 'react';

import { HomeModel } from '../model';
import { HomeController } from '../view';
import { HomeViewModel } from '../viewmodel';


const Home = () => {
    const model = new HomeModel();
    const [viewModel] = useState(new HomeViewModel(model));
    return (
        <HomeController viewModel={viewModel}/>
    ); 
};

export default Home;