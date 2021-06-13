//홈 화면을 조정하는 코드이다.
//viewmodel에서 데이터를 받아와 원하는 변수에 담아 view에 전송해준다.
import React, { useState,useEffect } from 'react';

import { HeaderController  } from '../ui';
import HomeView from './HomeView';
import { unityContext } from '../../test';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';


const HomeController = ({ viewModel }) => {
    const { Auth } = useStore();
    const history = useHistory();
    const [time, setTime] = useState({h:0,m:0,s:0});    //타이머시간(h:m:s)
    const [interv, setInterv] = useState();             //타이머 실행을 판별
    const [status, setStatus] = useState(0);            //운동상태인지 아닌지 판별(0=운동중X,1=운동중O)
    const [message, setmessage] = useState('');         //오류메시지
    const [expart, setExpart] = useState('');           //운동부위


    let today = new Date();
    const start = () => {//타이머 시작
        if(Auth.isLogged){
            if(expart===''){
                setmessage('운동부위를 선택해주세요.');
            }
            else{
                if(message ===''){
                    run();
                    setStatus(1);
                    const now = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
                    setInterv(setInterval(run,1000));//1초에 1번실행
                    viewModel.exercise(expart, now, 1); //운동부위 + 현재 시간+ 운동중 을 viewModel에 전달한다.
                }
            }
        }
        else {
            alert('로그인을 해야 사용가능한 기능입니다.');
            history.replace('/login');
        }
    };
    var updatedH = time.h, updatedM = time.m, updatedS = time.s;
    const run=()=>{//타이머시간이 흐르는 함수
        if(updatedM===59){
            updatedH++;
            updatedM=0;
            
        }
        if(updatedS===59){
            updatedM++;
            updatedS=-1;
        }
        updatedS++;
        return setTime({h:updatedH,m:updatedM,s:updatedS});
    };
    const stop=()=>{//타이머 정지
        if(message===''){
            clearInterval(interv);//1초에한번 실행하는 것을 정지
            const times = time.h * 3600 + time.m * 60 + time.s;
            levelChange(times);
            setTime({h:0,m:0,s:0});
            setStatus(0);
            viewModel.exercise(expart, times, 2); //운동부위 + 현재 시간+ 운동종료를 viewModel에 전달한다.
        }
    }

    const levelChange = (times) => { //유니티에 유저의 운동량에 따라 부위별 수치 전송
        let Headandchest_level = (expart==="2")?levelcheck1(Auth.data.chest_exp+times):levelcheck1(Auth.data.chest_exp);    //머리+가슴level
        let Back_level = (expart==="1")? levelcheck2(Auth.data.back_exp + times):levelcheck2(Auth.data.back_exp);           //등level
        let Arm_level = (expart==="5")?levelcheck1(Auth.data.arm_exp + times):levelcheck1(Auth.data.arm_exp);               //팔level
        let Lowerbody_level = (expart==="6")?levelcheck2(Auth.data.leg_exp + times):levelcheck2(Auth.data.leg_exp);         //하체level
        let Abs_level = (expart==="4")?levelcheck1(Auth.data.belly_exp + times):levelcheck1(Auth.data.belly_exp);           //복근level
        let Shoulder_level = (expart==="3")?levelcheck1(Auth.data.shoulder_exp + times):levelcheck1(Auth.data.shoulder_exp);//어깨level
        let Gender = (Auth.data.gender==='M')?0:1;                                                                          //성별
        //가슴 배 어깨 팔 ->6 //하체 등 ->4

        //유니티에 각각의 부위level을 전송
        unityContext.send('BigMan', 'Headandchest_LevelChange', Headandchest_level);
        unityContext.send('BigMan', 'Back_LevelChange', Back_level);
        unityContext.send('BigMan', 'Arm_LevelChange', Arm_level);
        unityContext.send('BigMan', 'Lowerbody_LevelChange', Lowerbody_level);
        unityContext.send('BigMan', 'Abs_LevelChange', Abs_level);
        unityContext.send('BigMan', 'Shoulder_LevelChange', Shoulder_level);
        unityContext.send('BigMan', 'GenderChange', Gender);
    }

    //level이 6단계인 부위 level체크
    const levelcheck1 = (parttime) =>{//전부 초단위 exp단위도 sec
        if(parttime<4500){
            return 1;
        }else if(4500<=parttime&&parttime<45000){
            return 2;
        }else if(45000<=parttime&&parttime<125000){
            return 3;
        }else if(125000<=parttime&&parttime<275000){
            return 4;
        }else if(275000<=parttime&&parttime<815000){
            return 5;
        }else if(815000<=parttime){
            return 6;
        }

    }
    //level이 4단계인 부위 level체크
    const levelcheck2 = (parttime) =>{//전부 초단위 exp단위도 sec
        if(parttime<4500){
            return 1;
        }else if(4500<=parttime&&parttime<275000){
            return 2;
        }else if(275000<=parttime&&parttime<815000){
            return 3;
        }else if(815000<=parttime){
            return 4;
        }

    }

    const exerciseChange = (e) =>{//운동부위 설정
        if(status===0){//운동중이 아닐경우 운동부위를 선택하게한다.
            if(e.target.value==='')
                setmessage('운동부위를 선택해주세요.');
            else{
                setmessage('');
                setExpart(e.target.value);
            }
        }
        else{//운동중일경우 부위변경을 못하게 한다.
            if(expart===e.target.value){
                setmessage('');
            }
            else{
                setmessage('운동중 운동부위 변경은 불가 합니다.');
            }
        }
    }
    return (
        <>
        <HeaderController header='캐릭터' />
        <HomeView
            time={time}
            message={message}
            status={status}
            start={start}
            run={run}
            stop={stop}
            exerciseChange={exerciseChange}
        />
        </>
    );
};

export default HomeController;