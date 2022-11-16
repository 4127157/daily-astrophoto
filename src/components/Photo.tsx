import styles from '../App.module.css';
interface PhotoProps {
    url: string | undefined,
}

export function Photo(props: PhotoProps){
    let sourceURL = props.url;
    return <img class={styles.mainImg} src={sourceURL}/>;
}
