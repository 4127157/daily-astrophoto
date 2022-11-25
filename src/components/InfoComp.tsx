import { createSignal, Match, Switch } from 'solid-js';
import { Show } from 'solid-js';
import ExpandMoreIcon from '@suid/icons-material/ExpandMore';
import ExpandLessIcon from '@suid/icons-material/ExpandLess';
import anime from 'animejs/lib/anime.es.js';

import styles from '../App.module.css';
type AnyObj =  {
    [key: string]: any,
}

interface InfoProps {
    metadata: AnyObj,
}

export function InfoComp(props: InfoProps) {
    console.log(props.metadata);
    //hdurl and copyright in span
    // const [clicked, setClicked] = createSignal(false);
    const [toggle, setToggle] = createSignal(false);
    let infoDiv!: HTMLDivElement; 
    const [infoExpandDiv, setInfoExpandDiv]: [any, any] = createSignal(undefined);
    const [animComplete, setAnimComplete] = createSignal(false, {equals: false});
    // let infoExpandDiv!: HTMLDivElement;

    function playAnim(close: boolean) {
        let animation = anime({
            targets: infoDiv,
            translateY: () => {
                if(!close) {
                    return '-40vh';
                } else {
                    return '0';
                }
            },
            duration:500,
            easing: 'easeInOutCirc',
            });

        animation.play;
        animation.finished.then(() => setAnimComplete(!animComplete()));
    }

    function playInfoExpandAnim(elem: HTMLDivElement){
        // console.log(elem.children[0]);
    
        let infoExpandAnimation = anime({
            targets: elem,
            height: '100px',
            duration: 500,
            easing: 'easeInOutSine'
        });

        let infoInternalAnim = anime({
            targets: elem.children[0],
            opacity: '1',
            duration: 2000,
            easing: 'easeInCirc'
        });

        infoExpandAnimation.play;
        infoInternalAnim.play;
    }

    return (
    <div class={styles.info} ref={infoDiv} >
        <div class={styles.infoClickable} onClick={() =>{
                playAnim(toggle());
                setToggle(!toggle());
            }}>
            <h2 class={styles.infoHeader}>{props.metadata.title}</h2>
            <span>MORE INFO</span>
            <Switch>
                <Match when={animComplete() === true}>
                    <ExpandMoreIcon sx={{ fontSize: 40 }} style={ 'display: block; margin:auto;'}  class={styles.infoMaterialExpand}/>
                </Match>
                <Match when={animComplete() === false}>
                    <ExpandLessIcon sx={{ fontSize: 40 }} style={ 'display: block; margin:auto;'} class={styles.infoMaterialExpand}/>
                </Match>
            </Switch>
            
        </div>
        <div class={styles.infoExpand} ref={el => { playInfoExpandAnim(el); setInfoExpandDiv(el); }}>
            <div class={styles.infoExpandChild}>
                <p class={styles.infoExplanation}>{props.metadata.explanation}</p>
                {props.metadata.hdurl ? 
                    <a href={props.metadata.hdurl} target='_blank'><button>View Full Image</button></a> :
                    <a href={props.metadata.url}target='_blank' ><button>View Full Image</button></a>}
                <div>
                    <span>DATE: {props.metadata.date}</span>
                    <span>API VERSION: {props.metadata.service_version}</span>
                    {props.metadata.copyright ? <span>COPYRIGHT: {props.metadata.copyright}</span> : <></>}
                    <span>IMAGE URL: {props.metadata.url}</span>
                    {props.metadata.hdurl ? <span>HD IMAGE URL: {props.metadata.hdurl}</span> : <></>}
                </div>
            </div>
        </div>
    </div>);
}
