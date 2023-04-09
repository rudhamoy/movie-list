import axios from "axios"
import { useCallback } from "react";

const useFetchMovies = (
    setMovieLoading,
    setHasMorePage,
    movies,
    setMovies,
    page,
    debounceTerms,
    setError
) => {

    const movieAPI = process.env.REACT_APP_MOVIE_API


    const fetchData = useCallback(async () => {
        setMovieLoading(true);
        try {
            const apiQuery = debounceTerms ? `&s=${debounceTerms}` : '&s=wolf';
            const res = await axios.get(`${movieAPI}${apiQuery}&page=${page}`);
            const { data } = res;

            if (data.Response === 'True') {
                setMovies([...movies, ...data.Search]);
                setHasMorePage(true);
            } else if (data.Response === 'False') {
                setHasMorePage(false);
                setError(data?.Error)
            }
        } catch (error) {
            console.log(error);
            setError(error.Error)
        } finally {
            setMovieLoading(false);
        }
    }, [debounceTerms, page]);

    return fetchData
}

export default useFetchMovies