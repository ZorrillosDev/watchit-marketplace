import React, {FC, useMemo} from 'react'

import {createAvatar} from '@dicebear/avatars'
import * as style from '@dicebear/adventurer-neutral'
import {String} from '@src/utils'

interface IdenticonProps {
    seed: string
    size?: number
    radius?: number
    backgroundColor?: string
}

export const PixelArtIdenticon: FC<IdenticonProps> = (props): JSX.Element => {
    const randomHex = useMemo(() => String.toHex(props.seed), [props.seed])
    const {seed = '', size = 25, radius = 30, backgroundColor = `${randomHex}`} = props

    return (
        <div
            style={{width: size, height: size}}
            dangerouslySetInnerHTML={{
                __html: createAvatar(style, {
                    seed, size, radius, backgroundColor
                })
            }}
        />
    )
}
