import React from 'react';
import { Grid} from '@material-ui/core';
import { Link} from 'react-router-dom';
const BoardListView = (props) => {
    const list = props.boardlist.map(
        (element, index) =>(<Grid key={index}>
                <li key={element.board_id}>
                    <a href = 'board' onClick = {function(ev){
                        ev.preventDefault();
                        props.onboard(element.board_id);
                   }}>
                        {element.board_name} 
                    </a>
                </li>
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