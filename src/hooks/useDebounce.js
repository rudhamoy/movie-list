import { useState, useEffect } from 'react'

export const useDebounce = (value, timeDelay, setPage) => {
    const [debounceValue, setDebounceValue] = useState(value);

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