import Link from 'next/link'
import Button from '../components/Button';
import { BsArrowRight, BsFillArrowLeftCircleFill, BsFillPatchMinusFill, BsFillPatchPlusFill } from 'react-icons/bs';
import { HiShoppingBag } from 'react-icons/hi';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../store/ShopContext';
import { BsFillTrashFill } from 'react-icons/bs';
import vm from '../public/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png';
import Image from 'next/image';

const Cart = () => {
  const { shopState: { fishList }, shopDispatch } = useContext(ShopContext);
  const [test, setTest] = useState([]);
  useEffect(() => {
    setTest([...fishList]);
  }, [fishList]);

  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

  const ObjectToArray = (list) => {
    return Object.entries(list).map(entry => {
      return { [entry[0]]: entry[1] };
    })
  }

  const list = groupBy(fishList, 'id');
  const objKey = Object.keys(list);
  let summary = objKey.map(l => list[l]);

  const handleIncrease = value => {
    shopDispatch({ type: 'ADD_TO_CART', payload: [...fishList, value] });
  };

  const handleDecrease = (index) => {
    summary[index].pop();
    let arr1d = [].concat(...summary);
    shopDispatch({ type: 'REMOVED_FROM_CART', payload: arr1d })
  };

  const handleRemoveFishCard = value => {
    shopDispatch({
      type: 'REMOVED_FROM_CART', payload: [...fishList].filter(item => item.id !== value.id)
    });
  };

  return (<>
    <div className='flex items-center justify-between'>
      <Link href={'/'} legacyBehavior>
        <a>
          <Button className='!p-0'>
            <BsFillArrowLeftCircleFill size={35} className='text-primary-500' />
          </Button>
        </a>
      </Link>
      <h5 className='font-bold text-lg'>Cart summary</h5>
      <div className='flex gap-2 items-center text-primary-500'>
        <HiShoppingBag size={35} />
        <span>{fishList.length}</span>
      </div>
    </div>
    <div className='py-10'>
      {summary.length > 0 ? summary.map((item, index) => {
        return <div key={index} className='shadow-md mb-5 p-5 bg-black/5'>
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
            <div className='w-16 text-end'>${item.map(i => i.price).reduce((acc, curr) => acc + curr).toFixed(2)}</div>
          </div>
        </div>
      }) : <p className='text-center text-xl'>No add cart</p>}
      {summary.length > 0 && <div className='mt-10 md:flex justify-between'>
        <span></span>
        <div className='w-full md:w-96'>
          <p>Shipping and taxes will be calculated at checkout.</p>
          <div className='flex justify-between'>
            <p><strong>Total</strong></p>
            <p>${fishList.length > 0 && fishList.map(v => v.price).reduce((acc, curr) => acc + curr).toFixed(2)}</p>
          </div>
          <Button className='flex justify-center items-center gap-5 bg-blue-700 mt-2.5 text-white w-full'>
            <span>Checkout</span>
            <BsArrowRight size={30} />
          </Button>
          <Image src={vm} alt='vm' className='mt-10 w-40 mx-auto' />
        </div>
      </div>}
    </div>
  </>);
};

export const getServerSideProps = () => {
  return {
    props: {
      footer: false,
      header: false
    }
  }
}

export default Cart;
