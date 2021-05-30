import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import SignupView from './SignUpView';
import { HeaderController } from '../ui';

const SignupController = ({ viewModel }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [message1,setMessage1] = useState('');
    const [message2,setMessage2] = useState('');
    const [message3,setMessage3] = useState('');
    const [message4,setMessage4] = useState('');
    const [message5,setMessage5] = useState('');
    const history = useHistory();
    const checkAlphaNum = (str) => {
        const regexp = /^[a-za-z0-9]*$/;
        if(regexp.test(str)){
            return true;
        } else {
            return false;
        }
    }
    const onIdChange = (e) => {    
        if(e.target.value==='')
            setMessage1('아이디를 입력해주세요.');
        else if (!checkAlphaNum(e.target.value)) {
            setId(e.target.value);
            setMessage1('아이디는 알파벳 소문자, 대문자, 숫자만 가능합니다.');
        } else {
            setId(e.target.value);
            setMessage1('');
        }
    };
    const onPwChange = (e) => {
        if(e.target.value==='')
            setMessage2('비밀번호를 입력해주세요.');
        else{
            setMessage2('');
            setPw(e.target.value);}
    }
    const onPwCheChange = (e) => {
        if(e.target.value==='')
            setMessage3('비밀번호를 입력해주세요.');
        else if(e.target.value!==pw)
            setMessage3('비밀번호가 일치하지 않습니다.');
        else{
            setMessage3('');
            setCpw(e.target.value);
        }
    }
    const onNameChange = (e) => {
        if(e.target.value==='')
            setMessage4('이름을 입력해주세요.');
        else{
            setMessage4('');
            setName(e.target.value);}
    }
    const genderChange = (e) => {
        if(e.target.value==='')
            setMessage5('성별을 선택해주세요.');
        else{
            setMessage5('');
            setGender(e.target.value);}
    }

    const Signup = async () => {
        if(id === ''|| pw === ''|| name === ''|| gender === ''){
            alert('모든 정보를 입력해주세요.');
        } else if (cpw === '') {
            alert('비밀번호가 일치하지 않습니다.');
        } else if (!checkAlphaNum(id)) {
            alert('아이디는 알파벳 소문자, 대문자, 숫자만 가능합니다.');
            return;
        } else {
            const connect = await viewModel.signUp(id, pw, name, gender);
            const status = connect?.status;

            if (status === 201) {
                alert('가입되었습니다.');
                history.replace('/login');
            } else if (status === 400) {
                alert('중복된 아이디입니다.');
            } else {
                alert('내부 서버 오류입니다.');
            }
        }

    }
    
    return (
        <>
            <HeaderController header='회원가입' />
            <SignupView 
                onIdChange={onIdChange}
                onPwChange={onPwChange}
                onPwCheChange={onPwCheChange}
                onNameChange={onNameChange}
                genderChange={genderChange}
                message1={message1}
                message2={message2}
                message3={message3}
                message4={message4}
                message5={message5}
                Signup={Signup}
            />
        </>
    );
};

export default SignupController;