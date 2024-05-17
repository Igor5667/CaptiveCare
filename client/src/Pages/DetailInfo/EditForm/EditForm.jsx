import React, { useState } from 'react';
import { Button, Form, InputGroup, Stack } from 'react-bootstrap';
import './EditForm.css'

const EditForm = ({setIsForm, currentPrisoner}) => {

    const [prisoner, setPrisoner] = useState(currentPrisoner)

    return (<>
        <div id='shadow'></div>
        <Form id="edit-form" className='position-absolute'>
            <h4>Edit form</h4>
            <InputGroup className='mt-3' size='sm'>
                <InputGroup.Text>ID</InputGroup.Text>
                <InputGroup.Text>{prisoner._id}</InputGroup.Text>
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
                <Button className='mx-auto' variant='success'>Confirm</Button>
                <Button className='mx-auto' onClick={()=>setIsForm(false)}>Back</Button>
            </Stack>
        </Form>
    </>);
};

export default EditForm;