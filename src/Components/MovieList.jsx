import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import MovieCard from './MovieCard'
import Modal from './Modal'
import { useDebounce } from '../hooks/useDebounce'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SkletonLoader from './SkletonLoader'
import { useStateContext } from '../context/ContextProvider'
import useFetchMovies from '../hooks/useFetchMovies'

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [movieLoading, setMovieLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [hasMorePage, setHasMorePage] = useState(true)
    const [error, setError] = useState()

    const { showModal, setShowModal } = useStateContext()

    // custom hooks - useDebounce hooks for delay request to api when query type
    const debounceTerms = useDebounce(searchTerm, 700)

    // custom hooks to close modal when click outside of box or background
    const ref = useOutsideClick(() => setShowModal(false))

    // custom hooks to fetch data
    // fetch data when search query
    // when page number change
    const fetchData = useFetchMovies(
        setMovieLoading, 
        setHasMorePage, 
        movies,
        setMovies,
        page,
        debounceTerms,
        setError
        )
 
      
      useEffect(() => {
        fetchData();
      }, [fetchData]);


    // infinit scroll
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;
        // increment the page number when scrollTop and innerHeigt > scrollHeight
        // and increment Page number when hasMorePage === true
        if (scrollTop + clientHeight + 1 > scrollHeight && hasMorePage) {
            setPage(prevPage => prevPage + 1);
          }
    }

    // Add event listener when page reaches at the bottom of the page
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        // clean up 
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // onChange handler for search input
    const onChangeHandler = (e) => {
        setError('')
        setSearchTerm(e.target.value)

        // set page to one when search query type
        // else the search results will show at current page number
        setPage(1)
        setTimeout(() => {
            setMovies([])
          }, 550);
       
    }

    // to show skeleton loading effect
    // show 10 container on every loading
    let totalLoadingEffect = []
    for(let i = 0; i < 10; i++) {
        totalLoadingEffect.push(i)
    }

    return (
        <>
            {/* Search input */}
            <div className='flex justify-center my-10'>
                <input type="text"
                    className='border outline-none p-2 w-[30rem] sm:w-[25rem] bg-gray-100 text-gray-700 rounded-md'
                    placeholder='Search movie by title'
                    value={searchTerm}
                    onChange={onChangeHandler}
                />
            </div>

             {/* error message */}
             {error && (
                <div>
                    <p>{error}</p>
                </div>
            )}

            {/* list of movies */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 gap-y-8 my-10'>
                {/* list of movies */}
                {movies?.map(item => (
                    <MovieCard 
                    key={item.imdbID} 
                    data={item} 
                    />
                ))}

                {/* show skeleton loader when movies data is fetching */}
                {movieLoading && totalLoadingEffect.map(loader => 
                    <SkletonLoader key={loader} />
                )}
            </div>

            {/* show this modal when click on movie card */}
            {showModal && createPortal(
                <Modal
                refs={ref}
                />,
                document.body
            )}

        </>

    )
}

export default MovieList