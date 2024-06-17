import React from "react";
import { Link } from "react-router-dom";
import  ReactStars  from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size: window.innerWidth <600 ? 20:22,
    value: product.ratings,
    isHalf: true,
  };
  return (
    
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <Link className=""  to={`/product/${product._id}`}>
<div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
<img className="object-cover" src={product.images[0].url} alt="{product.name}" />
<span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-sm font-medium text-white">10% OFF</span>
</div>
<div className="mt-4 px-5 pb-5">

  <h5 className="text-xl tracking-tight font-bold text-slate-900">{product.name}</h5>

<div className="mt-2 mb-5 flex items-center justify-between">
  <p>
    <span className="text-2xl font-bold text-red-700">{`₹${product.price}`}</span>
    <span className="text-sm text-slate-900 line-through">{`₹${product.price+(product.price*0.1)}`}</span>
  </p>
  <div className="flex items-center">
    <ReactStars {...options} />
    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.ratings}</span>
  </div>
</div>
</div>

</Link>
</div>

  );
};

export default ProductCard;

//
