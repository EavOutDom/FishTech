import { TiShoppingCart } from 'react-icons/ti';
import { GiFishCorpse } from 'react-icons/gi';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { ShopContext } from '../store/ShopContext';

const Layout = ({ children, footer = true, header = true }) => {
  const { shopState: { fishList } } = useContext(ShopContext);

  return <>
    {header && <header className="w-full max-w-[1000px] mx-auto p-5 md:px-0 flex items-center sticky top-0 left-0 backdrop-blur-md">
      <Link href='/' legacyBehavior>
        <a className="h-9 flex justify-between items-center">
          <GiFishCorpse size={34} className='text-primary-500' />
          <h1 className="text-xl md:text-2xl ml-2.5 md:ml-5 font-bold">FistTech</h1>
        </a>
      </Link>
      <div className='ml-auto'>
        <Link href='/cart' legacyBehavior>
          <a className="flex items-center justify-center text-primary-500" style={{ textDecoration: "none" }}>
            <TiShoppingCart size={34} />
            <span className="ml-1 md:ml-2 font-semibold">{fishList.length > 0 && '$' + fishList.map(v => v.price).reduce((acc, curr) => acc + curr).toFixed(2)}</span>
          </a>
        </Link>
      </div>
    </header>}
    <main className="w-full max-w-[1000px] mx-auto p-5 md:px-0">{children}</main>
    {footer && <footer className=" bg-black w-full">
      <div className="w-full max-w-[1000px] mx-auto p-5 md:px-0 flex items-center justify-center text-white">
        <a href="https://github.com/eavoutdom" target='_blank' rel="noreferrer">
          Github
        </a>
      </div>
    </footer>}
  </>;
}

export default Layout;