import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detail from '../containers/detail/Detail';
import Header from '../containers/header/Header';
import { getCharacter } from '../store/ducks/characters';
import { RootState } from '../store/ducks/state';

const DetailPage = () => {
  const router = useRouter();

  const { pid } = router.query;
  const dispatch = useDispatch();
  const { data: detailData, loading, error } = useSelector((state: RootState) => state.characters);
  const { characterDetail } = detailData;

  const handleGetCharacter = () => {
    const pid: any = router?.query?.pid;
    if (pid) {
      dispatch(getCharacter(pid));
    }
  };

  useEffect(() => {
    handleGetCharacter();
  }, [pid]);

  const handleGoBack = () => router.back();

  const handleRefresh = () => handleGetCharacter();

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
        />
      </main>
    </>
  );
};

export default DetailPage;
