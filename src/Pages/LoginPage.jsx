import React, { useState, useEffect } from 'react';
import UsersList from './UsersList.jsx';

const nameRegex = /^[a-zA-Z ]*$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

function ValidationChecker(regex, data) {
  return regex.test(data);
}

const initialState = {
  name: '',
  email: '',
  password: '',
};

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showUserListPage, setShowUsersListPage] = useState(false);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    if (name && email && password) {
      setShowUsersListPage(true);
    }
  }, []);

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleShowUserListPage = (value) => {
    setShowUsersListPage(value);
    setShowDialogBox(false);
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = loginData;
    if (!ValidationChecker(nameRegex, name)) {
      setErrorMsg('User name must consist of alphabets only');
      return;
    }
    if (!ValidationChecker(emailRegex, email)) {
      setErrorMsg('Email is Invalid');
      return;
    }
    if (!ValidationChecker(passwordRegex, password)) {
      setErrorMsg(
        'Password must consist of 8 to 15 characters and should contain at least one lowercase letter, one letter, one numeric digit, and one special character'
      );
      return;
    }
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    setErrorMsg('');
    setLoginData(initialState);
    setShowUsersListPage(true);
  };

  const handleDialogBox = (value) => {
    setShowDialogBox(value);
  };

  return (
    <>
      {showUserListPage ? (
        // IF THE VALIDATION OF REQUIRED FIELDS IS DONE THEN MOVE TO USERLIST PAGE
        <UsersList handleShowUserListPage={handleShowUserListPage} />
      ) : (
        <>
          {showDialogBox ? (
            <div className="dialog-container">
              <div className="dialog-box">
                <div
                  onClick={() => handleDialogBox(!showDialogBox)}
                  className="close-icon"
                >
                  x
                </div>
                <p className="notice-msg">
                  1. User name must consist of alphabets only
                </p>
                <p className="notice-msg">
                  2. Email address must be of the format random@example.org
                </p>
                <p className="notice-msg">
                  3. Password must consist of 8 to 15 characters and should
                  contain at least one lowercase letter, one letter, one numeric
                  digit, and one special character'
                </p>
              </div>
            </div>
          ) : (
            <div
              onClick={() => handleDialogBox(!showDialogBox)}
              className="icon-container"
            >
              <div className={'i-icon'}>i</div>
            </div>
          )}
          <form className="form-styling" onSubmit={onSubmitHandler}>
            <h2>LOGIN PAGE</h2>
            <div className="inputDiv">
              <label
                className={'requiredLabels'}
                style={{ marginRight: '34px' }}
              >
                Name
              </label>
              <input
                className="input-field"
                required
                maxLength={50}
                name="name"
                value={loginData.name}
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputDiv">
              <label
                className={'requiredLabels'}
                style={{ marginRight: '37px' }}
              >
                Email
              </label>
              <input
                className="input-field"
                maxLength={50}
                required
                name="email"
                value={loginData.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputDiv">
              <label
                className={'requiredLabels'}
                style={{ marginRight: '7px' }}
              >
                Password
              </label>
              <input
                className="input-field"
                required
                maxLength={50}
                name="password"
                type="password"
                value={loginData.password}
                onChange={onChangeHandler}
              />
            </div>
            <input
              className="button"
              style={{ marginTop: '20px' }}
              type="submit"
            />
            {errorMsg && <h5>{errorMsg}</h5>}
          </form>
        </>
      )}
    </>
  );
};

export default LoginPage;
