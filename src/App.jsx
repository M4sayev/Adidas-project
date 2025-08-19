import React from 'react'
import Home from './pages/User/Home'
import Teaser from './pages/User/Teaser'
import ProductShowcase from './pages/User/ProductShowcase'
import Prime from './pages/User/Prime'
import PopularRightNow from './pages/User/PopularRightNow'
import CategoryLinks from './pages/User/CategoryLinks'
import AsFooter from './pages/User/AsFooter'
import Information from './pages/User/Information'
import Banner from './pages/User/Banner'




const App = () => {
  return (
    <div>
    
     <Home/>
     <Teaser/>
     <ProductShowcase/>
     <Prime/>
     <PopularRightNow/>
     <CategoryLinks/>
     <Information/>
     <Banner/>
     <AsFooter/>
     
    </div>
  )
}

export default App