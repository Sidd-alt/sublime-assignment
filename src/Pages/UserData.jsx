import React from 'react';

const UserData = ({ displayUserInfo, goBacktoUserList }) => {
  const user = displayUserInfo;

  const { firstName, lastName, gender, email, image, company, address } = user;
  const { department, name, title } = company;
  const { postalCode, state } = address;

  return (
    <div className="dialog-container">
      <div className="single-user">
      <button className="button" onClick={() => goBacktoUserList()}>
        Go Back
      </button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>
          Hello {firstName} {lastName}
        </h1>
        <img width="200px" src={image} />
        <h3>Email : {email}</h3>
        <h3>Gender : {gender}</h3>
        <h3>Company name : {name}</h3>
        <h3>Department : {department}</h3>
        <h3>
          Address : {address.address} {state} {postalCode}
        </h3>
      </div>
    </div>
    </div>
    
  );
};

export default UserData;
