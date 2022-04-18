// react imports
import React, { FC, useEffect, useState } from 'react';

// project imports
import { HomeView } from '@pages/Home/HomeView';

// ===========================|| HOME CONTAINER ||=========================== //

export const HomeContainer: FC = (): JSX.Element => {
  const [slides, setSlides] = useState([] as any);

  useEffect((): void => {
    // TODO get main carousel data from backend
    setSlides([]);
  }, []);

  return (<HomeView {...{ slides }} />);
};
