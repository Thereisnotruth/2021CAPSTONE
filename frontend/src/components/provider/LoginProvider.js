import React, { useState } from 'react';

import { LoginModel } from '../model';
import { LoginController } from '../view';
import { LoginViewModel } from '../viewmodel';


const LoginProvider = () => {
    const model = new LoginModel();
    const [viewModel] = useState(new LoginViewModel(model));
    return (
        <LoginController viewModel={viewModel}/>
    ); 
};

export default LoginProvider;