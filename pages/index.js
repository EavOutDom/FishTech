import Contact from '../components/Contact';
import Jumbotron from '../components/Jumbotron';
import ProductList from '../components/ProductList';

export default function Home(props) {

  return (
    <>
      <Jumbotron />
      <ProductList {...props} />
      <Contact />
    </>
  )
}
export const products = [
  {
    id: "halfmoon",
    name: "Halfmoon Betta",
    price: 25.00,
    image: 'https://snipcart-next-2021.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fhalfmoon.b3981cd387d9fca65f8bc1abc1f6f9c1.jpg&w=1920&q=75',
    description: "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees.",
    url: '/api/products/halfmoon'
  },
  {
    id: "dragonscale",
    name: "Dragon Scale Betta",
    price: 35,
    image: 'https://snipcart-next-2021.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fdragonscale.a43a97eee791de987f55eda90fab68f6.jpg&w=3840&q=75',
    description: "The dragon scale betta is a rarer and higher maintenance fish. It is named by its thick white scales covering his sides that looks like dragon scale armor.",
    url: '/api/products/dragonscale'
  },
  {
    id: "crowntail",
    name: "Crowntail Betta",
    price: 7.50,
    image: 'https://snipcart-next-2021.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fcrowntail.cd40a6f45ff2bdf13a00719c94e62ea7.jpeg&w=1080&q=75',
    description: "The crowntail is pretty common, but interesting none the less. It's recognized by the shape of its tail that has an appearance of a comb.",
    url: '/api/products/crowntail'
  },
  {
    id: "veiltail",
    name: "Veiltail Betta",
    price: 5.00,
    image: 'https://snipcart-next-2021.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fveiltail.fbaf097b0904500cb68d74f4ead33794.jpg&w=1920&q=75',
    description: "By far the most common betta fish. You can recognize it by its long tail aiming downwards.",
    url: '/api/products/veiltail'
  }
]

export const getStaticProps = async () => {

  return {
    props: {
      products
    }
  }
}
