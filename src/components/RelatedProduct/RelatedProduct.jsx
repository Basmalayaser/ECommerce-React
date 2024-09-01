
import React, { useContext, useEffect, useState } from 'react';
import styles from './RelatedProduct.module.css';
import { ProductContext } from './../../Context/RelatedProductContext';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cartcontext';
import { WishListContext } from '../../Context/WishListContext';

export default function RelatedProduct() {
  const [relatedData, setRelatedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { relatedProduct } = useContext(ProductContext);
  let {addProductToCart}=useContext(CartContext)
  let{ addProductToWishlist,wishListItems,removeProductFromWishlist,getAllProductFromWishlist} =useContext(WishListContext)

  // Function to fetch related products
  async function getRelatedProduct() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const related = response?.data?.data;
      // Filter products based on the selected category
      const filteredRelated = related.filter(product => product.category._id === relatedProduct);
      setRelatedData(filteredRelated);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getRelatedProduct();
  }, [relatedProduct]); 

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

async function getWishList(){
await getAllProductFromWishlist()
}

useEffect(()=>{
getWishList()
},[])

  return (
    <>
     <div className="pt-5">
    {errorMessage?<div className="text-center bg-red-400 text-white p-40">{errorMessage}</div>:""}
    {isLoading?<Loader/>:relatedData.length==0?<div className="container mx-auto h-80 text-xl flex justify-center items-center text-orange-500">No products available now<i class="fa-regular fa-face-frown ps-3"></i></div>:
    <div className="gap-2 grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  ">
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
    
    </div>
    </>
  );
}
