import {BrowserRouter , Routes, Route} from 'react-router-dom'

import Home from "./pages/Home"
import CustomerHome from "./pages/customer/CustomerHome"
import AddPlot from './pages/broker/AddPlot'
import BrokerHome from './pages/broker/BrokerHome'

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/customer-home' element={<CustomerHome/>}></Route>
        <Route path='/add-plot' element={<AddPlot/>}> </Route>

        <Route path='/broker-home' element={<BrokerHome/>}></Route>
      </Routes>
    
    </BrowserRouter>

    



    
  )

}

export default App