interface PhotoProps {
    url: string | undefined,
    class: string,
}

export function Photo(props: PhotoProps){
    let sourceURL = props.url;
    return <img class={props.class} src={sourceURL}/>;
}
