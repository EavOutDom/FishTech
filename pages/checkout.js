import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillPatchMinusFill, BsFillPatchPlusFill, BsFillTrashFill } from "react-icons/bs";
import Button from "../components/Button";
import { ShopContext } from "../store/ShopContext";
import { groupArray, ObjectToArray, reducePrice } from "../util/sevice";
import vm from '../public/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png';
import Drawer from "../components/Drawer";

const Checkout = () => {
  const { shopState: { fishList }, shopDispatch } = useContext(ShopContext);
  const [showDrawer, setShowDrawer] = useState(false);

  const list = groupArray(fishList, 'id');
  let summary = ObjectToArray(list);

  const handleIncrease = value => {
    shopDispatch({ type: 'SET_CART', payload: [...fishList, value] });
  };

  const handleDecrease = (index) => {
    summary[index].pop();
    let arr1d = [].concat(...summary);
    shopDispatch({ type: 'SET_CART', payload: arr1d })
  };

  const handleRemoveFishCard = value => {
    shopDispatch({
      type: 'SET_CART', payload: [...fishList].filter(item => item.id !== value.id)
    });
  };

  return (<div className="min-h-screen">
    <Link href='/cart' legacyBehavior>
      <a>
        <Button className='!p-0'>
          <BsFillArrowLeftCircleFill size={35} className='text-primary-500' />
        </Button>
      </a>
    </Link>
    <div className="py-6 grid grid-cols-10 gap-4 items-start">
      <div className="col-span-10 md:col-span-6 shadow-md p-6 bg-black/5 dark:bg-white/5 relative">
        <div className="absolute top-6 -left-4 rounded-full w-8 h-8 bg-blue-500 text-white flex items-center justify-center">
          <span>1</span>
        </div>
        <h1 className="text-xl">Billing</h1>
        <form className="pt-4">
          <label>Full name</label>
          <input />
          <label>Email</label>
          <input />
          <label>Bill address</label>
          <input />
          <div className="flex gap-5">
            <div>
              <label>Street address</label>
              <input className="w-full" />
            </div>
            <div>
              <label>Apt/Suits</label>
              <input className="w-full" />
            </div>
          </div>
          <label>City</label>
          <input />
          <label>Country</label>
          <select>
            <option>Cambodia</option>
            <option>Thailand</option>
            <option>Vietnam</option>
            <option>Lao</option>
          </select>
          <div className="flex justify-between gap-5">
            <div>
              <label>Province/State</label>
              <input className="w-full" />
            </div>
            <div>
              <label>Postal/ZIP code</label>
              <input className="w-full" />
            </div>
          </div>
          <Button className='bg-blue-700 text-white'>Continue to payment</Button>
        </form>
      </div>
      <div className="shadow-md p-5 bg-black/5 dark:bg-white/5 col-span-10 md:col-span-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl font-semibold" >Order summary</h1>
          <Button className='text-blue-500 underline !p-0' onClick={() => setShowDrawer(true)}>Edit</Button>
        </div>
        <div className="mb-4">
          {summary.map((data, index) => {
            return <div key={index} className='text-sm opacity-70 my-2.5 flex justify-between items-center'>
              <span>{data[0].name}</span>
              <span>&#120;{data.length}</span>
              <span>{reducePrice(data)}</span>
            </div>
          })}
        </div>
        <hr />
        <p className="text-sm mt-6">Shipping and taxes will be calculated at checkout.</p>
        <div className='flex justify-between'>
          <p><strong>Total</strong></p>
          <p>{reducePrice(fishList)}</p>
        </div>
        <div className="mt-2.5">
          <Image src={vm} alt='vm' className='mt-10 w-40 mx-auto' />
        </div>
      </div>
    </div>
    <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} className='py-8 px-4 w-full md:w-2/3 lg:w-1/3'>
      <h1 className="text-xl font-semibold">Order summary</h1>
      <div>
        {summary.length > 0 ? summary.map((item, index) => {
          return <div key={index} className='shadow-md mt-2.5 mb-5 p-5'>
            <div className='flex justify-between'>
              <div className='w-2/6 md:w-1/6'>
                <img src={item[0].image} alt={item[0].name} className='object-contain w-full h-full' />
              </div>
              <div className='font-bold md:text-xl'>
                {item[0].name}
              </div>
              <div className='flex justify-between flex-col items-end'>
                <Button className='bg-red-200 rounded-full !p-2' onClick={() => handleRemoveFishCard(item[0])}>
                  <BsFillTrashFill size={18} className='text-red-700' />
                </Button>
              </div>
            </div>
            <div className='flex items-center mt-10 justify-end'>
              <div className='flex items-center'>
                <Button onClick={() => handleDecrease(index)}>
                  <BsFillPatchMinusFill size={20} className='text-blue-700' />
                </Button>
                <span className='w-24 text-center'>
                  Quantity {item.length}
                </span>
                <Button onClick={() => handleIncrease(item[0])}>
                  <BsFillPatchPlusFill size={20} className='text-blue-700' />
                </Button>
              </div>
              <div className='w-16 text-end'>{reducePrice(item)}</div>
            </div>
          </div>
        }) : <p className='text-center text-xl'>No add cart</p>}
        {summary.length > 0 && <div className='mt-10 md:flex justify-between'>
          <span></span>
          <div className='w-full'>
            <p>Shipping and taxes will be calculated at checkout.</p>
            <div className='flex justify-between'>
              <p><strong>Total</strong></p>
              <p>{reducePrice(fishList)}</p>
            </div>
          </div>
        </div>}
      </div>
    </Drawer>
  </div>);
}

export default Checkout;

export const getServerSideProps = () => {
  return {
    props: {
      header: false,
      footer: false
    }
  }
};