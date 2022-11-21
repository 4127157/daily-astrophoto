import { createSignal, Match, Switch } from 'solid-js';
import { Show } from 'solid-js';
import ExpandMoreIcon from '@suid/icons-material/ExpandMore';
import ExpandLessIcon from '@suid/icons-material/ExpandLess';

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
    return (
    <div class={styles.info}>
        <div class={styles.infoClickable} onClick={() =>{
                setToggle(!toggle());
            }}>
            <h2 class={styles.infoHeader}>{props.metadata.title}</h2>
            <span>MORE INFO</span>
            <Switch>
                <Match when={toggle() === true}>
                    <ExpandLessIcon/>
                </Match>
                <Match when={toggle() === false}>
                    <ExpandMoreIcon/>
                </Match>
            </Switch>
            
        </div>
        <Show when={toggle() === true}>
        <div class={styles.infoExpand}>
            <p>{props.metadata.explanation}</p>
            {props.metadata.hdurl ? 
                <a href={props.metadata.hdurl} target='_blank'><button>View Full Image</button></a> :
                <a href={props.metadata.url}target='_blank' ><button>View Full Image</button></a>}
            <div>
                <span>DATE: {props.metadata.date}</span>
                <span>API VERSION: {props.metadata.service_version}</span>
                <span>IMAGE URL: {props.metadata.url}</span>
                {props.metadata.hdurl ? <span>HD IMAGE URL: {props.metadata.hdurl}</span> : <></>}
                {props.metadata.copyright ? <span>COPYRIGHT: {props.metadata.copyright}</span> : <></>}
            </div>
        </div>
        </Show>
    </div>);
}
