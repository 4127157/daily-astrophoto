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
            duration:1500,
            easing: 'easeInOutQuad',
            });

        animation.play;
    }

    function playInfoExpandAnim(elem: HTMLDivElement){
    
        let infoExpandAnimation = anime({
            targets: elem,
            opacity: 1,
            duration: 500,
            easing: 'easeInOutSine'
        });

        infoExpandAnimation.play;
    }
   /*TODO: 
    * Due to either SolidJS design or lack of documentation,
    * the animation will have to be hacked together where when the duration for
    * the material button animation is over, a timeout function activates the
    * animejs animation for translateY on infoDiv which then sets a signal true
    * that allows Show for infoExpand to be true and put it in the DOM, after
    * that happens, the element fades into view. 
    * So,
    * material button changes -> animejs translateY for info -> info translate
    * gives a callback -> callback sets show condition true -> populates
    * element in DOM with 0 opacity -> animejs animation to fade in opacity for
    * infoExpandDiv
    * */

    return (
    <div class={styles.info} ref={infoDiv} >
        <div class={styles.infoClickable} onClick={() =>{
                playAnim(toggle());
                setToggle(!toggle());
            }}>
            <h2 class={styles.infoHeader}>{props.metadata.title}</h2>
            <span>MORE INFO</span>
            <Switch>
                <Match when={toggle() === true}>
                    <ExpandMoreIcon sx={{ fontSize: 40 }} style={ 'display: block; margin:auto;'}  class={styles.infoMaterialExpand}/>
                </Match>
                <Match when={toggle() === false}>
                    <ExpandLessIcon sx={{ fontSize: 40 }} style={ 'display: block; margin:auto;'} class={styles.infoMaterialExpand}/>
                </Match>
            </Switch>
            
        </div>
        <div class={styles.infoExpand} ref={el => { playInfoExpandAnim(el); setInfoExpandDiv(el);}} >
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
    </div>);
}
