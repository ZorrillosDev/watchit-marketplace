import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation"
import "swiper/css/pagination"
import styled from "styled-components";
import SwiperCore, {
    Navigation, Pagination
} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const HomeSlider: FC = (): JSX.Element => {

  return (
      <HomeSliderWrapper>
          <Swiper
              spaceBetween={0}
              slidesPerView={1}
              navigation={true}
              centeredSlides={true}
              pagination={{
                  "clickable": true
              }}
          >
              <SwiperSlide><HomeSliderImage src="https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg" /></SwiperSlide>
              <SwiperSlide><HomeSliderImage src="https://image.tmdb.org/t/p/w1280/ftkY1xIQ6ianSVp3EDufPVPLwa2.jpg" /></SwiperSlide>
              <SwiperSlide><HomeSliderImage src="https://image.tmdb.org/t/p/w1280/6I7NCNMEUlDpYy5ytqMLtFlu4B6.jpg" /></SwiperSlide>
              <SwiperSlide><HomeSliderImage src="https://image.tmdb.org/t/p/w1280/4T3zLYpHf5IOherMk5PhDB4X3nc.jpg" /></SwiperSlide>
          </Swiper>
      </HomeSliderWrapper>
  )
}

const HomeSliderWrapper = styled.div`
  height: 100%;
  display: block;
  position: relative;

  .swiper-button-next, .swiper-button-prev {
    width: 4rem;

    &:after {
      color: #fff;
      font-size: 3rem;
      font-weight: bold;
    }
  }

  .swiper-pagination {
    bottom: 1rem;

    .swiper-pagination-bullet {
      width: 0.7rem;
      height: 0.7rem;
      background-color: white !important;
      transition: all 0.5s ease-in-out;
    }
    
    .swiper-pagination-bullet-active {
      width: 2rem !important;
      border-radius: 0.5rem;
    }
  }

  @media (min-width: 600px) {
    width: calc(100% + 3rem);
    margin: 0 0 0 -1.5rem;
  }

  @media (min-width: 1200px) {
    width: calc(100% + 6rem);
    margin: 0 0 0 -3rem;
  }

  @media (min-width: 1400px) {
    width: calc(100% + 10rem);
    margin: 0 0 0 -5rem;
  }

  @media (min-width: 1900px) {
    width: calc(100% + 20rem);
    margin: 0 0 0 -10rem;
    transition: all 0.5s ease-in-out;
  }
`

const HomeSliderImage = styled.img`
  width: 100%;
  height: auto;
`

export default HomeSlider
