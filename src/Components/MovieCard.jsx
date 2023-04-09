
import { useStateContext } from "../context/ContextProvider"
import axios from 'axios'

const MovieCard = ({ data }) => {

  const movieAPI = process.env.REACT_APP_MOVIE_API

  const {  setShowModal, setMovieInfo, setMovieInfoLoading } = useStateContext()

  const viewMovieInfo = async (id) => {
    setShowModal(true)
    setMovieInfoLoading(true)
    try {
        const res = await axios.get(`${movieAPI}&i=${id}`)
        setMovieInfoLoading(false)
        setMovieInfo(res.data)
    } catch (error) {
        console.log(error)
        setMovieInfoLoading(false)
    }
}

  return (
    <div>
      <div
        onClick={() => viewMovieInfo(data.imdbID)}
        className="bg-gray-100 cursor-pointer rounded-md h-[12rem] sm:h-[18rem] w-[10rem] sm:w-[16rem] text-black overflow-hidden"
      >
        <img src={data.Poster} alt={data.Title} className="object-fill" />
      </div>
      <p className="my-1 text-sm">{data.Title}</p>
    </div>
  )
}

export default MovieCard