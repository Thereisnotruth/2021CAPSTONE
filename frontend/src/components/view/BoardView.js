import React from 'react';
import { Grid,Button,Divider } from '@material-ui/core';
import { BoardList,PostList} from '../ui';

const BoardView = (props) => {
    return (
        <Grid className='boardmainview'>
            <Grid className='boardview'>
                <BoardList boardlist={props.boardlist} 
                            onboardnameChange={props.onboardnameChange}
                            makeboard ={props.makeboard}
                            onClickboard = {props.onClickboard}
                            boardlist={props.boardlist}/>
                {(props.board!=='')?
                <Grid className='element'><Grid className='nameboard'>{props.boardtitle}</Grid>
                {(props.state===1)?<Grid className='board'>
                    <Grid className='boardbtn'>
                        {!props.changestate?
                        <Grid className='boardbtns'><Button className='makebtn' onClick ={props.makepost}>글쓰기</Button>
                        <Button className='makebtn' onClick ={props.deleteboard}>삭제</Button>
                        <Button className='makebtn' onClick ={props.change}>수정</Button></Grid>:
                        <Grid className='boardupdate'><input 
                        type='text'
                        className ='boardname'
                        onChange={props.onRename}
                        />
                        <Button className='makebtn' onClick ={props.boardupdate}>수정</Button></Grid> }
                    </Grid>
                    <Divider/>

                    <PostList onpost={props.onpost} postlist = {props.postlist}/>
                </Grid>:''}
                {(props.state===2)?<Grid className='board'>
                    <Grid className='post'>
                        <textarea
                            type='text'
                            className='title' 
                            placeholder={'제목'}
                            onChange={props.ontitleChange}
                        />
                        <textarea
                            type='text'
                            className='content'
                            placeholder={'내용을 입력하세요.'}
                            onChange={props.oncontentChange}
                        />
                        <Grid className='btncol'>
                            <Button className='makebtn' onClick = {props.post}>게시글 올리기</Button>
                            <Button className='makebtn' onClick = {props.back}>돌아가기</Button>
                        </Grid>
                    </Grid>
                </Grid>:''}
                {(props.state===3)?<Grid className='board'>   
                    <Grid className = 'postview'>
                        <Grid className='postviewtitle'>
                            <Grid className='postviewtitlefirst'>
                                <Grid className='title'><p>제 목:</p></Grid>
                                <Grid className='titlename'>{props.posttitle}</Grid>
                            </Grid>
                            <Grid className='postviewtitlesecon'>
                                <Grid className='user'>작성자:</Grid>
                                <Grid className='username'>{props.postuser}</Grid>
                            </Grid>
                            <Grid className='date'>{props.postcreat}</Grid>
                        </Grid>
                        <Grid className='postblank'></Grid>
                        <Grid className='content'>{props.postcontent}</Grid>
                    </Grid>
                    {(props.user_id===props.postuser)?
                    <Grid className ='postbtn'>
                        <Button className='makedelbtn' onClick ={props.deletepost}>글삭제</Button>
                        <Button className='makeupbtn' onClick ={props.postupdatestate}>글수정</Button></Grid>:''}
                </Grid>:''}
                {(props.state===4)?<Grid className='board'>
                    <Grid className='post'>
                        <textarea
                            type='text'
                            className='title' 
                            onChange={props.onposttitleChange}
                        >{props.posttitle}</textarea>
                        <textarea
                            type='text'
                            className='content'
                            onChange={props.onpostcontentChange}
                        >{props.postcontent}</textarea>
                        <Grid className='btncol'>
                            <Button className='makebtn' onClick = {props.updatepost}>수정</Button>
                            <Button className='makebtn' onClick = {props.back}>돌아가기</Button>
                        </Grid>
                    </Grid>
                </Grid>:''}
                
            </Grid>:''}
            </Grid>
        </Grid>
    )    
};

export default BoardView;