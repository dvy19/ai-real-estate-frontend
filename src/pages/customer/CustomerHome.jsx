import React from 'react'

import PlotSection from '../../components/sections/PlotSection'
import CustomerNavbar from '../../components/customer/CustomerNavbar'
import HouseSection from '../../components/sections/HouseSection'
import BrokerSection from '../../components/sections/BrokerSection'
import CustomerFooter from '../../components/customer/CustomerFooter'

const CustomerHome = () => {
  return (
    <div>

      <CustomerNavbar></CustomerNavbar>

      <BrokerSection></BrokerSection>

      <PlotSection></PlotSection>
      <HouseSection></HouseSection>


      <CustomerFooter></CustomerFooter>

      
    </div>
  )
}

export default CustomerHome
