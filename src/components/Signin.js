import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import firebase from 'firebase/app';
import styles from '../styles/signin.module.css';
import * as a from './../actions/index';

export const Signin = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        dispatch(a.setUser());
        console.log('Successfully signed in!');
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  function doSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(a.logOut());
        dispatch(a.getDataFailure()); // clear job data
        dispatch(a.setCurrentJob(0));
        console.log('Successfully signed out!');
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  let visibleState = () => {
    if (currentUser.loggedIn) {
      return (
        <div>
          <button onClick={doSignOut}>Sign out</button>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <form onSubmit={doSignIn}>
            <input type="text" name="signinEmail" placeholder="email" />
            <input
              type="password"
              name="signinPassword"
              placeholder="Password"
            />
            <button type="submit">Sign in</button>
          </form>
        </div>
      );
    }
  };

  return visibleState();
};

export default Signin;
