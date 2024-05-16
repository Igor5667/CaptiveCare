import { useState } from 'react';
import axios from 'axios'
import './DetailInfo.css'
import { Button, Form, InputGroup } from 'react-bootstrap';

const DetailInfo = () => {
    const [prisoners, setPrisoners] = useState([])
    const [isForm, setIsForm] = useState(false)
    const [whichId, setWhichId] = useState("")

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

    const handleEdit = (id) => {
        console.log(`handle edit for: ${id}`)
        setIsForm(true)
        setWhichId(id)
    }
    

    return (
        <>
            {isForm&&<>
            <div id='shadow'></div>
            <Form id="edit-form" className='position-absolute'>
                <h4>Edit form</h4>
                <InputGroup className='mt-3' size='sm'>
                    <InputGroup.Text>ID</InputGroup.Text>
                    <InputGroup.Text >{whichId}</InputGroup.Text>
                </InputGroup>
                <InputGroup className='mt-3' size='sm'>
                    <InputGroup.Text>Name</InputGroup.Text>
                    <Form.Control onChange={(e)=>console.log(e.target.value)}/>
                </InputGroup>
                <InputGroup className='mt-3' size='sm'>
                    <InputGroup.Text>Surname</InputGroup.Text>
                    <Form.Control onChange={(e)=>console.log(e.target.value)}/>
                </InputGroup>
                <InputGroup className='mt-3' size='sm'>
                    <InputGroup.Text>Age</InputGroup.Text>
                    <Form.Control onChange={(e)=>console.log(e.target.value)}/>
                </InputGroup>
                <InputGroup className='mt-3' size='sm'>
                    <InputGroup.Text>Reason</InputGroup.Text>
                    <Form.Control onChange={(e)=>console.log(e.target.value)}/>
                </InputGroup>
                <InputGroup className='mt-3' size='sm'>
                    <InputGroup.Text>Release date</InputGroup.Text>
                    <Form.Control onChange={(e)=>console.log(e.target.value)}/>
                </InputGroup>
                <Button className='mt-3 me-5' variant='success'>Confirm</Button>
                <Button className='mt-3 me-5' variant='danger'>Delete User</Button>
                <Button className='mt-3 ' onClick={()=>setIsForm(false)}>Back</Button>
            </Form>
            </>}
            
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
                            <td><Button size='sm' variant='outline-success' onClick={()=>handleEdit(prisoner._id)}>Edit</Button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </>
    );
};

export default DetailInfo;