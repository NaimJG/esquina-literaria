import React from 'react';

// 1. Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Swiper.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SwiperComponent() {
  return (
    <div className='swiper-container'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
      >
        <SwiperSlide><div style={{ background: '#9cf', height: 150 }}>Slide 1</div></SwiperSlide>
        <SwiperSlide><div style={{ background: '#c9f', height: 150 }}>Slide 2</div></SwiperSlide>
        <SwiperSlide><div style={{ background: '#fc9', height: 150 }}>Slide 3</div></SwiperSlide>
        <SwiperSlide><div style={{ background: '#9fc', height: 150 }}>Slide 4</div></SwiperSlide>
        <SwiperSlide><div style={{ background: 'rgba(224, 127, 127, 1)', height: 150 }}>Slide 5</div></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SwiperComponent;