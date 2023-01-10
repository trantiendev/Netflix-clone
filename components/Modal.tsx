import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import ReactPlayer from 'react-player/lazy';
import { FaPlay } from 'react-icons/fa';
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Element, Genre, Movie } from '../typings';
import MuiModal from '@mui/material/Modal';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import useAuth from '../contexts/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { getMovieData } from '../constants/movie';
import Image from 'next/legacy/image';

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
};

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [muted, setMuted] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailer, setTrailer] = useState('');
  const [addedToList, setAddedToList] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(false);

  useEffect(() => {
    if (!movie) return;

    setLoadingPlayer(true);

    async function fetchMovie() {
      const movieData = await getMovieData(movie).finally(() =>
        setLoadingPlayer(false)
      );

      if (movieData.videos) {
        const indexTrailer = movieData.videos.results?.findIndex(
          (item: Element) => item.type === 'Trailer'
        );
        setTrailer(movieData.videos.results[indexTrailer]?.key);
      }

      if (movieData.genres) setGenres(movieData.genres);
    }

    fetchMovie();
  }, [movie]);

  const handleCloseModal = () => {
    setShowModal(false);
    setMovie(null);
    toast.dismiss();
  };

  const handleList = () => {};

  return (
    <MuiModal
      open={showModal}
      onClose={handleCloseModal}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleCloseModal}
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">

          {loadingPlayer ? (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/[.7]">
              <CircularProgress
                size={100}
                color="inherit"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              />
            </div>
          ) : !trailer ? (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/[.7]">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl">
                This Is A Private Video :(
              </p>
            </div>
          ) : (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing
              muted={muted}
            />
          )}

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-6 w-6" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
