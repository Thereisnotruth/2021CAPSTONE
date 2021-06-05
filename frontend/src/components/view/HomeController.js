import React, { useState } from 'react';

import { HeaderController  } from '../ui';
import HomeView from './HomeView';
import { unityContext } from '../../test';

const HomeController = ({ viewModel }) => {
    const [time, setTime] = useState({h:0,m:0,s:0});
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const [message, setmessage] = useState('');
    const [expart, setExpart] = useState('');
    let today = new Date();
    const start = () => {
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
    };
    var updatedH = time.h, updatedM = time.m, updatedS = time.s;
    const run=()=>{
        if(updatedM===59){
            updatedH++;
            updatedM=0;
        }
        if(updatedS===59){
            updatedM++;
            updatedS=0;
        }
        updatedS++;
        return setTime({h:updatedH,m:updatedM,s:updatedS});
    };
    const stop=()=>{
        if(message===''){
            levelChange();
            clearInterval(interv);
            const times = time.h * 3600 + time.m * 60 + time.s;
            setTime({h:0,m:0,s:0});
            setStatus(0);
            viewModel.exercise(expart, times, 2);
        }
    }
    const levelChange = () => {
        let level;
        if(time.s > 10) {
            level = 3;
        }
        else if(time.s > 5) {
            level = 2;
        }
            else if(time.s > 2)
            {
            level = 1;
            }
            
        unityContext.send('Man', 'LevelChange', level);
    }

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