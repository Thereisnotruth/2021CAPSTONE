//특정 스터디 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState,useEffect, useRef } from 'react';
import { GiRun } from 'react-icons/gi';

import GroupView from './GroupView';
import { HeaderController } from '../ui';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';

const GroupController = ({ viewModel }) => {
    const mounted = useRef(false);
    const { Auth } = useStore();
    const history = useHistory();

    const [memberlist,setMemberlist] = useState([]);            //스터디에 속한 유저들 정보
    const [studydetail,setStudydetail] = useState([]);          //스터디의 상세 정보(스터디이름,스터디수용인원,...)
    const [groupname,setgroupname] = useState('');              //스터디의 이름
    const [groupmember,setgroupmember] = useState('');          //스터디의 속한 유저수
    const [Exercisemember,setExercisemember] = useState('');    //스터디에서 현제 운동중인 유저수
    const id = Auth.isLogged ? Auth.data.user_id:'';            //로그인 되어있으면 현재 사용자id, 안되어있으면 공백
    const [ismember,setIsmember] = useState(false);             //true= 스터디에 소속된 사람, false= 소속이 아닌 사람
    const address = (history.location.pathname);                //스터디주소(스터디ID를 추출)
    const study_id = address.replace(/[^0-9]/g,'');             //스터디ID

    const getmember = async () => {//스터디내의 유저들 정보를 받아오는 함수
        const test = await viewModel.member(study_id);//study_id스터디에 속한 유저들 정보를 viewModel에 요청
        const status = test?.status;
        setMemberlist(test.data);
        if(test.data.find(element => element.user_id === id)===undefined){
            setIsmember(false);
        }else{
            setIsmember(true);
        }
        const exercise = test.data.filter(element => true === element.exercise_state).length;
        setExercisemember(exercise);
        if (status === 200) {
            
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }

    const getstudy_detail = async () => {//스터디의 상세정보를 받아오는 함수
        const test = await viewModel.study_detail(study_id);//study_id스터디의 상세 정보를 viewModel에 요청
        const status = test?.status;
        setStudydetail(test.data);
        setgroupname(test.data.study_name);
        setgroupmember(test.data.current_user_count);
        if (status === 200) {
        }
        else {
            alert('내부 서버 오류입니다.');
        }
    }

    //페이지가 렌더링 되고 다른 입력없이 실행되는 함수(스터디 상서정보+스터디내의 유저들 정보)
    useEffect(() => {
        getstudy_detail();
        getmember();
    },[]);
      
    //스터디 가입
    const join=()=>{                                                                
        if(Auth.isLogged === false){ history.replace('/login');}                //비로그인시 로그인페이지로이동
        else{
            if(ismember===false){                                               //이미 속한 유저인지 아닌지 확인
                {
                    if(studydetail.current_user_count===studydetail.capacity){  //수용인원이 초과될경우
                        alert('더 이상 해당그룹에 가입할 수 없습니다.');
                    }else{
                        try {
                            viewModel.join(id,study_id);                        //id유저가 study_id스터디에 가입을 viewModel에 요청
                            alert('가입되었습니다.');
                            setIsmember(true);
                            getstudy_detail();
                            getmember();
                        } catch (e) {

                        }
                    }
                }
            }
            else{
                alert('이미 가입된 곳 입니다.');
            }
        }  
    }

    //스터디 탈퇴
    const disjoin=()=>{
        if(Auth.isLogged === false){ history.replace('/login');}//비로그인시 로그인페이지로이동
        else{
            if(ismember===true){                                //이미 속한 유저인지 아닌지 확인    
                if(studydetail.current_user_count===1){         //마지막 인원이 탈퇴했을 경우
                    viewModel.disjoin(id,study_id);
                    alert('탈퇴되었습니다.');
                    history.replace('/grouplist');
                }else{
                    try {
                        viewModel.disjoin(id,study_id);         //id유저가 study_id스터디에 탈퇴를 viewModel에 요청
                        alert('탈퇴되었습니다.');
                        setIsmember(false);
                        getstudy_detail();
                        getmember();
                    } catch (e) {
                        
                    }
                }
            }
            else{
                alert('해당 스터디의 맴버가 아닙니다.');
            }
        }
    }
        
       
    return (
        <>
        <HeaderController header={'그룹'}/>
        < GroupView 
            groupname={groupname}
            groupmember={groupmember}
            Exercisemember={Exercisemember}
            groupmembers = {memberlist}
            ismember = {ismember}
            join = {join}
            disjoin = {disjoin}
        />
        </>
    );
};

export default GroupController;