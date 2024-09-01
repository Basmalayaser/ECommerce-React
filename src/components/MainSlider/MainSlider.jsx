import React, { useState ,useRef } from 'react';
import style from './MainSlider.module.css';
import product1 from "./../../assets/product1.jpg";
import product2 from "./../../assets/product5.jpeg";
import product3 from "./../../assets/product6.jpg";
import product4 from "./../../assets/product7.webp";
import product5 from "./../../assets/product4.jpg";
import product6 from "./../../assets/product2.avif";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function MainSlider() {

  return (

 <div className="container mx-auto lg:px-40 px-10 mb-20 rounded-full drop-shadow-lg pt-10 ">
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1  overflow-hidden">
      <div className="col-span-2">

<Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination,Navigation]}
        
        className="mySwiper"
      >
        <SwiperSlide><img src={product2} alt="" className='w-full h-[400px]'/></SwiperSlide>
        <SwiperSlide><img src={product6} alt="" className='w-full h-[400px]'/></SwiperSlide>
        <SwiperSlide><img src={product3} alt="" className='w-full h-[400px]'/></SwiperSlide>
        <SwiperSlide><img src={product4} alt=""className='w-full h-[400px]' /></SwiperSlide>
        
     
      </Swiper>

      </div>

      <div className="h-[400px]">
          <img src={product5} alt="" className='w-full h-[200px]'/>
          <img src={product1} alt=""  className='w-full h-[200px]'/>
      </div>
      </div>

      </div>
    );
  }


