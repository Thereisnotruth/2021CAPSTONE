import React from 'react';
import { Grid, Divider } from '@material-ui/core';
const PostList = (props) => {

    const list = props.postlist.map(
        (element, index) =>(<Grid className='postelement' key={index}>
            <li key={element.board_id}>
                <a href = 'board' onClick = {function(ev){
                    ev.preventDefault();
                    props.onpost(element.post_id);
            }}>
                <Grid className='postitems'>
                    <Grid className ='postitemtitle'>{element.post_title}</Grid>
                    <Grid className ='postitemuser'>{element.user_id}</Grid>
                    <Grid className ='postitemcreate'>{element.created_at.substring(0,10)}</Grid>
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