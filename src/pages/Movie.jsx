import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
  //env를 사용하기 위해 만듦.
  const APIKEY = process.env.REACT_APP_API_KEY;

  const {id} = useParams();
  const [isLoading, setLoading] = useState(true);
  const [m, setM] = useState(null);

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ko`)
    .then(res=>{
      console.log(res)
      setM(res.data);
      setLoading(false);
    })
  },[id]);

  //상영작 상세페이지
  return (
    <div>
      {
        isLoading ? (<div className="loding" >로딩중...</div>) : (
          <div className='movie'>
            <div className="movieBox">
              <img src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`} alt="영화포스터" />
            </div>
            <div className="textBox">
              <div className="textBoxTitle">{m.title}</div> {/* 제목 */}
              <div className="textBoxOriginalTitle">{m.original_title}</div> {/* 영어 제목 */}
              <div className="textBoxOverview">{m.overview}</div> {/* 설명글 */}
              <div className="textBoxGenres">
                {m.genres.map(genre=> (<span key={genre.id}>{genre.name}</span>))} {/* 장르 */}
              </div>
              <div className="textBoxDate">{m.release_date}</div> {/* 개봉일 */}
              <div className="textBoxAverage">⭐ {m.vote_average}</div> {/* 평점 */}

            </div>
          </div>
        )
      }
    </div>
  );
};

export default Movie;