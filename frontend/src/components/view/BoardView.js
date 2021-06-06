import React from 'react';
import { Grid,Button,Divider,Input } from '@material-ui/core';
import { BoardList,PostList} from '../ui';
import { Link} from 'react-router-dom';

const BoardView = (props) => {
    return (
        <Grid container direction='column'>
            <Grid className='boardlogo'>HELP</Grid>
            <Divider/>
            <Grid className='boardview'>
                <BoardList boardlist={props.boardlist} 
                            onboardnameChange={props.onboardnameChange}
                            makeboard ={props.makeboard}
                            onboard = {props.onboard}
                            boardlist={props.boardlist}/>
                {(props.board!=='')?
                <Grid>
                {(props.state===1)?<Grid className='board'>
                    <Grid className='boardbtn'>
                        {!props.changestate?
                        <Grid><Button className='makebtn' onClick ={props.makepost}>글쓰기</Button>
                        <Button className='makebtn' onClick ={props.deleteboard}>삭제</Button>
                        <Button className='makebtn' onClick ={props.change}>수정</Button></Grid>:
                        <Grid className='boardupdate'><Input 
                        type='text'
                        onChange={props.onRename}
                        />
                        <Button className='makebtn' onClick ={props.boardupdate}>수정</Button></Grid> }
                    </Grid>
                    <Divider/>
                    <Grid className='postclass'><Grid className='title'>제목</Grid><Grid className='writer'>작성자</Grid><Grid className='date'>작성일</Grid></Grid>
                    <Divider/>
                    <PostList onpost={props.onpost} postlist = {props.postlist}/>
                </Grid>:''}
                {(props.state===2)?<Grid className='board'>
                    <Grid>
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
                </Grid>:''}
                {(props.state===3)?<Grid className='board'>   
                    <Grid>
                        <h1>제목:{props.posttitle}</h1><h2>작성자:{props.postuser}</h2>
                        <h2>내용:{props.postcontent}</h2>작성일자:{props.postcreat}
                    </Grid>
                    <Divider/>
                    {(props.user_id===props.postuser)?
                    <Grid>
                        <Button className='makebtn' onClick ={props.deletepost}>글삭제</Button>
                        <Button className='makebtn' onClick ={props.postupdatestate}>글수정</Button></Grid>:''}
                </Grid>:''}
                {(props.state===4)?<Grid className='board'>
                    <Grid>
                        <h1>title</h1>
                        <input
                            type='text'
                            className='title' 
                            placeholder={props.posttitle}
                            onChange={props.onposttitleChange}
                        />
                        <h3>content</h3>
                        <input
                            type='text'
                            className='content'
                            placeholder={props.postcontent}
                            onChange={props.onpostcontentChange}
                        />
                        <Button onClick = {props.updatepost}>수정</Button>`
                    </Grid>
                </Grid>:''}
                
            </Grid>:''}
            </Grid>
        </Grid>
    )    
};

export default BoardView;