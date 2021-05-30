import React from 'react';
import { Grid} from '@material-ui/core';
import { Link} from 'react-router-dom';
const Groupform = (props) => {

    const list = props.groupdata.map(
        groupdata => ( <Link className = 'groups'  to={`/group/${groupdata.study_id}`} >
            <Grid className = 'groupname'>{groupdata.study_name}</Grid>
            <Grid className = 'dataname'>membernumber:</Grid><Grid className = 'data'>{groupdata.number}/{groupdata.capacity}</Grid>
            <Grid className = 'dataname'>Groupleader:</Grid><Grid className = 'data'>{groupdata.user_id}</Grid>
            <Grid className = 'dataname'>exercise total time:</Grid><Grid className = 'data'>{groupdata.study_total_time}</Grid>
            <Grid className = 'dataname'>start:</Grid><Grid className = 'data'>{groupdata.created_at}</Grid>
        </Link>)
      );
    return (
        <Grid className = 'groupform'>
            {list}
        </Grid>
        )
};                
export default Groupform;