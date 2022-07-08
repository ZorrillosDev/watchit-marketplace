import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Index from '@pages/Home';
import Explore from '@pages/Explore';
import Festival from '@pages/Festival';
import Sell from '@pages/Sell';
import Work from '@pages/Work';
import MovieProfile from '@pages/Movie';
import MovieCreate from '@pages/Create';
import { DefaultLayout } from '@layouts/default';
import { ROOT, EXPLORE, FESTIVAL, SELL, WORK, MOVIE, CREATE, PROFILE, SETTINGS } from '@navigation/CONSTANTS';
import ProfileEdit from '@pages/ProfileEdit';
import Profile from '@pages/Profile';

export const Routing: FC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={ROOT}>
        <DefaultLayout>
          <Index />
        </DefaultLayout>
      </Route>
      <Route exact path={EXPLORE}>
        <DefaultLayout>
          <Explore />
        </DefaultLayout>
      </Route>
      <Route exact path={FESTIVAL}>
        <DefaultLayout>
          <Festival />
        </DefaultLayout>
      </Route>
      <Route exact path={SELL}>
        <DefaultLayout>
          <Sell />
        </DefaultLayout>
      </Route>
      <Route exact path={WORK}>
        <DefaultLayout>
          <Work />
        </DefaultLayout>
      </Route>
      <Route exact path={PROFILE}>
        <DefaultLayout>
          <Profile />
        </DefaultLayout>
      </Route>
      <Route exact path={SETTINGS}>
        <DefaultLayout>
          <ProfileEdit />
        </DefaultLayout>
      </Route>
      <Route
        path={MOVIE}
        render={
          () => (
            <DefaultLayout>
              <MovieProfile />
            </DefaultLayout>
          )
        }
      />
      <Route exact path={CREATE}>
        <DefaultLayout>
          <MovieCreate />
        </DefaultLayout>
      </Route>
    </Switch>
  );
};
