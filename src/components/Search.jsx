import React, { useState } from 'react';  //useState : 상태를 관리하는 훅
import { LuSearch } from "react-icons/lu";  //리액트 아이콘
import axios from 'axios';  //비동기식 데이터 불러오기
import { Link } from 'react-router-dom';  //링크태그(하이퍼링크)
import SearchDetail from '../pages/SearchDetail';


const Search = () => {
  //env를 사용하기 위해 만듦.
  const APIKEY = process.env.REACT_APP_API_KEY;

  //js코드 작성
  const imgPath = 'http://image.tmdb.org/t/p/original'; //TMDB 이미지 경로

  //배열 안에 들어있는 첫번째 초기값을 받아오는 변수, 두번째 변수는 변경되는 변수값
  //사용자가 검색창에 입력한 영화제목을 저장하는 상태
  const [searchWord, setSearchWord] = useState('');

  //검색어에 맞는 영화 목록을 저장
  const [movies, setMovies] = useState([]);
  //화면관리 list일 경우 , detail일 경우 상세정보
  const [mode, setMode] = useState('list');
  
  
  //사용자가 선택한 영화의 ID값을 저장
  const [selecteMovieID, SetSelecteMovieID] = useState(null);



  //입력처리와 영화를 검색하기 위한 함수
  const search = () => {
    //기본문법 : axios.get().then(() => {}).catch(() => {})
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=ko&page=1&include_adult=false&query=${searchWord}`) //요청하는 경로(주소)
    .then((response) =>{  //요청한 값이 반환되었을때(성공했을때)
      console.log(response.data.results) //검색한 영화데이터 출력
      setMovies(response.data.results)
    })
    .catch((error) => { //에러가 났을때
      console.error('Error fetching movies : ', error)
    })
  }
  
  //검색어 입력 후 Enter키 누르면 출력
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      search()
    }
  }
  //
  const showDetail = (movieID) => {
    setMode('detail');
    SetSelecteMovieID(movieID);

    // setDetailInfo({});
    // axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`)
    // .then((response) => {
    //   //console.log(response);  //데이터 확인
    //   setDetailInfo(response.data);

    // })
    // .catch((error) => {
    //   //console.error('Error fetching movie details : ', error); //에러 출력
    // })
    
    // axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`)
    // .then((response) => {
    //   console.log(response);  //데이터 확인
    //   setActors(response.data.cast)
    // })
    // .catch((error) => {
    //   console.error('Error fetching movie details : ', error); //에러 출력
    // })
  }
  


  return (
    <div className='search'>
      <div className="search-box">
        <input 
          type="text" 
          placeholder='제목을 입력해주세요.'
          value={searchWord}
          onChange={(e) => {setSearchWord(e.target.value)}}
          onKeyPress={handleKeyPress}
        />
        <button className='search-btn' onClick={search}><LuSearch /></button>
      </div>
      <div className="search-result" style={{display:mode === 'list' ? 'block' : 'none'}}>
        <ul className="search-movieList">
          {
            movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/search/${movie.id}`} onClick={() => {showDetail(movie.id)}}>
                  <div className="search-list">
                    <div className="img">
                      <img src={`${imgPath}${movie.poster_path}`} alt="{movie.title}" />
                    </div>
                    <div className="info">
                      <p className='title'>{movie.title}</p>
                      <p className='release'>{movie.release_date}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      {mode === 'detail' && <SearchDetail selecteMovieID/>}
    </div>
  );
};

export default Search;