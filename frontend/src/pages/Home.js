import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticleCardProduct from '../components/VerticleCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods"} />
      <HorizontalCardProduct category={"watches"} heading={"Best Smart Watches with Advanced Features"} />
      
      <VerticleCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticleCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticleCardProduct category={"telivisions"} heading={"Top Branded TVs with Smart Features"} />
      <VerticleCardProduct category={"camera"} heading={"Photography beyond imagination"} />
      <VerticleCardProduct category={"earphones"} heading={"Earphones- A new bond with music"} />
      <VerticleCardProduct category={"speakers"} heading={"Speakers with smart features"} />
      <VerticleCardProduct category={"refrigerator"} heading={"Top Branded Refrigerators"} />
      <VerticleCardProduct category={"printers"} heading={"Top Printers"} />
      <VerticleCardProduct category={"trimmers"} heading={"Trimmers"} />
      <VerticleCardProduct category={"processors"} heading={"Latest Processors"} />
    </div>
  )
}

export default Home
