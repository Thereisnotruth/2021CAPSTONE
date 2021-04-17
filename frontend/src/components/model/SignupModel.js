import axios from 'axios';

class SignupModel {
    // Model의 회원가입 함수
    async Signup(id, pw, cpw, name,gender) {
        try {
            await axios.post('localhost:4000/v1/auth', {
                userId: id,
                userPw: pw,
                userPwc: cpw,
                Name: name,
                Gender: gender
            }, { withCredentials: true });
        } catch(error) {
            console.Signup(error);
        }
    }
    async IdCheck(id) {
        try {
            await axios.get('localhost:4000/v1/auth', {
                userId: id,
            }, { withCredentials: true });
        } catch(error) {
            console.Signup(error);
        }
    }
}

export default SignupModel;