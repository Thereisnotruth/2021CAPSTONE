import { UnityContext } from 'react-unity-webgl';
export const unityContext = new UnityContext({
    loaderUrl: 'static/Build/help.loader.js',
    dataUrl: 'static/Build/help.data',
    frameworkUrl: 'static/Build/help.framework.js',
    codeUrl: 'static/Build/help.wasm'
});
