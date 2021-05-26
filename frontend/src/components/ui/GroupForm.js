import React from 'react';
import { Grid} from '@material-ui/core';
import { Link} from 'react-router-dom';
const Groupform = (props) => {

    const list = props.groupdata.map(
        groupdata => ( <Link className = 'groups'  to={`/group/${groupdata.id}`} >
            <Grid className = 'area'>{groupdata.area}</Grid><Grid className = 'groupname'>{groupdata.groupname}</Grid>
            <Grid className = 'dataname'>membernumber:</Grid><Grid className = 'data'>{groupdata.number}/{groupdata.maxnumber}</Grid>
            <Grid className = 'dataname'>Groupleader:</Grid><Grid className = 'data'>{groupdata.leader}</Grid>
            <Grid className = 'dataname'>Attendance:</Grid><Grid className = 'data'>{groupdata.attendance}</Grid>
            <Grid className = 'dataname'>Averageexercisetime:</Grid><Grid className = 'data'>{groupdata.exercisetime}</Grid>
            <Grid className = 'dataname'>start:</Grid><Grid className = 'data'>{groupdata.startdate}</Grid>
            <Grid className = 'notion'>{groupdata.notion}</Grid>
        </Link>)
      );
    return (
        <Grid className = 'groupform'>
            {list}
        </Grid>
        )
};                
export default Groupform;