import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({})

  async function fetchData(){
    console.log("I am fetching")
    try{
      const res = await fetch("http://localhost:8080/api/users", {method: "GET"})
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
      <button onClick={fetchData}>Click</button>
    </>
  )
}

export default App
