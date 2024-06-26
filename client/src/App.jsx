import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link, NavLink } from 'react-router-dom'

//pages
import Login from './pages/Login/Login'
import GeneralInfo from './pages/GeneralInfo/GeneralInfo'
import DetailInfo from './pages/DetailInfo/DetailInfo'


function App() {
  const [isLogin, setIsLogin] = useState(false)
  
  const switchPages = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
    {isLogin ? <Login switchPages={switchPages}/>:<>
      <div className="row m-0 vh-100">
          <nav className="col-2 py-4">
              <li className='navigation h5'>Captive<span id='header-little-space'> </span>Care</li>
              <li className='navigation'><Link className='link' to="/">General Info</Link></li>
              <li className='navigation'><NavLink className='link' to="/detail">Detail Info</NavLink></li>
              <li className='navigation' onClick={switchPages}>log out</li>
          </nav>
          <div className="col p-4 pb-0"  id='content'>
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