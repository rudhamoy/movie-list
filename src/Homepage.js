import { useState } from 'react'
import MovieList from './Components/MovieList'


function Homepage() {
        return (
        <div>
           
            <div className='mx-[10%]'>
                <MovieList 
                />
            </div>
        </div>
    )
}

export default Homepage