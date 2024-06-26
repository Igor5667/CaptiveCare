import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Stack } from 'react-bootstrap';
import './FormsStyle.css'
import axios from 'axios';

//helpers
import { validatePrisoner } from '../utils/helpers';

const EditForm = ({setIsFormEdit, currentPrisoner, fetchData}) => {

    const [prisoner, setPrisoner] = useState(currentPrisoner)
    const [isValid, setIsValid] = useState(false)

    async function updatePrisoner(){
        await axios.put(`http://localhost:8080/prisoners/put`, prisoner)
            .then(()=>{fetchData(); setIsFormEdit(false)})
            .catch(err=>console.log(err))
    }

    useEffect(() => {
        setIsValid(validatePrisoner(prisoner));
    }, [prisoner]);

    return (<>
        <div id='shadow'></div>
        <Form id="edit-form" className='position-absolute'>
            <h4 className='text-center'>Edit form</h4>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text className='ms-auto'>ID</InputGroup.Text>
                <InputGroup.Text className='me-auto'>{prisoner._id}</InputGroup.Text>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control 
                    placeholder={currentPrisoner.name} 
                    value={prisoner.name} 
                    onChange={(e)=>{setPrisoner({...prisoner, name:e.target.value})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Surname</InputGroup.Text>
                <Form.Control 
                    placeholder={currentPrisoner.surname} 
                    value={prisoner.surname} 
                    onChange={(e)=>{setPrisoner({...prisoner, surname:e.target.value})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Age</InputGroup.Text>
                <Form.Control 
                    placeholder={currentPrisoner.age} 
                    value={prisoner.age===0?"":prisoner.age} 
                    onChange={(e)=>{setPrisoner({...prisoner, age:Number(e.target.value)})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Reason</InputGroup.Text>
                <Form.Control 
                    placeholder={currentPrisoner.reason} 
                    value={prisoner.reason} 
                    onChange={(e)=>{setPrisoner({...prisoner, reason:e.target.value})}}/>
            </InputGroup>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>Release date</InputGroup.Text>
                <Form.Control 
                    placeholder={currentPrisoner.release_date} 
                    value={prisoner.release_date} 
                    onChange={(e)=>{setPrisoner({...prisoner, release_date:e.target.value})}}/>
            </InputGroup>
            <Stack direction='horizontal' className='pt-3' gap={5}>
                <Button className='mx-auto' variant='success' disabled={!isValid} onClick={updatePrisoner}>Confirm</Button>
                <Button className='mx-auto' onClick={()=>setIsFormEdit(false)}>Back</Button>
            </Stack>
        </Form>
    </>);
};

export default EditForm;