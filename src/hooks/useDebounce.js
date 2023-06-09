import { useState, useEffect } from 'react'

export const useDebounce = (value, timeDelay) => {
    const [debounceValue, setDebounceValue] = useState();

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, timeDelay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, timeDelay])


    return debounceValue;
}