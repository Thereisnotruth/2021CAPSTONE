import React, { useState } from 'react';

import SignupView from './SignupView';

const SignupController = ({ viewmodel }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setPwc] = useState('');
    const [name, setName] = useState('');
    const [gender, setgender] = useState('');
    const onIdChange = (e) => {
        setId(e.target.value);
    };
    const onPwChange = (e) => {
        setPw(e.target.value);
    }
    const onPwCheChange = (e) => {
        setPwc(e.target.value);
    }
    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const genderChange = (e) =>{
        setgender(e.target.value);
    }
    const Signup = () => {
        viewmodel.signup(id, pw, cpw, name, gender);
    }
    const IdCheck = () =>{
        viewmodel.IdCheck(id);
    }
    
    return (
        <SignupView 
            onIdChange={onIdChange}
            onPwChange={onPwChange}
            onPwCheChange={onPwCheChange}
            onNameChange={onNameChange}
            genderChange={genderChange}
            IdCheck={IdCheck}
            Signup={Signup}
        />
    );
};

export default SignupController;