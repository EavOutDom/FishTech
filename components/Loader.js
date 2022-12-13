import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../store/ShopContext";

const Loader = () => {
  const router = useRouter();
  const { shopState: { isLoading }, shopDispatch } = useContext(ShopContext);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && shopDispatch({ type: 'SET_LOADING', payload: true });
    const handleComplete = (url) => (url === router.asPath) && setTimeout(() => { shopDispatch({ type: 'SET_LOADING', payload: false }); }, 150);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  });

  return isLoading && (<>
    <div className="fixed inset-0 flex justify-center items-center bg-white/50 transition-opacity">
      <div class="w-20 h-20 rounded-full animate-spin border-y border-solid border-primary-500 border-t-transparent shadow-md"></div>
    </div>
  </>);
}

export default Loader;