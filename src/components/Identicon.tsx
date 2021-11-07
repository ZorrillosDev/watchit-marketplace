import React, { FC, useMemo } from 'react'

import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/adventurer-neutral'

interface IdenticonProps {
  seed: string
  size?: number
  radius?: number
  backgroundColor?: string
}

export const PixelArtIdenticon: FC<IdenticonProps> = (props): JSX.Element => {
  const randomHex = useMemo(() => Math.floor(Math.random() * 16777215).toString(16), [props.seed])
  const { seed = '', size = 25, radius = 30, backgroundColor = `#${randomHex}` } = props

  return (
    <div
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{
        __html: createAvatar(style, {
          seed, size, radius, backgroundColor
        })
      }}
    />
  )
}
