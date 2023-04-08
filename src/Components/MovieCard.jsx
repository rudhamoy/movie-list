
const MovieCard = ({onClick, data}) => {
 
  return (
    <div onClick={onClick} className="bg-gray-100 rounded-md shadow-md shadow-slate-500 p-2 h-[18rem] w-[16rem] text-black">
      <p>{data.Title}</p>
    </div>
  )
}

export default MovieCard