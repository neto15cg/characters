import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../containers/header/Header';
import Home from '../containers/home/Home';
import { listCharacters } from '../store/ducks/characters';
import { RootState } from '../store/ducks/state';

const HomePage = () => {
  const characters = useSelector((state: RootState) => state.characters.data.characters);
  const dispatch = useDispatch();

  console.log('---', characters);
  useEffect(() => {
    dispatch(listCharacters());
  }, [dispatch]);

  return (
    <>
      <main>
        <Header />
        <Home />
      </main>
    </>
  );
};

export default HomePage;
