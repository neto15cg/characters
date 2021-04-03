import router from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detail from '../containers/detail/Detail';
import Header from '../containers/header/Header';
import { getCharacter } from '../store/ducks/characters';
import { RootState } from '../store/ducks/state';

const DetailPage = () => {
  const { pid } = router.query;
  const dispatch = useDispatch();
  const { characterDetail } = useSelector((state: RootState) => state.characters.data);

  useEffect(() => {
    const pid: any = router?.query?.pid;
    if (pid) {
      dispatch(getCharacter(pid));
    }
  }, [pid]);

  return (
    <>
      <main>
        <Header />
        <Detail character={characterDetail} />
      </main>
    </>
  );
};

export default DetailPage;
