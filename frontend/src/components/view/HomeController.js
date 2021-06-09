import React, { useState,useEffect } from 'react';

import { HeaderController  } from '../ui';
import HomeView from './HomeView';
import { unityContext } from '../../test';
import useStore from '../useStore';
import { useHistory } from 'react-router-dom';


const HomeController = ({ viewModel }) => {
    const { Auth } = useStore();
    const [time, setTime] = useState({h:0,m:0,s:0});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const [message, setmessage] = useState('');
    const [expart, setExpart] = useState('');
    const history = useHistory();

    let today = new Date();
        const start = () => {
            if(Auth.isLogged){
                if(expart===''){
                    setmessage('운동부위를 선택해주세요.');
                }
                else{
                    if(message ===''){
                        run();
                        setStatus(1);
                        const now = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
                        setInterv(setInterval(run,1000));
                        viewModel.exercise(expart, now, 1);
                    }
                }
            }
            else {
                alert('로그인을 해야 사용가능한 기능입니다.');
                history.replace('/login');
            }
        };
    var updatedH = time.h, updatedM = time.m, updatedS = time.s;
    const run=()=>{
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
    const stop=()=>{
        if(message===''){
            clearInterval(interv);
            const times = time.h * 3600 + time.m * 60 + time.s;
            console.log(times);
            levelChange(times);
            setTime({h:0,m:0,s:0});
            setStatus(0);
            viewModel.exercise(expart, times, 2);
        }
    }

    const levelChange = (times) => {   
        let Headandchest_level = (expart==="2")?levelcheck(Auth.data.chest_exp+times):levelcheck(Auth.data.chest_exp);
        let Back_level = (expart==="1")? levelcheck(Auth.data.back_exp + times):levelcheck(Auth.data.back_exp);
        let Arm_level = (expart==="5")?levelcheck(Auth.data.arm_exp + times):levelcheck(Auth.data.arm_exp);
        let Lowerbody_level = (expart==="6")?levelcheck(Auth.data.leg_exp + times):levelcheck(Auth.data.leg_exp);
        let Abs_level = (expart==="4")?levelcheck(Auth.data.belly_exp + times):levelcheck(Auth.data.belly_exp);
        let Shoulder_level = (expart==="3")?levelcheck(Auth.data.shoulder_exp + times):levelcheck(Auth.data.shoulder_exp);
        let Gender = (Auth.data.gender==='M')?0:1;

        unityContext.send('BigMan', 'Headandchest_LevelChange', Headandchest_level);
        unityContext.send('BigMan', 'Back_LevelChange', Back_level);
        unityContext.send('BigMan', 'Arm_LevelChange', Arm_level);
        unityContext.send('BigMan', 'Lowerbody_LevelChange', Lowerbody_level);
        unityContext.send('BigMan', 'Abs_LevelChange', Abs_level);
        unityContext.send('BigMan', 'Shoulder_LevelChange', Shoulder_level);
        unityContext.send('BigMan', 'GenderChange', Gender);
    }
    const levelcheck = (parttime) =>{//전부 초단위 exp단위도 sec
        if(parttime<4500){
            return 1;
        }else if(4500<=parttime<45000){
            return 2;
        }else if(45000<=parttime<125000){
            return 3;
        }else if(125000<=parttime<275000){
            return 4;
        }else if(275000<=parttime<815000){
            return 5;
        }else if(815000<=parttime){
            return 6;
        }

    }
////////////////////////////////////////////////////////////////////
    const SetChar = () => {
        console.log('test');
        let Headandchest_level=1;
        let Back_level=1;
        let Arm_level=1;
        let Lowerbody_level=1;
        let Abs_level=1;
        let Shoulder_level=1;
        let Gender=0;
        if(Auth.islogged){
            if (Auth.data.gender==='M'){ //0 남자 1여자
                Gender = 0;
            }else {
                Gender = 1;
            }
        }
        unityContext.send('BigMan', 'Headandchest_LevelChange', Headandchest_level);
        unityContext.send('BigMan', 'Back_LevelChange', Back_level);
        unityContext.send('BigMan', 'Arm_LevelChange', Arm_level);
        unityContext.send('BigMan', 'Lowerbody_LevelChange', Lowerbody_level);
        unityContext.send('BigMan', 'Abs_LevelChange', Abs_level);
        unityContext.send('BigMan', 'Shoulder_LevelChange', Shoulder_level);
        unityContext.send('BigMan', 'GenderChange', Gender);
    }
////////////////////////////////////////////////////////////////////

    const exerciseChange = (e) =>{
        if(status===0){
            if(e.target.value==='')
                setmessage('운동부위를 선택해주세요.');
            else{
                setmessage('');
                setExpart(e.target.value);
            }
        }
        else{
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
            SetChar={SetChar}
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