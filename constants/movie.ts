import { DocumentData } from "firebase/firestore";
import { Movie } from "../typings";

export const baseUrl = 'https://image.tmdb.org/t/p/original/';

export const getMovieData = async (movie: Movie | DocumentData | null) => {
  return (
    await fetch(
      `https://api.themoviedb.org/3/${
        movie?.media_type === 'tv' ? 'tv' : 'movie'
      }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    )
  ).json();
};
