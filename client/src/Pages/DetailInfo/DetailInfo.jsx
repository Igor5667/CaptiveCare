import { useState } from 'react';
import axios from 'axios'
import './DetailInfo.css'
import { Button } from 'react-bootstrap';

//components
import EditForm from './EditForm/EditForm';

const DetailInfo = () => {
    const [prisoners, setPrisoners] = useState([])
    const [isForm, setIsForm] = useState(false)
    const [currentPrisoner, setCurrentPrisoner] = useState({})

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

    const handleEdit = (prisoner) => {
        setIsForm(true)
        setCurrentPrisoner(prisoner)
    }
    

    return (
        <>
            {isForm&&<EditForm currentPrisoner={currentPrisoner} setIsForm={setIsForm}/>}
            
            <button className="btn btn-success my-2 w-50" onClick={fetchData}>Fetch data</button>
            <table className="table table-striped ">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Age</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Release date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    prisoners.map(prisoner=>
                        <tr key={prisoner._id}>
                            <td>{prisoner?._id.substring(20,24)??"Brak"}</td>
                            <td>{prisoner?.name??"Brak"}</td>
                            <td>{prisoner?.surname??"Brak"}</td>
                            <td>{prisoner?.age??"Brak"}</td>
                            <td>{prisoner?.reason??"Brak"}</td>
                            <td>{prisoner?.release_date??"Brak"}</td>
                            <td><Button size='sm' variant='outline-success' onClick={()=>handleEdit(prisoner)}>Edit</Button></td>
                            <td><Button size='sm' variant='outline-danger'>Delete</Button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </>
    );
};

export default DetailInfo;