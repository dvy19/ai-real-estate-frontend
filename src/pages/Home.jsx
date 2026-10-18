import React from 'react'

import HomeNav from '../components/home/HomeNav'
import RoleSelection from '../components/home/RoleSelection'
import PlotCard from '../components/cards/PlotCard'
import PlotSection from '../components/sections/PlotSection'
const Home = () => {
  return (
    <div>

        
        <HomeNav></HomeNav>
        <RoleSelection></RoleSelection>

        <PlotSection></PlotSection>

      
    </div>
  )
}

export default Home
