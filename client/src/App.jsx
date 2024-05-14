import { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import './App.css'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//pages
import Login from './Pages/Login/Login'


function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [prisoners, setPrisoners] = useState([])

  const switchPages = () => {
    setIsLogin(false)
  }

  async function fetchData(){
    console.log("I am fetching")
    try{
      axios.get("http://localhost:8080/prisoners").then((response)=>{
        setPrisoners(response.data)
      })
    }catch(err){
      console.log("Error: ", err)
    }
  }

  return (
    <>
    {isLogin ? <Login switchPages={switchPages}/>:<>

    <div className="row m-0">
      <nav className="col-2 py-4">
        <li className='navigation h5'>Captive<span id='header-little-space'> </span>Care</li>
        <li className='navigation'>general info</li>
        <li className='navigation'>detail info</li>
        <li className='navigation'>log out</li>
      </nav>
      <div className="col vh-100 p-5">
        <button className="btn btn-success" onClick={fetchData}>Fetch data</button>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {
              prisoners.map(prisoner=>
                <tr key={prisoner._id}>
                  <td>{prisoner?._id.substring(20,24)??"Brak"}</td>
                  <td>{prisoner?.name??"Brak"}</td>
                  <td>{prisoner?.age??"Brak"}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
    </>}
    </>
  )
}

export default App


