import axios from 'axios';

class UserModel {
    async getdata(){
        
    }
    async exerciseend(expart,times) {
        try {
            await axios.post('localhost:8000/v1/auth', {
                expart: expart,
                times: times
            });
        } catch(error) {
            console.log(error);
        }
    }
}

export default UserModel;