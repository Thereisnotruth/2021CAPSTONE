import axios from 'axios';

class GroupModel {

   test = async () => {
        const a = await axios.get('/helpapp/dsfadsf');
        return a;
    }

}

export default GroupModel;