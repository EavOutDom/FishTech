import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../store/ShopContext";
import Button from "./Button";

const ProductList = (props) => {
  const { products } = props;
  const { shopState: { fishList }, shopDispatch } = useContext(ShopContext);

  return (<div>
    {products.map((data, index) => (<div key={index} className="w-full flex py-10 flex-col md:flex-row-reverse md:even:flex-row">
      <div className="h-full md:w-2/4">
        <img src={data.image} alt={data.name} className='object-contain w-full h-full' />
      </div>
      <div className="md:w-2/4 lg:px-20 px-2.5">
        <h1 className="font-bold md:text-3xl text-xl">{data.name}</h1>
        <p className="pt-5 pb-10">{data.description}</p>
        <div className="flex gap-5 items-center">
          <p className="text-2xl font-medium">${data.price.toFixed(2)}</p>
          <Button className='bg-primary-500 text-white' onClick={() => shopDispatch({ type: 'SET_CART', payload: [...fishList, data] })}>Add to card</Button>
        </div>
      </div>
    </div>))}
  </div>);
}

export default ProductList;