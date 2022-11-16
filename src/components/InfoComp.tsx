import styles from '../App.module.css';
type AnyObj =  {
    [key: string]: any,
}

interface InfoProps {
    metadata: AnyObj,
}

export function InfoComp(props: InfoProps) {
    let title = props.metadata.title;
    return (<div class={styles.info}>
        <h2>{props.metadata.title}</h2>
        <span>MORE INFO</span>
        <span>^</span>
    </div>);
}
