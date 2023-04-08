import React from 'react'

const Modal = ({onClose}) => {
  return (
   <div className='bg-[#00000064] flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-40'>
     <div className='bg-gray-100 p-2 rounded-sm w-[20rem] z-50'>
        <h1>im modal</h1>
        <button onClick={onClose}>close</button>
    </div>
   </div>
  )
}

export default Modal