import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import SignupView from './SignUpView';
import { HeaderController } from '../ui';

const SignupController = ({ viewModel }) => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [quest, setQuest] = useState('');
    const [hint, setHint] = useState('');
    const [message1,setMessage1] = useState('');
    const [message2,setMessage2] = useState('');
    const [message3,setMessage3] = useState('');
    const [message4,setMessage4] = useState('');
    const [message5,setMessage5] = useState('');
    const [message6,setMessage6] = useState('');
    const [message7,setMessage7] = useState('');
    const [message8,setMessage8] = useState('');
    const history = useHistory();
    const checkAlphaNum = (str) => {
        const regexp = /^[a-zA-Z0-9]*$/;
        if(regexp.test(str)){
            return true;
        } else {
            return false;
        }
    }
    function CheckEmail(str){
         var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(!reg_email.test(str)){
            return false;
        }
        else{
            return true;
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
    const onEmailChange = (e) => {
        if(e.target.value==='')
            setMessage7('e-mail을 입력해주세요.');
        else{
            if(CheckEmail(e.target.value)){
                setMessage7('');
                setEmail(e.target.value);}
            else{
                setMessage7('e-mail형식에 맞게 적어주세요.');
            }
        }    
    }
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
    const questChange = (e) => {
        if(e.target.value==='')
            setMessage6('질문을 선택해주세요.');
        else{
            setMessage6('');
            setMessage8('');
            setQuest(e.target.value);}
    }
    const onHintChange = (e) => {
        if(message6 !==''){
            setMessage8('질문을 먼저 선택해주세요.');
        }else if(e.target.value===''&& message6 ===''){
            setMessage8('질문의 대답을 적어주세요.');
        }
        else{
            setMessage8('');
            setHint(e.target.value);}
    }

    const Signup = async () => {
        if(id === ''|| email === ''|| pw === ''|| name === ''|| gender === ''|| quest === ''|| hint === ''){
            alert('모든 정보를 입력해주세요.');
        } else if (cpw === '') {
            alert('비밀번호가 일치하지 않습니다.');
        } else if (!checkAlphaNum(id)) {
            alert('아이디는 알파벳 소문자, 대문자, 숫자만 가능합니다.');
            return;
        } else {
            const connect = await viewModel.signUp(id, pw, name, gender, email, quest, hint);
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
                onEmailChange={onEmailChange}
                onPwChange={onPwChange}
                onPwCheChange={onPwCheChange}
                onNameChange={onNameChange}
                genderChange={genderChange}
                questChange={questChange}
                onHintChange={onHintChange}
                message1={message1}
                message2={message2}
                message3={message3}
                message4={message4}
                message5={message5}
                message6={message6}
                message7={message7}
                message8={message8}
                Signup={Signup}
            />
        </>
    );
};

export default SignupController;