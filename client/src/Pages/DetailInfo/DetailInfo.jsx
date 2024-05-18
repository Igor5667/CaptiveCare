import { useState, useEffect } from 'react';
import axios from 'axios'
import './DetailInfo.css'
import { Button, Stack } from 'react-bootstrap';

//components
import EditForm from '../../components/EditForm';
import AddForm from '../../components/AddForm'

const DetailInfo = () => {
    const [prisoners, setPrisoners] = useState([])
    const [isFormEdit, setIsFormEdit] = useState(false)
    const [isFormAdd, setIsFormAdd] = useState(false)
    const [currentPrisoner, setCurrentPrisoner] = useState({})

    async function fetchData(){
        try{
            await axios.get("http://localhost:8080/prisoners").then((response)=>{
            setPrisoners(response.data)
            })
        }catch(err){
            console.log("Error: ", err)
        }
    }

    async function deletePrisoner(prisoner){
        const confirm = window.confirm(`Are you sure you want to delete prisoner ${prisoner.name}?`)
        if(!confirm){return}
        await axios.delete(`http://localhost:8080/prisoners/delete/${prisoner._id}`)
            .then(fetchData)
            .catch(err=>console.log(err))
    }


    const handleEdit = (prisoner) => {
        setIsFormEdit(true)
        setCurrentPrisoner(prisoner)
    }
    
    useEffect(()=>{ 
        fetchData() 
    }, [])

    return (
        <>
            {isFormEdit&&<EditForm currentPrisoner={currentPrisoner} setIsFormEdit={setIsFormEdit} fetchData={fetchData}/>}
            {isFormAdd&&<AddForm setIsFormAdd={setIsFormAdd} fetchData={fetchData}/>}
            <Stack direction='horizontal' gap={4} className='mb-2'>
                <Button variant='success' className='mx-auto w-25' onClick={()=>setIsFormAdd(true)}>Add Prisoner</Button>
            </Stack>
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
                            <td>...{prisoner?._id.substring(20,24)??"Brak"}</td>
                            <td>{prisoner?.name??"Brak"}</td>
                            <td>{prisoner?.surname??"Brak"}</td>
                            <td>{prisoner?.age??"Brak"}</td>
                            <td>{prisoner?.reason??"Brak"}</td>
                            <td>{prisoner?.release_date??"Brak"}</td>
                            <td><Button size='sm' variant='outline-success' onClick={()=>handleEdit(prisoner)}>Edit</Button></td>
                            <td><Button size='sm' variant='outline-danger' onClick={()=>deletePrisoner(prisoner)}>Delete</Button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </>
    );
};

export default DetailInfo;