import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Stack } from 'react-bootstrap';
import './FormsStyle.css'
import axios from 'axios';

//helpers
import { validatePrisoner } from '../utils/helpers';

const AddForm = ({setIsFormAdd, fetchData}) => {

    const [prisoner, setPrisoner] = useState({})
    const [isValid, setIsValid] = useState(false)


    async function addPrisoner(){
        await axios.post(`http://localhost:8080/prisoners/post`, prisoner)
            .then(()=>{fetchData(); setIsFormAdd(false)})
            .catch(err=>console.log(err))
    }

    useEffect(() => {
        setIsValid(validatePrisoner(prisoner));
    }, [prisoner]);

    return (<>
        <div id='shadow'></div>
        <Form id="edit-form" className='position-absolute'>
            <h4 className='text-center'>Add form</h4>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control  
                    value={prisoner.name} 
                    onChange={(e)=>{setPrisoner({...prisoner, name:e.target.value})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Surname</InputGroup.Text>
                <Form.Control 
                    value={prisoner.surname} 
                    onChange={(e)=>{setPrisoner({...prisoner, surname:e.target.value})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Age</InputGroup.Text>
                <Form.Control 
                    type='number'
                    value={prisoner.age===0?"":prisoner.age} 
                    onChange={(e)=>{setPrisoner({...prisoner, age:Number(e.target.value)})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Reason</InputGroup.Text>
                <Form.Control 
                    value={prisoner.reason} 
                    onChange={(e)=>{setPrisoner({...prisoner, reason:e.target.value})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Release date</InputGroup.Text>
                <Form.Control 
                    value={prisoner.release_date} 
                    onChange={(e)=>{setPrisoner({...prisoner, release_date:e.target.value})}}/>
            </InputGroup>
            <Stack direction='horizontal' className='pt-3' gap={5}>
                <Button className='mx-auto' variant='success' onClick={addPrisoner} disabled={!isValid}>Add Prisoner</Button>
                <Button className='mx-auto' onClick={()=>setIsFormAdd(false)}>Back</Button>
            </Stack>
        </Form>
    </>);
};

export default AddForm;