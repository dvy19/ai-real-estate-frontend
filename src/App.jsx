import {BrowserRouter , Routes, Route} from 'react-router-dom'

import Home from "./pages/Home"
import CustomerHome from "./pages/customer/CustomerHome"
import AddPlot from './pages/broker/AddPlot'
import BrokerHome from './pages/broker/BrokerHome'
import PlotDetails from './components/details/PlotDetails'
import BrokerDetails from './pages/broker/BrokerDetails'
import Chat from './pages/Chat'
import BrokerProfile from './pages/broker/BrokerProfile'
import BrokerChat from './components/sections/BrokerChat'
import BrokerAvailability from './pages/broker/BrokerAvailability'
import Login from './pages/Login'
import Appointment from './pages/broker/Appointment'
import HousePredictCard from './components/cards/HousePredictCard'
import HousePrediction from './pages/HousePrediction'
import MyAppointments from './pages/customer/MyAppointment'

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home/>}></Route>

        <Route path='/login' element={<Login/>}></Route>
        <Route path='/customer-home' element={<CustomerHome/>}></Route>
        <Route path='/add-plot' element={<AddPlot/>}> </Route>

        <Route path='/broker-home' element={<BrokerHome/>}></Route>
        <Route path='/plot-details/:id' element={<PlotDetails/>}></Route>

        <Route path='/broker-details' element={<BrokerDetails/>}></Route>

        <Route path='/chat' element={<Chat/>}></Route>

        <Route path='/broker-profile/:id' element={<BrokerProfile/>}></Route>

        <Route path='/broker-available' element={<BrokerAvailability/>}></Route>

        <Route path='/broker-chat/:id' element={<BrokerChat/>}></Route>

        <Route path='/broker-appoint' element={<Appointment/>}></Route>

        <Route path='/house-prediction' element={<HousePrediction/>}></Route>

        <Route path='/my-appointments' element={<MyAppointments/>}> </Route>
      </Routes>
    
    </BrowserRouter>

    



    
  )

}

export default App