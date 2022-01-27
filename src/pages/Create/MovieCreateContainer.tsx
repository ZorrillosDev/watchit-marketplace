// react imports
import React, { FC, useState } from 'react'

// project imports
import { MovieCreateView } from '@pages/Create/MovieCreateView'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - CREATE - CONTAINER ||=========================== //

export const MovieCreateContainer: FC = (): JSX.Element => {
  const [name, setName] = useState('')
  const [bid, setBid] = useState(0)
  const [poster, setPoster] = useState('')
  const [film, setFilm] = useState('')

  return (
    <MovieCreateView {...{
      poster,
      setPoster,
      film,
      setFilm,
      name,
      setName,
      bid,
      setBid
    }}
    />
  )
}
