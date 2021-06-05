import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PostView from './PostView';
import { HeaderController } from '../ui';

const PostController = ({ viewModel }) => {
    const history = useHistory();
    const address = (history.location.pathname);
    const post_id = address.replace(/[^0-9]/g,'');
    console.log(post_id);

    const getdetail = async () => {
        const test = await viewModel.postdetail(post_id);
        const status = test?.status;
        console.log(test);
        if (status === 200) {
            
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    useEffect(() => {
        getdetail();
      },[]);
    return (
        <>
        <HeaderController header={'게시글'}/>
        <PostView />
        </>
    );
};

export default PostController;