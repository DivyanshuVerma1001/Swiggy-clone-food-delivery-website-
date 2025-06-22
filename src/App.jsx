import Header from './Components/Header'
import FoodOption from './Components/FoodOptions'
import './App.css'
import Restaurant from './Components/Restaurant'
import Home from './Components/Home'
import {BrowserRouter,Routes, Route} from "react-router"
import RestaurantMenu from './Components/RestaurantMenu'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Restaurants" element={<Restaurant></Restaurant>}></Route>
          <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
        </Routes>
      </BrowserRouter>
      
      <div>
        <h1 className='text-4xl'>Jai Shree Ganesh</h1>
      </div>
    </>
  )
}

export default App
