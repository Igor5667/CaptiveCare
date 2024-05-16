import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link, NavLink } from 'react-router-dom'

//pages
import Login from './Pages/Login/Login'
import GeneralInfo from './Pages/GeneralInfo/GeneralInfo'
import DetailInfo from './Pages/DetailInfo/DetailInfo'


function App() {
  const [isLogin, setIsLogin] = useState(false)
  
  const switchPages = () => {
    setIsLogin(!isLogin)
  }
  return (
    <>
    {isLogin ? <Login switchPages={switchPages}/>:<>

    <div className="row m-0">
        <nav className="col-2 py-4">
            <li className='navigation h5'>Captive<span id='header-little-space'> </span>Care</li>
            <li className='navigation'><Link className='link' to="/">General Info</Link></li>
            <li className='navigation'><NavLink className='link' to="/detail">Detail Info</NavLink></li>
            <li className='navigation' onClick={switchPages}>log out</li>
        </nav>
        <div className="col vh-100 p-5 "  id='content'>
          <Routes>
            <Route index element={<GeneralInfo/>}/>
            <Route path='/detail' element={<DetailInfo/>}/>
          </Routes>
        </div>
    </div>

    </>}
    </>
  )
}

export default App


