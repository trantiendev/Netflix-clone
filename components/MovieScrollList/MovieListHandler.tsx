import React, { MutableRefObject, useCallback, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Movie } from '../../typings';

interface HandlerProps {
  movies: Movie[];
  moviesRef: MutableRefObject<HTMLDivElement | null>;
}

const MovieListHandler = ({ moviesRef, movies }: HandlerProps) => {
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = useCallback(
    (direction: string) => {
      !isMoved && setIsMoved(true);
      if (!moviesRef.current) return;

      const { scrollLeft, clientWidth } = moviesRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : clientWidth + scrollLeft;

      moviesRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    },
    [movies]
  );

  return (
    <>
      <ChevronLeftIcon
        className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-10 w-10 cursor-pointer rounded-full bg-red-500 opacity-0 transition hover:scale-125 group-hover/control:opacity-100 ${
          !isMoved && 'hidden'
        }`}
        onClick={() => handleClick('left')}
      />
      
      <ChevronRightIcon
        className="absolute top-0 bottom-0 right-2 z-40 m-auto h-10 w-10 cursor-pointer rounded-full bg-red-500 opacity-0 transition hover:scale-125 group-hover/control:opacity-100"
        onClick={() => handleClick('right')}
      />
    </>
  );
};

export default MovieListHandler;
