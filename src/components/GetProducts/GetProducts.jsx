// import React, { useContext } from 'react';
// import styles from './GetProducts.module.css';
// import axios from 'axios';
// import Loader from '../Loader/Loader';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';
// import { CartContext } from '../../Context/Cartcontext';
// import { WishListContext } from '../../Context/WishListContext';


// export default function GetProducts() {

//   let {addProductToCart}=useContext(CartContext)
//   let{ addProductToWishlist,wishListItems,removeProductFromWishlist,getAllProductFromWishlist} =useContext(WishListContext)

//  let {data,isLoading,isError,error}= useQuery({
//       queryKey:["GetProducts"],
//       queryFn:fetchProduct,
//  })

//  function fetchProduct() {
//       return  axios.get('https://ecommerce.routemisr.com/api/v1/products');
//   }

   
//   async function getWishList(){
//     await  getAllProductFromWishlist()
//    }


//    async function addToCart(productId){
//       await addProductToCart(productId)
//   }

//   async function addToWish(productId){
//     await addProductToWishlist(productId)
//     await getWishList()
//   }

//   async function removeFromWish(productId){
//     await removeProductFromWishlist(productId)
//     await getWishList()
//   }

//  function toggleWishlistItem(item){
    
//   if (wishListItems.includes(item.id)) {
//     return  removeFromWish(item.id)
//   } else{
//     return  addToWish(item.id)
//   }

// }



//   return (
//     <div className="container lg:px-40 px-10 mx-auto mt-20 pb-10">
//     {isError?<div className="text-center text-red-500 p-40">{error.message}</div>:""}
//     {isLoading?<Loader/>:<div className="gap-2 grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
//         {data?.data.data.map((product) => (
//           <div key={product.id} className="wrapperCard">
//             <div className="">


//           <Link to={`/productDetails/${product.id}/${product.category._id}`}>
//               <div className="topCard">
//                 <img src={product.imageCover} alt={product.title} className='w-full'/>
//               </div>
//           </Link>
//           <div className="cardBody p-4">
//                 <h3 className='text-xl font-medium text-orange-500'>
//                   {product.category.name}
//                 </h3>
//                 <div className="grid grid-cols-3">
//                 <div className="col-span-2">
//                     <h4 className='text-xl font-medium'>{(product.title).split(" ").slice(0,2).join(" ")}</h4>
//                     <div className="flex justify-between text-xl font-medium">
//                       <p>{product.price} EGP</p>
//                       <p>{product.ratingsAverage}<i className="fa-solid fa-star text-yellow-300"></i></p>
//                     </div>
//                 </div>
//                 <div className="border-1 border-orange-500 p-2 flex justify-center items-center  ms-2 cursor-pointer cart">
//                 <i onClick={() => addToCart(product.id)} className="fa-solid fa-cart-plus fa-xl"></i>
//                 </div>
//                 </div>
//               </div>

//             </div>
//             <div className="insideCard">
//               <div onClick={()=>{toggleWishlistItem(product)}} className="iconCard cursor-pointer">
//               {wishListItems.includes(product.id) ? <i className="fa-solid fa-heart text-blue-500"></i>: <i className="fa-regular fa-heart text-xl text-blue-500"></i>}
              
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>}
      
//     </div>
//   );
// }




import React, { useContext, useState } from 'react';
import styles from './GetProducts.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cartcontext';
import { WishListContext } from '../../Context/WishListContext';
import { Input } from '@nextui-org/react';


export default function GetProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, wishListItems, removeProductFromWishlist, getAllProductFromWishlist } = useContext(WishListContext);

  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["GetProducts"],
    queryFn: fetchProduct,
  });

  function fetchProduct() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  async function getWishList() {
    await getAllProductFromWishlist();
  }

  async function addToCart(productId) {
    await addProductToCart(productId);
  }

  async function addToWish(productId) {
    await addProductToWishlist(productId);
    await getWishList();
  }

  async function removeFromWish(productId) {
    await removeProductFromWishlist(productId);
    await getWishList();
  }

  function toggleWishlistItem(item) {
    if (wishListItems.includes(item.id)) {
      return removeFromWish(item.id);
    } else {
      return addToWish(item.id);
    }
  }

  const filteredProducts = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container lg:px-40 px-10 mx-auto mt-20 pb-10">
      {isError ? <div className="text-center text-red-500 p-40">{error.message}</div> : ""}
      {isLoading ? <Loader /> :
        <>
          <div className="mb-8">
            <Input size='sm' type="text" label="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          <div className="gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
            {filteredProducts.map((product) => (
              <div key={product.id} className="wrapperCard">
                <div className="">
                  <Link to={`/productDetails/${product.id}/${product.category._id}`}>
                    <div className="topCard">
                      <img src={product.imageCover} alt={product.title} className='w-full' />
                    </div>
                  </Link>
                  <div className="cardBody p-4">
                    <h3 className='text-xl font-medium text-orange-500'>
                      {product.category.name}
                    </h3>
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <h4 className='text-xl font-medium'>{(product.title).split(" ").slice(0, 2).join(" ")}</h4>
                        <div className="flex justify-between text-xl font-medium">
                          <p>{product.price} EGP</p>
                          <p>{product.ratingsAverage}<i className="fa-solid fa-star text-yellow-300"></i></p>
                        </div>
                      </div>
                      <div className="border-1 border-orange-500 p-2 flex justify-center items-center ms-2 cursor-pointer cart">
                        <i onClick={() => addToCart(product.id)} className="fa-solid fa-cart-plus fa-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="insideCard">
                  <div onClick={() => { toggleWishlistItem(product) }} className="iconCard cursor-pointer">
                    {wishListItems.includes(product.id) ? <i className="fa-solid fa-heart text-blue-500"></i> : <i className="fa-regular fa-heart text-xl text-blue-500"></i>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
}