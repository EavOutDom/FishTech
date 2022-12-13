import Layout from '../components/Layout'
import Loader from '../components/Loader'
import ShopContextProvider from '../store/ShopContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ShopContextProvider>
    <Loader />
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </ShopContextProvider>
}

export default MyApp
