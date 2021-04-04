import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../containers/header/Header';
import Home from '../containers/home/Home';
import { listCharacters } from '../store/ducks/characters';
import { RootState } from '../store/ducks/state';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: dataCharacters, loading, error } = useSelector((state: RootState) => state.characters);
  const { characters, currentPage } = dataCharacters;
  const { data: favoriteData } = useSelector((state: RootState) => state.favoriteCharacters);
  const { favoriteCharacters } = favoriteData;

  useEffect(() => {
    if (!characters) {
      dispatch(listCharacters(undefined, currentPage));
    }
  }, [dispatch]);

  const handleMoreCharacters = (page: number, search?: string) => dispatch(listCharacters(search, page));

  const handleRefresh = () => handleMoreCharacters(currentPage);

  return (
    <>
      <main>
        <Header />
        <Home
          characters={characters}
          firstLoading={!!(!characters && loading['loading.list'])}
          onRefreshRequest={handleRefresh}
          error={error.characters}
          favoriteCharacters={favoriteCharacters}
          onMore={handleMoreCharacters}
          currentPage={currentPage}
          loadingMore={loading['loading.list']}
        />
      </main>
    </>
  );
};

export default HomePage;
