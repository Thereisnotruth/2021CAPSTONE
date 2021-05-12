import axios from 'axios';

class SignupModel {
    // Model의 회원가입 함수
    async Signup(id, pw, name,gender) {
        try {
            await axios.post('localhost:8000/v1/auth', {
                userId: id,
                userPw: pw,
                Name: name,
                Gender: gender
            }, { withCredentials: true });
        } catch(error) {
            console.log(error);
        }
    }
    async IdCheck(id) {
        try {
            await axios.post('localhost:8000/v1/auth', {
                userId: id,
            }, { withCredentials: true });
        } catch(error) {
            console.log(error);
        }
    }
}

export default SignupModel;