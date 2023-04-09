import axios from "axios"

const useFetchMovies = (
    setMovieLoading, 
    setSearchedMovies, 
    setHasMorePage, 
    movies,
    setMovies,
    searchedMovies, 
    page,
    debounceTerms
    ) => {

        const movieAPI = 'https://www.omdbapi.com/?apikey=14b23888&'


    const fetchData = async () => {
        setMovieLoading(true)
        try {
            // if there is query - execute this query
            if (debounceTerms) {
                const res = await axios.get(`${movieAPI}&s=${debounceTerms}&page=${page}`)
                const { Search, Response } = await res.data
                setSearchedMovies(Search)

                // if response is false - set morepage to false
                // so no more page update while scrolling
                if (Response === 'False') {
                    setHasMorePage(false)
                    setMovies([...searchedMovies, ...Search])
                } else if (Response === 'True') {
                    setMovies([...searchedMovies, ...Search])
                }
            } else {
                // if no query - execute this as default
                const res = await axios.get(`${movieAPI}&s=matrix&page=${page}`)
                const { Search, Response } = await res.data

                if (Response === 'False') {
                    setHasMorePage(false)
                    setMovies([...movies, ...Search])
                } else if (Response === 'True') {
                    setMovies([...movies, ...Search])
                }
            }
            setMovieLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

  return fetchData
}

export default useFetchMovies