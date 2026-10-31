import React from 'react'

import PlotSection from '../../components/sections/PlotSection'
import CustomerNavbar from '../../components/customer/CustomerNavbar'
import HouseSection from '../../components/sections/HouseSection'
import BrokerSection from '../../components/sections/BrokerSection'
import CustomerFooter from '../../components/customer/CustomerFooter'
import { useNavigate } from 'react-router'

const CustomerHome = () => {

  const navigate=useNavigate()
  return (
    <div>

      <CustomerNavbar></CustomerNavbar>

      <button className='p-4 m-4' onClick={()=>navigate('/my-appointments')}>My Appointments</button>

      <BrokerSection></BrokerSection>

      <PlotSection></PlotSection>
      <HouseSection></HouseSection>


      <CustomerFooter></CustomerFooter>

      
    </div>
  )
}

export default CustomerHome
