//특정 게시글목록을 보여주는 ui이다.
import React from 'react';
import { Grid, Divider } from '@material-ui/core';
const PostList = (props) => {
    const list = props.postlist.map( // 게시글 리스트를 원하는 UI형태로 변경하여 list에 작성한다.
        (element, index) =>(<Grid className='postelement' key={index}>
            <li className='postelementlist' key={element.board_id}>
                <a className='postelementa' href = 'board' onClick = {function(ev){
                    ev.preventDefault();
                    props.onpost(element.post_id);
            }}>
                <Grid className='postitems'>
                    <Grid className ='postitemtitle'>{element.post_title}</Grid>
                    <Grid className ='postitemuser'>작성자:{element.user_id}  /  게시일:{element.created_at.substring(0,10)}</Grid>
                </Grid>
                </a>
            </li>
            <Divider/>
        </Grid>
        )
    );

    return (
        <Grid className = 'boardlistform'>
            {list}
        </Grid>
        )
};                
export default PostList;