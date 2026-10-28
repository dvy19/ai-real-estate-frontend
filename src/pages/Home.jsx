import React from 'react'

import HomeNav from '../components/home/HomeNav'
import RoleSelection from '../components/home/RoleSelection'
import PlotCard from '../components/cards/PlotCard'
import PlotSection from '../components/sections/PlotSection'
import ChatbotButton from '../components/chat/ChatButton'
import HousePredictCard from '../components/cards/HousePredictCard'
const Home = () => {
  return (
    <div>

        
        <HomeNav></HomeNav>

        <div className='flex justify-center items-center m-4'>
        <HousePredictCard></HousePredictCard>
        </div>

        <ChatbotButton></ChatbotButton>
        <RoleSelection></RoleSelection>

        <PlotSection></PlotSection>

      
    </div>
  )
}

export default Home
