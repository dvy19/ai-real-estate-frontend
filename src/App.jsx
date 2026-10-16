import {BrowserRouter , Routes, Route} from 'react-router-dom'

import Home from "./pages/Home"
import CustomerHome from "./pages/customer/CustomerHome"

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/customer-home' element={<CustomerHome/>}></Route>
      </Routes>
    
    </BrowserRouter>

    



    
  )

}

export default App