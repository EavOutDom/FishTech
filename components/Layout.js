import { TiShoppingCart } from 'react-icons/ti';
import { GiFishCorpse } from 'react-icons/gi';
import Link from 'next/link';
import { useContext } from 'react';
import { ShopContext } from '../store/ShopContext';
import { reducePrice } from '../util/sevice';
import { CiDark, CiLight } from 'react-icons/ci'

const Layout = ({ children, footer = true, header = true }) => {
  const { shopState: { fishList, isDark }, shopDispatch } = useContext(ShopContext);

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
            <span className="ml-1 md:ml-2 font-semibold">{reducePrice(fishList)}</span>
          </a>
        </Link>
      </div>
      <div className='ml-5 flex items-center cursor-pointer gap-1' onClick={() => { shopDispatch({ type: "SET_DARK", payload: !isDark }); }}>
        {isDark ? <><CiDark size="18" /> Light mode</> : <><CiLight size="18" /> Dark mode</>}
      </div>
    </header>}
    <main className="w-full max-w-[1000px] mx-auto p-5 md:px-0">{children}</main>
    {footer && <footer className="dark:bg-white bg-black w-full">
      <div className="w-full max-w-[1000px] mx-auto p-5 md:px-0 flex items-center justify-center text-white dark:text-black">
        <a href="https://github.com/eavoutdom" target='_blank' rel="noreferrer">
          Github
        </a>
      </div>
    </footer>}
  </>;
}

export default Layout;