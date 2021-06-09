import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Unity, { UnityContext } from 'react-unity-webgl';
import { unityContext } from '../../test';

const Char = (props) => {
    useEffect(() => {
        unityContext.on('canvas', (canvas) => {
            if (canvas !== null) {
                canvas.width = 300;
                canvas.height = 400;
                canvas.getContext('webgl');
            }
            props.SetChar();
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