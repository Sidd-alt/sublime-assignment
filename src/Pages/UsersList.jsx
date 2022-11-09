import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard.jsx';
import UserData from './UserData.jsx';

const UsersList = ({ handleShowUserListPage }) => {
  const [showMessage, setShowMessage] = useState({
    bool: true,
    msg: 'Loading...',
  });
  const [showUserDataPage, setshowUserDataPage] = useState(false);
  const [displayUserInfo, setdisplayUserInfo] = useState();
  const [usersData, setusersData] = useState([]);
  const [searchUsers, setsearchUsers] = useState('');

  useEffect(() => {
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    if (name && email && password) {
      fetch('https://dummyjson.com/users')
        .then((res) => res.json())
        .then((data) => {
          setusersData(data.users);
          setShowMessage({ ...showMessage, bool: false });
        })
        .catch((err) => {
          setShowMessage({
            ...showMessage,
            bool: true,
            msg: 'Unable to access the data. Please try again later',
          });
        });
    } else {
      setShowMessage({
        ...showMessage,
        bool: true,
        msg: 'Unable to access the data. Please try again later',
      });
      setTimeout(() => handleShowUserListPage(false), 5000);
    }
  }, []);

  const handledisplayUserInfo = (data) => {
    setshowUserDataPage(true);
    setdisplayUserInfo(data);
    setsearchUsers('');
  };

  const goBacktoUserList = () => {
    setshowUserDataPage(false);
  };

  return (
    <>
      {!showMessage.bool && (
        <div className="icon-container">
          <button
            className={'button'}
            onClick={() => handleShowUserListPage(false)}
          >
            Sign out
          </button>
        </div>
      )}
      {showMessage.bool ? ( // IF API STATE IS IN PENDING STATE OR EMAIL AND PASSWORD NOT FOUND IN LOCAL STORAGE THEN SHOW CUSTOM MESSAGE
        <h1 style={{ textAlign: 'center' }}>{showMessage.msg}</h1>
      ) : showUserDataPage ? ( // IF THE USER CLICKS ON A PARTICULAR CARD
        <UserData
          displayUserInfo={displayUserInfo}
          goBacktoUserList={goBacktoUserList}
        />
      ) : (
        // IF API STATE IS IN RESOLVED STATE AND EMAIL AND PASSWORD IS FOUND IN LOCAL STORAGE THEN SHOW USER LIST
        <>
          <input
            value={searchUsers}
            placeHolder="Search User"
            onChange={(e) => setsearchUsers(e.target.value.trim())}
            id="search-user-input"
            className="input-field"
          />
          <div className={'grid-container'}>
            {usersData
              .filter((user) =>
                (user.firstName + user.lastName)
                  .toLowerCase()
                  .includes(searchUsers.toLowerCase())
              )
              .map((data) => (
                <UserCard
                  key={data.id}
                  user={data}
                  handledisplayUserInfo={handledisplayUserInfo}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default UsersList;
