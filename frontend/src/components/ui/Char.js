import React from 'react';
import { Grid } from '@material-ui/core';
import Unity, { UnityContext } from 'react-unity-webgl';
import { unityContext } from '../../test';

unityContext.on('canvas', (canvas) => {
    canvas.width = 300;
    canvas.height = 400;
});

const Char = (props) => {
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