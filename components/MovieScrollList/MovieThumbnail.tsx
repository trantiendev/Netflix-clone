import Image from 'next/legacy/image';
import { useSetRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/modalAtom';
import useShowModal from '../../hooks/useShowModal';
import { Movie } from '../../typings';

interface MovieProps {
  movie: Movie;
}

const MovieThumbnail = ({ movie }: MovieProps) => {
  const handleShowModal = useShowModal(movie);

  return (
    <div
      onClick={handleShowModal}
      className={`group/movie relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt="movie thumbnail"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/[.7] p-[2px] font-bold opacity-0 transition group-hover/movie:opacity-100">
        <p>{movie.title || movie.name}</p>
      </div>
    </div>
  );
};

export default MovieThumbnail;
