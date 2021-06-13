//모든 그룹의정보를  목록으로 보여주는 UI이다.
import React from 'react';
import { Grid} from '@material-ui/core';
import { Link} from 'react-router-dom';
const Groupform = (props) => {

    const list = props.groupdata.map( // viewmodel에서 받아온 그룹들 정보목록을 원하는 형태로 가공해준다.
        (groupdata, index) => ( <Link className = 'groups'  to={`/group/${groupdata.study_id}`} key={index}>
            <Grid className = 'member'>인원:{groupdata.current_user_count}/{groupdata.capacity}</Grid>
            <Grid className = 'groupname'>{groupdata.study_name}</Grid>
            <Grid className = 'leader'>스터디 장:{groupdata.user_id}</Grid>
            <Grid className = 'extime'>스터디 운동시간:{groupdata.study_total_time}</Grid>
            <Grid className = 'start'>{groupdata.created_at}</Grid>
        </Link>)
      );
    return (
        <Grid className = 'groupform'>
            {list}
        </Grid>
        )
};                
export default Groupform;