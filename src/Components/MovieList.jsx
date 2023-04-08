import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import MovieCard from './MovieCard'
import Modal from './Modal'

const MovieList = () => {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([])
   

    const fetchData = async () => {
        const res = await fetch(`https://www.omdbapi.com/?s=matrix&apikey=14b23888&type=movie&page=3`)
        const resData = await res.json()
        console.log(resData.Search)
        setData(resData.Search)
    }

    useEffect(() => {
        fetchData()
    }, [])

    

    


    return (
        <>
            <div className='flex justify-center my-5'>
                <input type="text"
                    className='border outline-none p-2 w-[25rem] bg-gray-100 text-gray-700 rounded-md'
                    placeholder='search here'
                />
                
            </div>
            <div className='grid grid-cols-4 gap-4 my-4'>
                {data.map(item => (
                    <MovieCard key={item.imdbID} data={item} onClick={() => setShowModal(true)} />
                ))}
               
            </div>
            {showModal && createPortal(
                <Modal onClose={() => setShowModal(false)} />,
                document.body
            )}

        </>

    )
}

export default MovieList