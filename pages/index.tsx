import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../containers/header/Header';
import Home from '../containers/home/Home';
import { listCharacters } from '../store/ducks/characters';
import { RootState } from '../store/ducks/state';

const HomePage = () => {
  const dispatch = useDispatch();
  const { characters } = useSelector((state: RootState) => state.characters.data);

  console.log('---', characters);
  useEffect(() => {
    if (!characters) {
      dispatch(listCharacters());
    }
  }, [dispatch]);

  return (
    <>
      <main>
        <Header />
        <Home characters={characters} />
      </main>
    </>
  );
};

export default HomePage;
