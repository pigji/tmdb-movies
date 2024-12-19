import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MainUpComing = () => {
	//env를 사용하기 위해 만듦.
  const APIKEY = process.env.REACT_APP_API_KEY;

	const [upComingMovies, setUpComingMoves]=useState([]);
	const [isLoading, setLoading]=useState(true);

	const getMovies= async () => {
		try{
			const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=ko`);
			setUpComingMoves(response.data.results)
			/* console.log(response) */
			setLoading(false)

		}catch(err){
			console.error('Error:',err);
			setLoading(false)
		}
	}
	useEffect(()=>{
		getMovies();
	}, [])

	const getRandomMovie=()=>{
		const randomIndex=Math.floor(Math.random()*upComingMovies.length);
		return upComingMovies[randomIndex]
	}
	const randomMovie=getRandomMovie();
	return (
		<div className='upComing'>
			{
				isLoading?(<div className='loding'>로딩중..</div>):(
					<div className="upMovie">
						<div className="upComingImg">
							<img src={`https://image.tmdb.org/t/p/w500/${randomMovie.backdrop_path}`} alt={randomMovie.title} />
						</div>
						<div className="upComingInfo">
							<div className="upInfoImg">
								<img src={`https://image.tmdb.org/t/p/w300/${randomMovie.poster_path}`} alt={randomMovie.title} />
							</div>
							<div className="upInfoText">
								<p className="title">제목 : {randomMovie.title}</p>
								<p className="overview">설명 :{randomMovie.overview}</p>
								<p className="date">날짜 : {randomMovie.release_date}</p>
							</div>
						</div>
					</div>
					
				)
			}
			
		</div>
	);
};

export default MainUpComing;