import React, { useState } from 'react';

import { SignupModel } from '../model';
import { SignupController } from '../view';
import { SignupViewModel } from '../viewmodel';


const SignupProvider = () => {
    const model = new SignupModel();
    const [viewModel] = useState(new SignupViewModel(model));
    return (
        <SignupController viewModel={viewModel}/>
    ); 
};

export default SignupProvider;