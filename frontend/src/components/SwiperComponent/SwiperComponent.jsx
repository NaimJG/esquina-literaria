import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Swiper.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import bookService from "../../service/bookService";

function SwiperComponent() {

  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const books = await bookService.getTopCommentedBooks();
        console.log('Swiper: fetched top books', books);
        setTopBooks(books);
      } catch (error) {
        console.error("Error al obtener los libros más comentados:", error);
      }
    };
    fetchTopBooks();
  }, []);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ padding: '15px' }}
      >
        {topBooks.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="swiper-slide-content">
              <Link to={`/books/${book.id}`} className="swiper-book-link">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="swiper-cover"
                />
                <p className="swiper-title">{book.title}</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperComponent;