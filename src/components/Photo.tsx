interface PhotoProps {
    url: string | undefined,
}

export function Photo(props: PhotoProps){
    let sourceURL = props.url;
    return <img src={sourceURL}/>;
}
