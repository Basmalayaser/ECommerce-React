
import React, { useState, useContext, useEffect} from 'react';
import style from './CategorySlider.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Virtual, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Spinner, Tooltip,spinner } from "@nextui-org/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { CategoryContext } from '../../Context/CategoryContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';


export default function CategorySlider() {
  const {allCategories,setAllCategories } = useContext(CategoryContext);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  function getCategoryList() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['categorySlider'],
    queryFn: getCategoryList,
  });

  setAllCategories(data?.data?.data);
  localStorage.setItem('allCategory',data?.data?.data);

  async function fetchSubCategory(id) {
    setLoadingSubCategories(true);
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubCategoryData(response.data?.data);
      setLoadingSubCategories(false)
    } catch (error) {
      setLoadingSubCategories(false)
    }
  }

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
   <div className="bg-[#eee] py-10">
    <div className="container lg:px-40 px-10 mx-auto">
      <div className={`${style.headind} pt-10 mb-10  text-3xl text-center font-semibold`}>
        <h2>Categories</h2>
      </div>
      <Swiper
        modules={[Virtual, Navigation]}
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        navigation={true}
        virtual
      >
        {allCategories.map((category, index) => (
          <SwiperSlide key={category._id} virtualIndex={index}>
            <Link to={`/categoryDetails/${category._id}`}>
              <div
                className="hover:cursor-pointer text-center w-fit mx-auto categoryText"
                onMouseEnter={() => {
                  setTooltipIndex(index);
                  fetchSubCategory(category._id);
                }}
                onMouseLeave={() => {
                  setTooltipIndex(null);
                  setSubCategoryData([]);
                }}
              >
                <Tooltip
                  isOpen={tooltipIndex === index}
                  onOpenChange={(open) => setTooltipIndex(open ? index : null)}
                  content={
                    loadingSubCategories ? (
                      <div className='px-5'> <Spinner  color="praimery"/></div>
                    ) : subCategoryData.length === 0 ? (
                      <div>No available products</div>
                    ) : (
                      <div>
                        {subCategoryData.map((subCat) => (
                          <p key={subCat._id} className='text-lg p-1'>{subCat.name}</p>
                        ))}
                      </div>
                    )
                    }

                  
                >
                  <div>
                    <img src={category.image} alt={category.name} className='w-40 h-40 rounded-full' />
                    <h3 className='pt-8 text-xl font-semibold ps-6'>{category.name}</h3>
                  </div>
                </Tooltip>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  );
}
