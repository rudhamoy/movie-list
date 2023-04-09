import { RiMovie2Line } from 'react-icons/ri'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import MovieList from './Components/MovieList'


function Homepage() {
    return (
        <div className='realtive'>
            <div className='p-5 flex place-items-center'>
                <RiMovie2Line className='text-gray-100 text-2xl' />
                <p className='text-2xl font-semibold'>MDB</p>
            </div>
            <div className='mx-[5%] sm:mx-[10%]'>
                <MovieList
                />
            </div>
            {/* button to scroll on top of the page */}
            <button 
            className='fixed bottom-10 right-7 sm:right-14 text-white text-4xl'
            onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            >
                <BsFillArrowUpCircleFill />
            </button>
        </div>
    )
}

export default Homepage