import React, { useState } from 'react';

import { HeaderController  } from '../ui';
import HomeView from './HomeView';

const HomeController = ({ viewmodel }) => {
    
    return (
        <>
        <HeaderController header={'캐릭터'}/>
        <HomeView/>
        </>
    );
};

export default HomeController;