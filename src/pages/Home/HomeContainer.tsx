import React, { FC, useEffect, useState } from 'react'
import { HomeView } from '@pages/Home/HomeView'
import { HomeSlide } from '@pages/Home/components/HomeSlider'

/* eslint-disable  @typescript-eslint/explicit-function-return-type */

const STATIC_SLIDES = [
  {
    image: 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    title: 'Avengers: Endgame / Vengadores 4',
    description: 'Tras los sucesos de “Vengadores: Infinity War”, los superhéroes que sobrevivieron a Thanos se reunen para poner en práctica un plan definitivo que podría acabar con el villano definitivamente. No saben si funcionará, pero es su única oportunidad de intentarlo. Cuarta entrega de la saga “Vengadores”',
    owner: {
      name: '@nickcsefar',
      profilePicture: 'https://pbs.twimg.com/profile_images/877511025066737664/WHESAQdS_400x400.jpg'
    },
    price: 34.5,
    rate: 2340
  },
  {
    image: 'https://image.tmdb.org/t/p/w1280/ftkY1xIQ6ianSVp3EDufPVPLwa2.jpg',
    title: 'Joker',
    description: 'Situada en los años 80′. Un cómico fallido es arrastrado a la locura, convirtiendo su vida en una vorágine de caos y delincuencia que poco a poco lo llevará a ser el psicópata criminal más famoso de Gotham.',
    owner: {
      name: '@nickcsefar',
      profilePicture: 'https://pbs.twimg.com/profile_images/1146982498125193216/IiIjunPd_400x400.jpg'
    },
    price: 20.1,
    rate: 1204
  },
  {
    image: 'https://image.tmdb.org/t/p/w1280/6I7NCNMEUlDpYy5ytqMLtFlu4B6.jpg',
    title: 'Moonbound',
    description: 'Cuando Peter emprende un viaje mágico para rescatar a su hermana pequeña Ana, tiene que viajar a un territorio misterioso: ¡la Luna! Anne fue secuestrada por el malvado Hombre Luna cuando intentaba ayudar al escarabajo Sr. Zoomzeman en la búsqueda de su esposa. En su fantástica aventura, Peter aterriza en la Pradera de las Estrellas, donde conoce al somnoliento Sr. Sandman.',
    owner: {
      name: '@nickcsefar',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9KGqetnmm1Gf01WQ-Jb_-TrbmzTluHD_wQQ&usqp=CAU'
    },
    price: 18.7,
    rate: 1587
  },
  {
    image: 'https://image.tmdb.org/t/p/w1280/4T3zLYpHf5IOherMk5PhDB4X3nc.jpg',
    title: 'Pequeño país',
    description: 'Gabriel tiene 10 años y vive en un cómodo vecindario de expatriados en Burundi, su “pequeño país”. Gabriel es un niño normal, feliz y despreocupado, que vive aventuras cotidianas con sus amigos y su hermana pequeña. De repente, en 1993, las tensiones en el país vecino, Ruanda, estallaron, poniendo en peligro tanto a su familia como a su inocencia.',
    owner: {
      name: '@nickcsefar',
      profilePicture: 'https://pbs.twimg.com/profile_images/1231216530375020545/GzLHFUCs_400x400.jpg'
    },
    price: 987,
    rate: 321
  }
]

export const HomeContainer: FC = (): JSX.Element => {
  const [slides, setSlides] = useState([] as HomeSlide[])

  useEffect(() => {
    // TODO get main carousel data from backend
    setSlides(STATIC_SLIDES)
  }, [])

  return (<HomeView {...{ slides }} />)
}
