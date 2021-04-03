import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detail from '../containers/detail/Detail';
import Header from '../containers/header/Header';
import { getCharacter } from '../store/ducks/characters';
import { addFavoriteCharacter, removeFavoriteCharacter } from '../store/ducks/favoriteCharactes';
import { RootState } from '../store/ducks/state';

const DetailPage = () => {
  const router = useRouter();

  const { pid } = router.query;
  const dispatch = useDispatch();
  const { data: detailData, loading, error } = useSelector((state: RootState) => state.characters);
  const { data: favoriteData } = useSelector((state: RootState) => state.favoriteCharacters);
  const { characterDetail } = detailData;
  const { favoriteCharacters } = favoriteData;

  const handleGetCharacter = () => {
    const pid: any = router?.query?.pid;
    if (pid) {
      dispatch(getCharacter(pid));
    }
  };

  const handleGoBack = () => router.back();

  const handleRefresh = () => handleGetCharacter();

  const handleAddFavorite = () => dispatch(addFavoriteCharacter(characterDetail));

  const handleRemoveFavorite = () => dispatch(removeFavoriteCharacter(characterDetail));

  useEffect(() => {
    handleGetCharacter();
  }, [pid]);

  console.log(favoriteData);

  return (
    <>
      <main>
        <Header />
        <Detail
          character={characterDetail}
          loading={loading['loading.get']}
          onGoBack={handleGoBack}
          error={error.characterDetail}
          onRefreshRequest={handleRefresh}
          isFavorite={!!favoriteCharacters.find(character => character.id === characterDetail?.results.id)}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </main>
    </>
  );
};

export default DetailPage;
