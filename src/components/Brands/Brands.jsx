// import React, { useState } from 'react'
// import style from './Brands.module.css'
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import Loader from '../Loader/Loader';

// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";

// export default function Brands() {

//   const [loader,setLoader] =useState(true)
//   const [relatedData,setRelatedData] =useState([])
//   const [errorMessage,setErrorMessage] =useState(null)
//   const [specificBrand,setSpecificBrand] =useState([])

//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
//   const [scrollBehavior, setScrollBehavior] = React.useState("inside");



//   function getAllBrand() {
//     return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
//   }

//   const { data, isLoading, error, isError } = useQuery({
//     queryKey: ['getAllBrand'],
//     queryFn: getAllBrand,
//   });

//     async function GetSpecificBrand(id) {
//       try {
//         const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
//         setSpecificBrand(response.data.data)
//         console.log(response.data.data)
//       } catch (error) {
//         setErrorMessage(error.message);
//       }
//     }
 

//     async function getRelatedProduct(id) {
//       try {
//         const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//         const related = response.data.data;
//            //   Filter products based on the selected Brand
//         const filteredRelated = related.filter(product => product.brand._id === id);
//         setRelatedData(filteredRelated);
//         console.log(filteredRelated)
//       } catch (error) {
//         setErrorMessage(error.message)
//       }
//     }
  
//   return (
//     <>
   
//    <div className="container lg:px-40 px-10 mx-auto mt-20 pb-10">
//     {isError?<div className="text-center text-red-500 p-40">{error.message}</div>:""}

//     {isLoading?<Loader/>:<div className="gap-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 ">
//       {data?.data.data.map((brand) => (
//         // <div onClick={()=>{getRelatedProduct(brand._id)}} key={brand._id} className='border-orange-500 rounded-full border-1 text-center hover:shadow-lg cursor-pointer' >
//         //     <img src={brand.image} alt={brand.name} className='w-20 h-20 inline-block'/>
//         // </div>
//         <div className='text-center' >
//         <Button onPress={onOpen} className='border-orange-500 p-10 rounded-full border-1 text-center hover:shadow-lg cursor-pointer bg-white' >
//         <img src={brand.image} alt={brand.name} className='w-40'/>
//         </Button>
//         <Modal
//           isOpen={isOpen}
//           onOpenChange={onOpenChange}
//           scrollBehavior="inside"
//           backdrop="opaque" 
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex">
//                    <img src={brand.image} alt={brand.name} className='w-20'/>
//                    <p>{brand.name}</p>
//                 </ModalHeader>
//                 <ModalBody>
//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Nullam pulvinar risus non risus hendrerit venenatis.
//                     Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                   </p>

//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="light" onPress={onClose}>
//                     Close
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       </div>
//       ))} 
      
     
     
//     </div>
    
//     } 

//    </div>
//     </>
  
//   ) }


import React, { useContext, useState } from 'react'
import style from './Brands.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import {Spinner} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/Cartcontext';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [relatedData, setRelatedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [specificBrand, setSpecificBrand] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [Loading, setLoading] = useState(true);

  let{ addProductToWishlist,wishListItems,removeProductFromWishlist,getAllProductFromWishlist} =useContext(WishListContext)
  let {addProductToCart}=useContext(CartContext)
  

  const { isOpen, onOpen, onClose } = useDisclosure();

  function getAllBrand() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getAllBrand'],
    queryFn: getAllBrand,
  });

  async function GetSpecificBrand(id) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setSpecificBrand(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function getRelatedProduct(id) {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const related = response.data.data;
      // Filter products based on the selected Brand
      const filteredRelated = related.filter(product => product.brand._id === id);
      setRelatedData(filteredRelated);
      setLoading(false)
      console.log(filteredRelated);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleOpenModal = (brand) => {
    setSelectedBrandId(brand._id);
    GetSpecificBrand(brand._id);
    getRelatedProduct(brand._id);
    onOpen();
  };

  
  async function addToCart(productId){
    let responce= await addProductToCart(productId)
    console.log(responce)
 }
  

 async function addToWish(productId){
  await addProductToWishlist(productId)
  await getWishList()
}

async function removeFromWish(productId){
  await removeProductFromWishlist(productId)
  await getWishList()
}

function toggleWishlistItem(item){
  
if (wishListItems.includes(item.id)) {
  return  removeFromWish(item.id)
} else{
  return  addToWish(item.id)
}

}


  return (
    <>
      <div className="container lg:px-20 px-10 mx-auto mt-20 pb-10">
        {isError ? <div className="text-center text-red-500 p-40">{error.message}</div> : ""}

        {isLoading ? <Loader /> : (
          <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data?.data.data.map((brand) => (
              <div key={brand._id} className='text-center'>
                <Button onPress={() => handleOpenModal(brand)} className='border-orange-500 p-10 rounded-full border-1 text-center hover:shadow-lg cursor-pointer bg-white'>
                  <img src={brand.image} alt={brand.name} className='w-40' />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {specificBrand && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          scrollBehavior="inside"
          backdrop="opaque"
        >
          <ModalContent>
            <ModalHeader className="flex justify-around items-center">
              <p className='text-xl text-orange-500'>{specificBrand.name}</p>
              <img src={specificBrand.image} alt={specificBrand.name} className='w-20' />
            </ModalHeader>
            <ModalBody>
            {Loading? <Spinner />:relatedData.length==0?<div className=" text-xl p-5 items-center text-orange-500">No products available now</div>:
    <div className="">
    {relatedData.map((product) => (
      <div key={product.id} className="wrapperCard">
        <div className="">
      <Link to={`/productDetails/${product.id}/${product.category._id}`}>
      <div className="topCard">
            <img src={product.imageCover} alt={product.title} className='w-full'/>
          </div>
      </Link>
      <div className="cardBody p-4 ">
            <h3 className='text-xl font-medium text-orange-500'>
              {product.category.name}
            </h3>
            <div className="grid grid-cols-3">
            <div className="col-span-2">
                <h4 className='text-xl font-medium'>{(product.title).split(" ").slice(0,2).join(" ")}</h4>
                <div className="flex justify-between text-xl font-medium">
                  <p>{product.price} EGP</p>
                  <p>{product.ratingsAverage}<i className="fa-solid fa-star text-yellow-300"></i></p>
                </div>
            </div>
            <div  onClick={()=>addToCart(product.id)} className="border-1 border-orange-500 p-2 flex justify-center items-center  ms-2 cursor-pointer cart">
            <i className="fa-solid fa-cart-plus fa-xl"></i>
            </div>
            </div>
          </div>

        </div>
        <div className="insideCard cursor-pointer">
        <div onClick={()=>{toggleWishlistItem(product)}} className="iconCard cursor-pointer">
              {wishListItems.includes(product.id) ? <i className="fa-solid fa-heart text-blue-500"></i>: <i className="fa-regular fa-heart text-xl text-blue-500"></i>}
              
              </div>
        </div>
      </div>
    ))}
  </div>}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

<Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
    </>
  );
}
