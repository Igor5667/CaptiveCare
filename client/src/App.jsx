import { useState } from 'react'
import axios from 'axios'
import './App.css'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//pages
import Login from './Pages/Login/Login'


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [prisoners, setPrisoners] = useState([])

  const switchPages = () => {
    setIsLogin(false)
  }

  async function fetchData(){
    console.log("I am fetching")
    try{
      const response = await axios.get("http://localhost:8080/prisoners")
      const arr = [...prisoners, response.data]
      setPrisoners(arr)

    }catch(err){
      console.log("Error: ", err)
    }
  }

  return (
    <>
    {isLogin ? <Login switchPages={switchPages}/>:<>

    <div className="row m-0">
      <nav className="col-2 py-4">
        <h5>CaptiveCare</h5>
        <li className='navigation'>general info</li>
        <li className='navigation'>detail info</li>
        <li className='navigation'>log out</li>
      </nav>
      <div className="col vh-100 p-5">
        <button class="btn btn-success" onClick={fetchData}>Fetch data</button>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3525</td>
              <td>Igor</td>
              <td>19</td>
            </tr>
            <tr>
              <td>{prisoners[0]?._id.substring(0,4)??"id"}</td>
              <td>{prisoners[0]?.name??"imie"}</td>
              <td>{prisoners[0]?.age??"wiek"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>}
    </>
  )
}

export default App


