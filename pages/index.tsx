import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../containers/header/Header';
import Home from '../containers/home/Home';
import { LoadMore } from '../containers/loadingMore/LoadingMore';
import { listCharacters } from '../store/ducks/characters';
import { RootState } from '../store/ducks/state';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: dataCharacters, loading } = useSelector((state: RootState) => state.characters);
  const { characters, currentPage } = dataCharacters;

  useEffect(() => {
    if (!characters) {
      dispatch(listCharacters(currentPage));
    }
  }, [dispatch]);

  const numberOfPage = Math.round((characters && characters.number_of_total_results / characters.limit) || 1);

  const handleLoadMoreBills = (page: number) => {
    dispatch(listCharacters(page));
  };

  return (
    <>
      <main>
        <Header />
        <Home characters={characters} firstLoading={!!(!characters && loading['loading.list'])} />
        {numberOfPage > currentPage && (
          <LoadMore isFetching={loading['loading.list']} page={currentPage} callback={handleLoadMoreBills} />
        )}
      </main>
    </>
  );
};

export default HomePage;
