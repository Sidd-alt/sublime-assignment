import React, { useState, useEffect } from 'react';

const UserData = ({ user, handledisplayUserInfo }) => {
  return (
    <div onClick={() => handledisplayUserInfo(user)} className={'single-card'}>
      <img width="100px" src={user.image} />
      <h3>{user.firstName + ' ' + user.lastName}</h3>
      <h4 style={{ wordBreak: 'break-all' }}>Email : {user.email}</h4>
      <h4 style={{ wordBreak: 'break-all' }}>
        Address : {user.company.address.address}
      </h4>
    </div>
  );
};

export default UserData;
