import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detail from '../containers/detail/Detail';
import Header from '../containers/header/Header';
import { getCharacter } from '../store/ducks/characters';
import { addEditedCharacter } from '../store/ducks/editedCharacters';
import { addFavoriteCharacter, removeFavoriteCharacter } from '../store/ducks/favoriteCharactes';
import { RootState } from '../store/ducks/state';
import { CharacterDetailType } from '../store/ducks/types';

const DetailPage = () => {
  const router = useRouter();

  const { pid } = router.query;
  const dispatch = useDispatch();
  const { data: detailData, loading, error } = useSelector((state: RootState) => state.characters);
  const {
    data: { editedCharacters },
  } = useSelector((state: RootState) => state.editedCharacters);
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

  const handleSave = (character: CharacterDetailType) => {
    dispatch(addEditedCharacter(character));
  };

  const findedEditing = editedCharacters.find(character => character.id === characterDetail?.results.id);

  useEffect(() => {
    handleGetCharacter();
  }, [pid]);

  return (
    <>
      <main>
        <Header />
        <Detail
          character={
            findedEditing
              ? { ...characterDetail, results: { ...characterDetail.results, ...findedEditing } }
              : characterDetail
          }
          loading={loading['loading.get']}
          onGoBack={handleGoBack}
          error={error.characterDetail}
          onRefreshRequest={handleRefresh}
          isFavorite={!!favoriteCharacters.find(character => character.id === characterDetail?.results.id)}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          onSaveEdit={handleSave}
        />
      </main>
    </>
  );
};

export default DetailPage;
