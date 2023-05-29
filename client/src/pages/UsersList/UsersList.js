import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import { onFetchAllUsers, onRemoveUser } from '../../redux/user/actions';

import './UsersList.scss';

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const { usersList: users, loading, loggedInUser, userDeletedAndReload } = user;

  useEffect(() => {
    if(loggedInUser && loggedInUser?.isAdmin) {
      dispatch(onFetchAllUsers());
    } else {
      navigate('/');
    }
    
  }, [ dispatch, loggedInUser, navigate ]);

  useEffect(() => {
    if(userDeletedAndReload) {
      dispatch(onFetchAllUsers());
    }
  }, [ userDeletedAndReload, dispatch ]);

  const removeUser = (id) => {
    if(window.confirm('Are you sure you want to remove the user')) {
      dispatch(onRemoveUser(id));
    }
  };

  return (
    <div className='users-list'>
      {loading ? <Spinner /> : (
        <>
          <h1> Users </h1>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map(user => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => removeUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UsersList;