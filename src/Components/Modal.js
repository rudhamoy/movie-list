import React from 'react'

const Modal = ({ onClose, movieInfo, loading }) => {
  if (loading === true) return <p className='text-white'>loading..</p>
  return (
    <div className='bg-[#00000090] flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-40'>
      <div className='bg-gray-100 p-2 rounded-md w-[40rem] z-50 flex gap-x-5 relative'>
        <div className='h-[24rem] w-[16rem] overflow-hidden rounded-md'>
          <img src={movieInfo.Poster} alt={movieInfo.Title} className='rounded-md ' />
        </div>
        <div className='text-sm text-gray-700 w-[17rem]'>
          <p className='font-semibold my-2 text-lg'>{movieInfo.Title}</p>
          <p><span className='font-semibold'>Genre:</span> {movieInfo.Genre}</p>
          <p><span className='font-semibold'>Runtime:</span> {movieInfo.Runtime}</p>
          <p><span className='font-semibold'>IMDB Ratings:</span> {movieInfo.imdbRating}</p>
          <p><span className='font-semibold'>Director:</span> {movieInfo.Director}</p>
          <p><span className='font-semibold'>Year of Release:</span> {movieInfo.Released}</p>
          <p><span className='font-semibold'>Plot:</span> {movieInfo.Plot}</p>
        </div>
        <button onClick={onClose} className='absolute bottom-2 right-2 bg-red-400 p-1 px-2 rounded-sm text-xs'>close</button>
      </div>
    </div>
  )
}

export default Modal