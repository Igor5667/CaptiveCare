import { useState } from 'react'
import axios from 'axios'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//pages
import Login from './Pages/Login/Login'


function App() {
  const [isLogin, setIsLogin] = useState(false)

  const switchPages = () => {

  }

  async function fetchData(){
    console.log("I am fetching")
    try{
      const res = await fetch("http://localhost:8080/prisoners", {method: "GET"})
      if(!res.ok){
        throw new Error(`network response was not ok: ${res.status}`)
      }

      const data = await res.json()
      console.log(data)

    }catch(err){
      console.log("Error: ", err)
    }
  }

  return (
    <>
    {isLogin ? <Login />:null}
    </>
  )
}

export default App


