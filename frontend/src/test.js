import Unity, { UnityContext } from 'react-unity-webgl';
export const unityContext = new UnityContext({
    loaderUrl: 'Build/help.loader.js',
    dataUrl: 'Build/help.data',
    frameworkUrl: 'Build/help.framework.js',
    codeUrl: 'Build/help.wasm'
});
