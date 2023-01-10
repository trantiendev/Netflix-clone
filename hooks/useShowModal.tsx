import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../typings';

const useShowModal = (movie: Movie | null) => {
  const setCurrentMovie = useSetRecoilState(movieState);
  const setShowModal = useSetRecoilState(modalState);

  const handleShowModal = useCallback(() => {
    setCurrentMovie(movie);
    setShowModal(true);
  }, [movie]);

  return handleShowModal;
}

export default useShowModal
