import React from 'react'
import { useNavigate } from 'react-router'

const BrokerHome = () => {

    const navigate=useNavigate()
  return (
    <div>
      <button onClick={()=>navigate('/add-plot')}>add Plot</button>

      <br /><br /><br /><br />

      <button onClick={()=>navigate('/broker-available')}>Add schedule</button>

    </div>
  )
}

export default BrokerHome
