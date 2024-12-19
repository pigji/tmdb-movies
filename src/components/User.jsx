import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  //
  const {id} = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true); //초기값이 보여야하기 때문에 ture로 설정

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      setUser(response.data)
      setLoading(false)
      console.log(response.data)
    })
  }, [id])


  return (
    <div className='user'>
      <h2>User</h2>
      <div className="userDetail">
        {
          isLoading ? (<div className='loding'>로딩중...</div>) : (
            <div>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.website}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default User;