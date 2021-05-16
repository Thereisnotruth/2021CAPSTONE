import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import SignupView from './SignupView';

const SignupController = ({ viewModel }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setPwc] = useState('');
    const [name, setName] = useState('');
    const [gender, setgender] = useState('');
    const [message1,setmessage1] = useState('');
    const [message2,setmessage2] = useState('');
    const [message3,setmessage3] = useState('');
    const [message4,setmessage4] = useState('');
    const [message5,setmessage5] = useState('');
    const history = useHistory();

    const onIdChange = (e) => {
        if(e.target.value==='')
            setmessage1('아이디를 입력해주세요.');
        else{
            setId(e.target.value);
            setmessage1('');
            try {
                viewModel.IdCheck(id);
            } catch (error) {
                setmessage1('이미 존재하는 아이디입니다.');
            }   
        }
    };
    const onPwChange = (e) => {
        if(e.target.value==='')
            setmessage2('비밀번호를 입력해주세요.');
        else{
            setmessage2('');
            setPw(e.target.value);}
    }
    const onPwCheChange = (e) => {
        if(e.target.value==='')
            setmessage3('비밀번호를 입력해주세요.');
        else if(e.target.value!==pw)
            setmessage3('비밀번호가 일치하지 않습니다.');
        else{
            setmessage3('');
            setPwc(e.target.value);}
    }
    const onNameChange = (e) => {
        if(e.target.value==='')
            setmessage4('이름을 입력해주세요.');
        else{
            setmessage4('');
            setName(e.target.value);}
    }
    const genderChange = (e) =>{
        if(e.target.value==='')
            setmessage5('성별을 선택해주세요.');
        else{
            setmessage5('');
            setgender(e.target.value);}
    }
    const Signup = () => {
        if(id===''|| pw===''|| cpw===''|| name===''|| gender==='')
            alert('모든 정보를 입력해주세요.');
        else{
            viewModel.Signup(id, pw, name, gender);
            alert('가입되었습니다.');
            history.replace("/login");
        }

    }
    const IdCheck = () =>{
        viewModel.IdCheck(id);
    }
    
    return (
        <SignupView 
            onIdChange={onIdChange}
            onPwChange={onPwChange}
            onPwCheChange={onPwCheChange}
            onNameChange={onNameChange}
            genderChange={genderChange}
            IdCheck={IdCheck}
            message1={message1}
            message2={message2}
            message3={message3}
            message4={message4}
            message5={message5}
            Signup={Signup}
        />
    );
};

export default SignupController;