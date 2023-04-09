import { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const ContextProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false)
    const [movieInfo, setMovieInfo] = useState({})
    const [movieInfoLoading, setMovieInfoLoading] = useState(false)

    return (
        <StateContext.Provider value={{
            showModal, setShowModal,
            movieInfoLoading, setMovieInfoLoading,
            movieInfo, setMovieInfo,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)