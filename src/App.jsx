
import './App.css'
import Restaurant from './Components/Restaurant'
import Home from './Components/Home'
import {BrowserRouter,Routes, Route} from "react-router"
import RestaurantMenu from './Components/RestaurantMenu'
import SearchFood from './Components/SearchFood'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Restaurants" element={<Restaurant></Restaurant>}></Route>
          <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
          <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route>
        </Routes>
      </BrowserRouter>
      
      <div>
        <h1 className='text-4xl'>Jai Shree Ganesh</h1>
      </div>
    </>
  )
}

export default App
