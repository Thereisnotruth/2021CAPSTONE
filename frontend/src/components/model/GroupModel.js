import axios from 'axios';

class GroupModel {
    async MakeStudy(user,study,capacity) {
        try {
            await axios.post('/helpapp/study/new', {
                study_leader: user,
                study_name:study,
                study_capacity: capacity,
            }, { withCredentials: true });
        } catch(error) {
            console.log(error);
        }
    }
}

export default GroupModel;