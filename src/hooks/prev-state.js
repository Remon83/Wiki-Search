import {useEffect, useRef} from "react";

const PrevState = (term) => {
    const prevTerRef = useRef("");

    useEffect(() => {
        prevTerRef.current = term;
    })
    return prevTerRef.current;
}

export default PrevState;


