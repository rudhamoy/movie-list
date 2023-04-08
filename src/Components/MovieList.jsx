import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import MovieCard from './MovieCard'
import Modal from './Modal'

const MovieList = () => {
    const [showModal, setShowModal] = useState(false)
    const [movies, setMovies] = useState([])
    const [movieInfo, setMovieInfo] = useState({})
    const [movieLoading, setMovieLoading] = useState(false)
    const [movieInfoLoading, setMovieInfoLoading] = useState(false)
    const [page, setPage] = useState(1)

    const fetchData = async () => {
        setMovieLoading(true)
        const res = await fetch(`https://www.omdbapi.com/?s=matrix&apikey=14b23888&type=movie&page=${page}`)
        const resData = await res.json()
        setMovies([...movies, ...resData.Search])
        setMovieLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [page])

    // Modal
    // view movie info when click on the card
    const viewMovieInfo = async(id) => {
        setShowModal(true)
        setMovieInfoLoading(true)
        try {
            const res = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=14b23888`)
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
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])




    return (
        <>
            <div className='flex justify-center my-5'>
                <input type="text"
                    className='border outline-none p-2 w-[25rem] bg-gray-100 text-gray-700 rounded-md'
                    placeholder='search here'
                />

            </div>
            <div className='grid grid-cols-4 gap-5 my-4'>
                {/* list of movies */}
                {movies.map(item => (
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