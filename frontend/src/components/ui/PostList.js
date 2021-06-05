import React from 'react';
import { Grid} from '@material-ui/core';
import { Link} from 'react-router-dom';
const PostList = (props) => {
    const list = props.postlist.map(
        (element, index) =>(<Link to={`/post/${element.post_id}`} key={index}>
                <Grid>제목: {element.post_title}</Grid>
                <Grid>작성자: {element.user_id}</Grid>
                <Grid>작성일: {element.created_at}</Grid>
            </Link>
        )
    );

    return (
        <Grid className = 'boardlistform'>
            {list}
        </Grid>
        )
};                
export default PostList;