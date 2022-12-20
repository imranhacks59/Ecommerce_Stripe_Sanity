import React, { Fragment } from 'react'
import { Product,FooterBanner,HeroBanner } from '../components'
import { client } from '../lib/client'

const Home = ({products,bannerData}) => {
  return (
    <Fragment>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />  
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {
          products?.map((product)=>
          <Product 
          key={product._id}
          product={product}
          />
          )
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </Fragment>
  )
}
// in react we can fetch using useeffect but in nextjs we will use getServerSideProps
// nextjs will pre-render this page on each request using data returned by getserversideprops
// getServerSideProps only runs on server-side and never runs on the browser
// You should use getServerSideProps only if you need to render a page whose data must be fetched at request time. 

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home