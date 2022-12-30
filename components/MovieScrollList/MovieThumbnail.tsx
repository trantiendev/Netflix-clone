import Image from 'next/legacy/image'
import { Movie } from '../../typings'

interface MovieProps {
  movie: Movie
}

const MovieThumbnail = ({movie}: MovieProps) => {
  return (
    <div
      className={`relative h-28 min-w-[180px] group/movie cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt='movie thumbnail'
      />
      <div className='font-bold absolute bottom-0 left-0 right-0 transition bg-neutral-900/[.7] p-[2px] opacity-0 group-hover/movie:opacity-100'>
        <p>{movie.title || movie.name}</p>
      </div>
    </div>
  )
}

export default MovieThumbnail
