import Layout from '../components/Layout'
import ShopContextProvider from '../store/ShopContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ShopContextProvider>
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </ShopContextProvider>
}

export default MyApp
