import React from 'react';
import { Grid ,Button} from '@material-ui/core';


const PostMakeView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='contents'>
                <h1>title</h1>
                <input
                    type='text'
                    className='title' 
                    placeholder={'제목을 작성하세요.'}
                    onChange={props.ontitleChange}
                />
                <h3>content</h3>
                <input
                    type='text'
                    className='content'
                    placeholder={'500자미만으로 작성하세오.'}
                    onChange={props.oncontentChange}
                />
                <Button onClick = {props.post}>게시글 올리기</Button>
            </Grid>
        </Grid>
    )    
};

export default PostMakeView;