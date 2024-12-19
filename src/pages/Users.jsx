import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Users = () => {
  //users를 담을 배열생성
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false); //처음에 눈에 안보이게 하도록 false를 초기값으로 설정
  const [selectedUser, setSelectedUser] = useState(null); //클릭한 사용자 정보 저장

  const userInfo = (info) => {
    setSelectedUser(info);
  }
  
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`) //axios로 데이터 가져오기
    .then((response) => {
      setUsers(response.data)
      console.log(response.data);  //불러온 users데이터 확인
    })
  }, [])

  //Users페이지 구현
  return (
    <div>
      <h2>User List</h2>
      {
        users.map( user => (
          <div className='userCard' onClick={(e) => {e.stopPropagation(); userInfo(user)}}>
            {/* <Link to={`users/${user.id}`}>{user.name}</Link> */}
            <div className='active' onClick={() => {setModal(!modal)}}>{user.name}</div>
          </div>
        ))
      }
      {
        modal === true ? <Modal userInfo={selectedUser}/> : null
      }
    </div>
  );
};

//모달창 생성
function Modal({userInfo}){
  return(
    <div className='modal'>
      <p>{userInfo.name}</p>
      <p>{userInfo.phone}</p>
      <p>{userInfo.website}</p>
    </div>
  )
}

export default Users;