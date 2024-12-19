import {Routes, Route} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';	//상단 nav메뉴바
import Footer from './components/Footer';	//footer
import Home from './pages/Home';	//main페이지
import Movies from './pages/Movies';
import Users from './pages/Users';
import User from './components/User';	//Users의 상세 페이지
import Event from './pages/Event';
import Movie from './pages/Movie';
import Comming from './pages/Comming';	//예정작 상세페이지
import SearchDetail from './pages/SearchDetail';	//검색
import QuicBtn from './components/QuicBtn';	//최상단으로 이동하는 버튼




function App() {
  return (
    <div className="App">
		<Navbar></Navbar>
		<Routes>
			<Route path="/" element={<Home />}  />
			<Route path="/movies" element={<Movies />}  />
			<Route path="/movies/:id" element={<Movie />}  />
			<Route path="/comming/:id" element={<Comming />}  />
			<Route path="/users" element={<Users />}  />
			<Route path="/users/:id" element={<User />}  />
			<Route path="/event" element={<Event />}  />
			<Route path="/search/:movieId" element={<SearchDetail />}  />
		</Routes>
		<Footer />
		<QuicBtn />
    </div>
  );
}

export default App;
