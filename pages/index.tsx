import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { LoginStateProps } from '../store/reducer';
import { clearState, doLogin } from '../store/actions';
import Header from '../containers/Header/Header';
import Home from '../containers/Home/Home';

const LoginPage = () => {
  return (
    <>
      <main>
        <Header />
        <Home />
      </main>
    </>
  );
};

export default LoginPage;
