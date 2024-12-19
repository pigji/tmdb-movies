import React, {useState} from "react";
import ListMovie from "../components/ListMovie";
import MovieForm from "../components/MovieForm";

const Movies = () => {

  //등록 후 출력할 영화 배열을 저장
  const [movies, setMovies] = useState([]);

  //등록한 영화의 ID와 삭제할 영화의 ID가 같을 경우 삭제
  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => {
      return movie.id !== id
    }))
  }

  const addMovie = (movie) => {
    setMovies([
      ...movies,
      movie
    ])
  }

  return (
    <div className="movies">
      <h1>Movie List</h1>
      <MovieForm addMovie = {addMovie} />
      {
        movies.map((item, i) => {
          return(
            <ListMovie item={item} key={i} removeMovie={removeMovie} />
          )
        })
      }
    </div>
  );
};

export default Movies;
