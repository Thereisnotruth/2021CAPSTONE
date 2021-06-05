import React from 'react';
import { Grid} from '@material-ui/core';
import { Link} from 'react-router-dom';
const BoardListView = (props) => {

    console.log(props.boardlist);
    const list = props.boardlist.map(
        (element) =>(<Grid>
                <button>{element.board_name}</button>
            </Grid>
        )
    );

    return (
        <Grid className = 'boardlistform'>
            {list}
        </Grid>
        )
};                
export default BoardListView;