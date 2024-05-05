import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'


function App() {
  const [user, setUser] = useState({})

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
    <div id="main-container" className='container-fluid text-center'>
      <div className='row'>
        <div id='image-frame' className='col-5 vh-100 bg-primary p-0'>
          <p id='welcome-text'>WELCOME<br />BACK</p>
        </div>
        <div id='login-frame' className='col'>
          <div id='text-login'>Login</div>
          <Form id='form-container'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="login" className="mb-3"/>
              <Form.Control type="password" placeholder="password" />
            </Form.Group>
            <Button variant='outline-dark'>Login</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default App
