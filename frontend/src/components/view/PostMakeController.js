import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PostMakeView from './PostMakeView';
import { HeaderController } from '../ui';
import useStore from '../useStore';
import {useLocation} from "react-router";

const PostMakeController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();
    const user_id = Auth.isLogged ? Auth.data.user_id:''
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const location = useLocation();
    const board_id = location.state.board_id;

    console.log(board_id);

    const ontitleChange = (e) => {
        setTitle(e.target.value);
    }
    const oncontentChange = (e) => {
        setContent(e.target.value);
    }
    const post =() =>{
        if(title ===''){
            alert('제목을 적어주세요.');
        }
        else if(content === '') {
            alert('내용을 작성하지 않았습니다.');
        }
        else{
            viewModel.makepost(board_id,user_id,title,content);
            history.replace('/');
        }
    }
    return (
        <>
        <HeaderController
            header={'게시글 작성'}
        />
        <PostMakeView 
            oncontentChange={oncontentChange}
            ontitleChange={ontitleChange}
            post={post}
        />
        </>
    );
};

export default PostMakeController;