//게시판+게시글 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState,useEffect } from 'react';
import { HeaderController  } from '../ui';
import BoardView from './BoardView';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';

const BoardController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();
    const [boardlist,setBoardlist] = useState([]);          //게시판 목록
    const [postlist,setPostlist] = useState([]);            //특정게시판의 게시글 목록
    const user_id = Auth.isLogged ? Auth.data.user_id:''    //로그인 되어있으면 현재 사용자id, 안되어있으면 공백
    const [board_name,setBoard_name] = useState('');        //생성할 게시판이름
    const [board,setBoard] = useState('');                  //유저가 보고있는 게시판의 ID
    const [boardtitle,setBoardtitle] = useState('');        //유저가 보고있는 게시판의 이름
    const [changestate,setChangestate] = useState(false);   //false=게시판을 수정하기를 원함,true=원하지않음
    const [rename,setRename] = useState('');                //수정할 게시판의 새이름
    const [state,setState] = useState(1);                   //state에 따라 화면을 정한다. - BoardView.js
    const [postid,setPostid] = useState('');                //유저가 보고있는 게시글의 ID
    const [title,setTitle] = useState('');                  //게시글 작성시 제목
    const [content,setContent] = useState('');              //게시글 작성시 내용
    const [posttitle,setPosttitle] = useState('');          //유저가 보고있는 게시글의 제목
    const [postcontent,setPostcontent] = useState('');      //유저가 보고있는 게시글의 내용
    const [postcreat,setPostcreate] = useState('');         //유저가 보고있는 게시글의 작성날짜
    const [postuser,setPostuser] = useState('');            //유저가 보고있는 게시글의 작성자
    const [updatetitle,setUpdatetitle] = useState('');      //게시글을 수정할 때 새 제목
    const [updatecontent,setUpdatecontent] = useState('');  //게시글을 수정할 때 새 내용

    
    
    //게시판 목록을 받아오는 함수
    const getboardlist = async (del) => {           //del 어느 버튼에서 요청한 것인지 확인(0=페이지렌더링시+게시판생성후,1=게시판삭제후)
        const test = await viewModel.boardlist();   //viewModel에 게시판들의 목록을 요청
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

    //게시판 생성
    const onboardnameChange= (e) =>{//생성할 게시판이름
        setBoard_name(e.target.value);
    }
    const makeboard = ()=>{//게시판 생성함수
        if(Auth.isLogged === false){ history.replace('/login');}
        else{
            if(board_name===''){
                alert('게시판 이름을 작성해야합니다.');
            }
            else{
                viewModel.makeboard(user_id, board_name); //게시판 작성을 viewModel로 필요 정보와 함께 요청
                setBoard_name('');
                getboardlist(0);
            }
        }
    }
    const change =() =>{//수정 버튼 클릭시 실행함수
        setChangestate(true);
    }
    const onRename =(e) =>{//수정할 게시판의 새이름
        setRename(e.target.value);
    }
    const boardupdate =() =>{//게시판 수정 함수
        if(rename===''){setChangestate(false);}
        else{
            setBoardtitle(rename);
            viewModel.board_update(board,rename,user_id);   //게시판 수정을 viewModel로 필요 정보와 함께 요청
            setRename('');
            setChangestate(false);
            getboardlist(0);
        }
    }
    const deleteboard = () =>{                  //게시판을 삭제하는 함수
        viewModel.board_delete(user_id,board);  //viewModel로 정보와 함께 게시판 삭제를 요청
        getboardlist(1);
    }

    //게시글 생성
    const ontitleChange = (e) => {//게시글 작성시 제목
        setTitle(e.target.value);
    }
    const oncontentChange = (e) => {//게시글 작성시 내용
        setContent(e.target.value);
    }
    const post =() =>{//게시글 생성 함수
        if(title ===''){
            alert('제목을 적어주세요.');
        }
        else if(content === '') {
            alert('내용을 작성하지 않았습니다.');
        }
        else{
            viewModel.makepost(board,user_id,title,content);//게시글 작성을 viewModel로 필요정보와 함께 요청
            setState(1);
            setBoard(board);
            onboard(board);
        }
    }
    const postupdatestate=()=>{                 //게시글 수정을 원할 때
        setState(4);                            //게시글 수정화면
    }
    const onposttitleChange = (e) => {          //게시글을 수정할 때 새 제목
        setUpdatetitle(e.target.value);
    }
    const onpostcontentChange = (e) => {        //게시글을 수정할 때 새 내용

        setUpdatecontent(e.target.value);
    }
    const updatepost=()=>{                      //게시글 수정
        viewModel.updatepost(postid, user_id, updatetitle, updatecontent);//게시글들수정을 viewModel에 필요 정보들과 함께 요청
        setState(1);
        onboard(board);
    }
    const deletepost =()=>{                     //게시글 삭제
        viewModel.deletepost(postid,user_id);   //게시글들삭제를 viewModel에 필요 정보들과 함께 요청
        onboard(board);
        setState(1);
    }
    
    //페이지가 렌더링 되고 다른 입력없이 실행되는 함수(게시판 목록을 가져온다.)
    useEffect(() => {
        getboardlist(0);
      },[]);

    
    
    const onClickboard =(board_id,title)=>{//선택한 게시판의 정보를 원하는 변수에 입력하는 함수
        setBoardtitle(title);
        onboard(board_id);
    }

    const onboard= async(board_id) =>{//board_id의 게시글들의 목록을 설정하는 함수
        setBoard(board_id);
        const test = await viewModel.boardpostlist(board_id);//board_id의 게시글들의 목록을 viewModel에 요청
        
        //다른 화면에서 페이지 이동 되었을 때 다른 변수 초기화
        setTitle('');
        setContent('');
        setRename('');
        setChangestate(false);
        setState(1);            //게시글 목록을 보여주는 상태
        setPostlist(test.data); //게시글 목록을 선택한 게시판의 게시글 목록으로 변화  

    }

    const onpost= (post_id) =>{ //게시글을 선택 했을 때 실행되는 함수
        //다른 화면에서 페이지 이동 되었을 때 다른 변수 초기화
        setTitle('');
        setContent('');
        setRename('');
        setState(3);            //게시시글을 보여주는 화면
        getdetail(post_id);
    }
    
    const makepost = ()=>{ //글쓰기 버튼 클릭시 실행함수
        if(Auth.isLogged === false){ history.replace('/login');}
        else{
            setTitle('');
            setContent('');
            setRename('');
            setState(2);//게시글 생성화면
        }
    }
    
    const getdetail = async (post_id) => {                  //선택한 게시글 정보 가져오는 함수
        const test = await viewModel.postdetail(post_id);   //선택한 게시글 정보를 viewModel에 요청
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

    
    const back=()=>{                    //이전화면으로 돌아가기
        if(state===2){setState(1);}     //글 작성시 게시판의 게시글 목록
        else{setState(3);}              //글 수정시 글 화면
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