
const MovieCard = ({ onClick, data }) => {

  return (
    <div>
      <div
        onClick={onClick}
        className="bg-gray-100 cursor-pointer rounded-md h-[18rem] w-[16rem] text-black overflow-hidden"
      >
        <img src={data.Poster} alt={data.Title} className="object-fill" />
      </div>
      <p className="my-1">{data.Title}</p>
    </div>
  )
}

export default MovieCard