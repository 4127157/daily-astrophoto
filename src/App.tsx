import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Photo } from './components/Photo';
import { Loader } from './components/Loader';
import { InfoComp } from './components/InfoComp';

import logo from './logo.svg';
import styles from './App.module.css';

type AnyObj = {
    [key: string]: any,
};

const App: Component = () => {

    let photoMeta: AnyObj | undefined = undefined;
    const [elem, setElem] = createSignal(<Loader/>);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const CORS_PROXY_URL = 'https://corsproxy.io/?'; //May be subject to limits or change, not required in final deploy
    //Alternative - cors.sh 

    
    fetch("https://apod.as93.net/apod", { signal: controller.signal })
    .then(res => res.json())
    .then(data => {
        clearTimeout(timeoutId);
        photoMeta = {...data}; //Deep copying isn't required in v1 but if it is JSON.parse(JSON.stringify(data)) should make it work
        if(photoMeta){
            delete photoMeta.hdurl;
        }
        let formattedURL = `${CORS_PROXY_URL + encodeURIComponent(data.hdurl)}`;
        return fetch(formattedURL, { 
            signal: controller.signal,
            /*mode: "cors"*/});
    })
    .then(imgRes =>{
        clearTimeout(timeoutId);
        return imgRes.blob();
    })
    .then(imgBlob => {
        const imgBlobURL = URL.createObjectURL(imgBlob);
        if(photoMeta){
            setElem(<>
                <Photo url={imgBlobURL}/>
                <InfoComp metadata={photoMeta}/>
            </>);
        }
    });
  return (
    <div class={styles.App}>
       <h1 class={styles.heading}>Astronomy Photo of The Day</h1>
       {elem()}
    </div>
  );
};

export default App;
