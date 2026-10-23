import React from 'react'

import HomeNav from '../components/home/HomeNav'
import RoleSelection from '../components/home/RoleSelection'
import PlotCard from '../components/cards/PlotCard'
import PlotSection from '../components/sections/PlotSection'
import ChatbotButton from '../components/chat/ChatButton'
const Home = () => {
  return (
    <div>

        
        <HomeNav></HomeNav>

        <ChatbotButton></ChatbotButton>
        <RoleSelection></RoleSelection>

        <PlotSection></PlotSection>

      
    </div>
  )
}

export default Home
