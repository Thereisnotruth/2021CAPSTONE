//게시판 list를 실질적으로 보여주는 ui이다.
import React from 'react';
import { Grid} from '@material-ui/core';
const BoardListView = (props) => {
    const list = props.boardlist.map( // 게시판 리스트를 원하는 ui형태로 변경하여 list에 작성한다.
        (element, index) =>(<Grid key={index}>
                <li key={element.board_id}>
                    <a href = 'board' onClick = {function(ev){
                        ev.preventDefault();
                        props.onClickboard(element.board_id,element.board_name);
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