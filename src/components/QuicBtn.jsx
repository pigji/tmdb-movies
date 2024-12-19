import React, {useState, useEffect} from 'react';
//리액트 아이콘
import { FaCircleArrowUp } from "react-icons/fa6";

const QuicBtn = () => {
  const [isVisible, setIsVisible] = useState(false);   //처음에 안보여야 하기 때문에 초기값 false로 설정
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); //스크롤 top의 위치가 300이상이면 true, false가 되면 눈에 안보임(사라짐)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []);

  //
  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }


  return isVisible && (
    <div className='quickBtn' onClick={scrollTop}>
      <button className='quick-top' type='button'>
        <FaCircleArrowUp className='upArrowBtn'style={{}}/>
        </button>
    </div>
  );
};

export default QuicBtn;