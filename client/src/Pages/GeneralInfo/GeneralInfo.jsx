import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


const GeneralInfo = () => {

    const [prisoners, setPrisoners] = useState([])

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
            <button className="btn btn-success my-2 w-50" onClick={fetchData}>Fetch data</button>
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
                    <td>...{prisoner?._id.substring(20,24)??"Brak"}</td>
                    <td>{prisoner?.name??"Brak"}</td>
                    <td>{prisoner?.age??"Brak"}</td>
                    </tr>
                )
                }
            </tbody>
            </table>
        </>
    );
};

export default GeneralInfo;