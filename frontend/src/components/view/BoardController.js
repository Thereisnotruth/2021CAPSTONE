import React, { useState,useEffect } from 'react';

import { HeaderController  } from '../ui';
import BoardView from './BoardView';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';

const BoardController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();
    const [boardlist,setBoardlist] = useState([]);
    const [postlist,setPostlist] = useState([]);
    const user_id = Auth.isLogged ? Auth.data.user_id:''
    const [board_name,setBoard_name] = useState('');
    const [board,setBoard] = useState('');
    const [boardtitle,setBoardtitle] = useState('');
    const [changestate,setChangestate] = useState(false);
    const [rename,setRename] = useState('');
    const [state,setState] = useState(1);
    const [postid,setPostid] = useState('');
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [posttitle,setPosttitle] = useState('');
    const [postcontent,setPostcontent] = useState('');
    const [postcreat,setPostcreate] = useState('');
    const [postuser,setPostuser] = useState('');
    const [updatetitle,setUpdatetitle] = useState('');
    const [updatecontent,setUpdatecontent] = useState('');


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
            viewModel.makepost(board,user_id,title,content);
            setState(1);
            setBoard(board);
            onboard(board);
        }
    }
    const getboardlist = async (del) => {
        const test = await viewModel.boardlist();
        const status = test?.status;

        if(test.data.length !==0){
            if(board===''){
                setBoard(test.data[0].board_id);
                setBoardtitle(test.data[0].board_name);
                onboard(test.data[0].board_id);}
            else if(del===1){
                setBoard(test.data[0].board_id);
                setBoardtitle(test.data[0].board_name);
                onboard(test.data[0].board_id);
            }else{
                setBoard(board);
                onboard(board);
            }
        }
        if (status === 200) {
            setBoardlist(test.data);
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    useEffect(() => {
        getboardlist(0);
      },[]);

    const makeboard = ()=>{
        if(Auth.isLogged === false){ history.replace('/login');}
        else{
            if(board_name===''){
                alert('게시판 이름을 작성해야합니다.');
            }
            else{
                viewModel.makeboard(user_id, board_name);
                setBoard_name('');
                getboardlist(0);
            }
        }
    }
    const onboardnameChange= (e) =>{
        setBoard_name(e.target.value);
    }
    const onClickboard =(board_id,title)=>{
        setBoardtitle(title);
        onboard(board_id);
    }
    const onboard= async(board_id) =>{
        setBoard(board_id);
        const test = await viewModel.boardpostlist(board_id);
        setTitle('');
        setContent('');
        setRename('');
        setState(1);
        setPostlist(test.data);
        setChangestate(false);
    }
    const onpost= (post_id) =>{
        setTitle('');
        setContent('');
        setRename('');
        setState(3);
        getdetail(post_id);
    }
    const deleteboard = () =>{
        viewModel.board_delete(user_id,board);
        getboardlist(1);
    }
    const makepost = ()=>{
        if(Auth.isLogged === false){ history.replace('/login');}
        else{
            setTitle('');
            setContent('');
            setRename('');
            setState(2);
            /*{history.push({
                pathname: "/postmake",
                state: {board_id: board}
              })}*/
        }
    }
    const boardupdate =() =>{
        if(rename===''){setChangestate(false);}
        else{
            setBoardtitle(rename);
            viewModel.board_update(board,rename,user_id);
            setRename('');
            setChangestate(false);
            getboardlist(0);
        }
    }
    const change =() =>{
        setChangestate(true);
    }
    const onRename =(e) =>{
        setRename(e.target.value);
    }
    const getdetail = async (post_id) => {
        const test = await viewModel.postdetail(post_id);
        const status = test?.status;
        const data = test.data
        setPostid(data.post_id);
        setPosttitle(data.post_title);
        setPostcontent(data.post_content);
        const alltime = data.updated_at;
        const idx = alltime.indexOf("T");
        const date = alltime.substring(0,idx);
        setPostcreate(date);
        setPostuser(data.user_id);
        if (status === 200) {
            
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }
    const deletepost =()=>{//post_id, user_id
        viewModel.deletepost(postid,user_id);
        onboard(board);
        setState(1);
    }
    
    const postupdatestate=()=>{//post_id, user_id, post_title, post_content
        setState(4);
    }
    const onposttitleChange = (e) => {
        setUpdatetitle(e.target.value);
    }
    const onpostcontentChange = (e) => {
        setUpdatecontent(e.target.value);
    }
    
    const updatepost=()=>{//post_id, user_id, post_title, post_content
        viewModel.updatepost(postid, user_id, updatetitle, updatecontent);
        setState(1);
        onboard(board);
    }
    const back=()=>{
        if(state===2){setState(1);}
        else{setState(3);}
        
    }
    return (
        <>
        <HeaderController header='게시판' />
        <BoardView 
            onboardnameChange={onboardnameChange}
            makeboard={makeboard}
            makepost={makepost}
            onboard={onboard}
            onpost={onpost}
            deleteboard={deleteboard}
            boardupdate={boardupdate}
            change={change}
            onRename={onRename}
            ontitleChange={ontitleChange}
            oncontentChange={oncontentChange}
            post={post}
            deletepost={deletepost}
            updatepost={updatepost}
            onposttitleChange={onposttitleChange}
            onpostcontentChange={onpostcontentChange}
            postupdatestate={postupdatestate}
            onClickboard={onClickboard}
            back={back}
            board={board}
            user_id={user_id}
            state={state}
            boardlist = {boardlist}
            postlist = {postlist}
            changestate={changestate}
            posttitle={posttitle}
            postcontent={postcontent}
            postcreat={postcreat}
            postuser={postuser}
            boardtitle={boardtitle}/>
        </>
    );
};

export default BoardController;