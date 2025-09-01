
import './App.css'
import Restaurant from './Components/Restaurant'
import Home from './Components/Home'
import {BrowserRouter,Routes, Route} from "react-router"
import RestaurantMenu from './Components/RestaurantMenu'
import SearchFood from './Components/SearchFood'
import SecondaryHome from './Components/SecondaryHome'
import Login from './pages/loginPage'
import { store } from './Store/Stores'
import {Provider} from "react-redux"
import Checkout from './Components/Checkout'
function App() {


  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path='/auth' element ={<Login></Login>}></Route>
          <Route element={<SecondaryHome></SecondaryHome>}>
            <Route path="/Restaurants" element={<Restaurant></Restaurant>}></Route>
            <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
            <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route>
          </Route>  
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>    
        </Routes>
      </BrowserRouter>
      </Provider>
       
    </>
  )
}

export default App
