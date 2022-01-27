import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import Index from '@pages/Home'
import Explore from '@pages/Explore'
import Festival from '@pages/Festival'
import Sell from '@pages/Sell'
import Work from '@pages/Work'
import MovieProfile from '@pages/Movie'
import MovieCreate from '@pages/./Create'
import { DefaultLayout } from '@layouts/default'
import { ROOT, EXPLORE, FESTIVAL, SELL, WORK, MOVIE, MOVIE_CREATE } from '@navigation/CONSTANTS'

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
      <Route
        path={MOVIE}
        render={
          (e) => (
            <DefaultLayout>
              <MovieProfile />
            </DefaultLayout>
          )
        }
      />
      <Route exact path={MOVIE_CREATE}>
        <DefaultLayout>
          <MovieCreate />
        </DefaultLayout>
      </Route>
    </Switch>
  )
}
