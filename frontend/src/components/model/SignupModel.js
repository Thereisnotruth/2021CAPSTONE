import axios from 'axios';

class SignupModel {
    // Model의 회원가입 함수
    constructor() {
        this.Signup = this.Signup.bind(this);
    }
    async Signup(id, pw, name,gender) {
        try {
            await axios.post('/helpapp/users/new', {
                user_id: id,
                user_pw: pw,
                user_name: name,
                gender: gender
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