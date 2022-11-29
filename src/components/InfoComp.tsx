import { createEffect, createSignal, Match, onMount, Switch } from 'solid-js';
import { Show } from 'solid-js';
import { useWindowSize } from '@solid-primitives/resize-observer';
import ExpandMoreIcon from '@suid/icons-material/ExpandMore';
import ExpandLessIcon from '@suid/icons-material/ExpandLess';
import anime from 'animejs/lib/anime.es.js';

import styles from '../App.module.css';
import { Yard } from '@suid/icons-material';
type AnyObj =  {
    [key: string]: any,
}

interface InfoProps {
    metadata: AnyObj,
}

const size = useWindowSize();

export function InfoComp(props: InfoProps) {
    const [toggle, setToggle] = createSignal(false);
    const [animComplete, setAnimComplete] = createSignal(false, {equals: false});
    let infoDiv!: HTMLDivElement; 
    let infoExpandDiv!: HTMLDivElement;
    let infoExpandChildDiv!: HTMLDivElement;
    let toAnimate!: boolean;
    let toAnimateSecondary!: boolean;
    let expandElemHeight!: number;

    let processMainAnim = (close: boolean) => {
        if(toAnimate){
            playAnim(close);
        }
        toAnimate = true; //Quick hacky solution to not trigger animation for the first render
        function playAnim(close: boolean) {
            let animation = anime({
                targets: infoDiv,
                translateY: () => {
                    if(close) {
                        return '-250px';
                    } else {
                        return '0';
                    }
                },
                duration:500,
                easing: 'easeInOutCirc',
                });

            animation.finished.then(() => setAnimComplete(!animComplete()));
        }
    }

    let processSecondaryAnim = (bool: boolean) => {

        if(toAnimateSecondary && bool){
            expandElemHeight = infoExpandChildDiv.offsetHeight;
            if(infoExpandDiv.style.opacity != '1'){
                infoExpandDiv.style.height = '0';
                infoExpandDiv.style.opacity = '1';
            }

            let animation = anime.timeline({
                duration: 300,
            });

            animation.add({
                targets: infoExpandDiv,
                height: () => {
                    if(toggle()) {
                        return expandElemHeight;
                    } /*else {
                        return 0;
                    }*/
                },
                opacity: () => {
                    if(!toggle()){
                        return 0;
                    }
                },
                easing: 'easeInOutCirc',
            });

            animation.add({
                targets: infoExpandChildDiv,
                opacity: () => {
                    if(toggle()) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
                easing: 'easeInSine',
            }, '-=200');

            animation.play;
        }

        toAnimateSecondary = true;
    }

    let setForceElemHeight = (width: number, height: number) => {
        if(infoExpandDiv && infoExpandChildDiv){
            anime({
                targets: infoExpandDiv,
                height: infoExpandChildDiv.offsetHeight,
                duration: 10,
            });
        }
    }
    
    createEffect( () => processMainAnim(toggle()));
    createEffect( () => processSecondaryAnim(animComplete()));
    createEffect( () => setForceElemHeight(size.width, size.height));

    return (
    <div class={styles.info} ref={infoDiv} >
        <div class={styles.infoClickable} onClick={() =>{
                setToggle(!toggle());
            }}>
            <h2 class={styles.infoHeader}>{props.metadata.title}</h2>
            <span class={styles.moreInfoSpan}>MORE INFO</span>
            <Switch>
                <Match when={animComplete() === true}>
                    <ExpandMoreIcon sx={{ fontSize: 40 }} style={ 'display: block; margin:auto;'}  class={styles.infoMaterialExpand}/>
                </Match>
                <Match when={animComplete() === false}>
                    <ExpandLessIcon sx={{ fontSize: 40 }} style={ 'display: block; margin:auto;'} class={styles.infoMaterialExpand}/>
                </Match>
            </Switch>
        </div>
        <div class={styles.infoExpand} ref={infoExpandDiv}>
            <div class={styles.infoExpandChild} ref={infoExpandChildDiv}>
                <p class={styles.infoExplanation}>{props.metadata.explanation}</p>
                {props.metadata.hdurl ? 
                    <a href={props.metadata.hdurl} target='_blank'><button class={styles.fullImgBtn}>View Full Image</button></a> :
                    <a href={props.metadata.url}target='_blank' ><button class={styles.fullImgBtn}>View Full Image</button></a>}
                <div class={styles.metaInfoDiv}>
                    <span>DATE: {props.metadata.date}</span>
                    <span>API VERSION: {props.metadata.service_version}</span>
                    {props.metadata.copyright ? <span>COPYRIGHT: {props.metadata.copyright}</span> : <></>}
                    <span>IMAGE URL: <a href={props.metadata.url} target='_blank'>link</a></span>
                    {props.metadata.hdurl ? <span>HD IMAGE URL: <a href={props.metadata.hdurl} target='_blank'>link</a></span> : <></>}
                </div>
            </div>
        </div>
    </div>);
}
