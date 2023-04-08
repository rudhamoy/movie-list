import React from 'react'

const Modal = ({onClose, movieInfo, loading}) => {
  if(loading === true) return <p className='text-white'>loading..</p>
  return (
   <div className='bg-[#00000064] flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-40'>
     <div className='bg-gray-100 p-2 rounded-sm w-[20rem] z-50'>
        <img src={movieInfo.Poster} alt={movieInfo.Title} />
        <div>
          <p>{movieInfo.Title}</p>
          <p>Genre: {movieInfo.Genre}</p>
          <p>Director: {movieInfo.Director}</p>
          <p>Year of Release: {movieInfo.Released}</p>
        </div>
        <button onClick={onClose}>close</button>
    </div>
   </div>
  )
}

export default Modal