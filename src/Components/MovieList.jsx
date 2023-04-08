import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'

import MovieCard from './MovieCard'
import Modal from './Modal'
import { useDebounce } from '../hooks/useDebounce'

const MovieList = () => {
    const [showModal, setShowModal] = useState(false)
    const [movies, setMovies] = useState([])
    const [searchedMovies, setSearchedMovies] = useState([])
    const [movieInfo, setMovieInfo] = useState({})
    const [movieLoading, setMovieLoading] = useState(false)
    const [movieInfoLoading, setMovieInfoLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [hasMorePage, setHasMorePage] = useState(true)

    // custom hooks - useDebounce hooks for delay request to api when query type
    let debounceTerms = useDebounce(searchTerm, 500)

    const movieAPI = 'https://www.omdbapi.com/?apikey=14b23888&'

    const fetchData = async () => {
        setMovieLoading(true)
        try {
            if (debounceTerms) {
                const res = await axios.get(`${movieAPI}&s=${debounceTerms}&page=${page}`)
                const { Search, Response } = await res.data
                setSearchedMovies(Search)
                if (Response === 'False') {
                    setMovieLoading(false)
                    setHasMorePage(false)
                    setMovies([...searchedMovies, ...Search])
                } else if (Response === 'True') {
                    setMovieLoading(false)
                    setMovies([...searchedMovies, ...Search])
                }
            } else {
                const res = await axios.get(`${movieAPI}&s=matrix&page=${page}`)
                const { Search, Response } = await res.data
                if (Response === 'False') {
                    setMovieLoading(false)
                    setHasMorePage(false)
                    setMovies([...movies, ...Search])
                } else if (Response === 'True') {
                    setMovieLoading(false)
                    setMovies([...movies, ...Search])
                }
                setMovieLoading(false)
                setMovies([...movies, ...Search])
                // setMovies(Search)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [debounceTerms, page])

    // Modal
    // view movie info when click on the card
    const viewMovieInfo = async (id) => {
        setShowModal(true)
        setMovieInfoLoading(true)
        try {
            const res = await axios.get(`${movieAPI}&i=${id}`)
            setMovieInfo(res.data)
        } catch (error) {
            console.log(error)
        }
        setMovieInfoLoading(false)
    }

    const closeModal = () => {
        setShowModal(false)
        setMovieInfo({})
    }

    // infinit scroll
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;
        if (scrollTop + clientHeight + 1 >= scrollHeight && hasMorePage) {
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
        setSearchTerm(e.target.value)
        setPage(1)
    }

    return (
        <>
            <div className='flex justify-center my-5'>
                <input type="text"
                    className='border outline-none p-2 w-[25rem] bg-gray-100 text-gray-700 rounded-md'
                    placeholder='Search movie by title'
                    value={searchTerm}
                    onChange={onChangeHandler }
                />

            </div>
            <div className='grid grid-cols-4 gap-5 my-4'>
                {/* list of movies */}
                {movies?.map(item => (
                    <MovieCard key={item.imdbID} data={item} onClick={() => viewMovieInfo(item.imdbID)} />
                ))}

                {/* button to scroll on top of the page */}
                <button onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>
                    TOP
                </button>
                {movieLoading && (
                    <p>LOADING...</p>
                )}
            </div>
            {/* show this modal when click on movie card */}
            {showModal && createPortal(
                <Modal onClose={closeModal} movieInfo={movieInfo} loading={movieInfoLoading}></Modal>,
                document.body
            )}

        </>

    )
}

export default MovieList