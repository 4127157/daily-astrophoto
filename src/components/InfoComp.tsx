import { createSignal } from 'solid-js';
import { Show } from 'solid-js';

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
    const [clicked, setClicked] = createSignal(false);
    return (
    <div class={styles.info}>
        <div class={styles.infoClickable} onClick={() => setClicked(true)}>
            <h2 class={styles.infoHeader}>{props.metadata.title}</h2>
            <span>MORE INFO</span>
            <span>^</span>
        </div>
        <Show when={clicked() === true}>
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
