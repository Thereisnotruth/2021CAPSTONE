//캐릭터를 보여주는 UI로 실질적으로 유니티의 화면을 받아오는 곳이다.
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Unity, { UnityContext } from 'react-unity-webgl';
import { unityContext } from '../../test';

const Char = (props) => {
    useEffect(() => {
        unityContext.on('canvas', (canvas) => { //canvas속성으로 화면의 크기를 정하고 유니티 화면을 받아온다.
            if (canvas !== null) {
                canvas.width = 300;
                canvas.height = 400;
                canvas.getContext('webgl');
            }
        });
    }, []);
    return (
        <Grid className ='drawchar'>
             <Unity 
                unityContext={unityContext}
                matchWebGLToCanvasSize={false}
            /> 
        </Grid>
    )
};

export default Char;