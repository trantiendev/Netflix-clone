import { useRef } from 'react';
import { Movie } from '../../typings';
import MovieListHandler from './MovieListHandler';
import MovieThumbnail from './MovieThumbnail';

interface Props {
  title: string;
  movies: Movie[];
}

const MovieScrollList = ({ title, movies }: Props) => {
  const moviesRef = useRef<HTMLDivElement | null>(null);
  console.log(movies)
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group/control relative md:-ml-2">
        <MovieListHandler moviesRef={moviesRef} movies={movies} />

        <div
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={moviesRef}
        >
          {movies.map((movie) => (
            <MovieThumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieScrollList;
