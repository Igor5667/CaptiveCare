import React, { useState } from 'react';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, Col, Row, Alert} from 'react-bootstrap'


const Login = ({switchPages}) => {
    const [loginInformations, setLoginInformations] = useState({login: "", password: ""})
    const [showInvalidAlert, setShowIvalidAlert] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        if (loginInformations.login === "admin@hejka.com" &&
            loginInformations.password === "kocham paczki") {
            switchPages()
        }
        else{
            setShowIvalidAlert(true)
            setTimeout(()=>{
                setShowIvalidAlert(false)
            }, 3000)
        }
    }

    return (
        <div id="main-container" className='container-fluid text-center'>
            {showInvalidAlert&&<Alert variant='danger' id='invalid-alert'>Invalid data inputed</Alert>}
            <Row className='row' sx={2}>
                <Col id='image-frame' sx={12} sm={5} className='vh-20 vh-sm-100 p-0'>
                    <p id='welcome-text'>WELCOME<br />BACK</p>
                </Col>
                <Col id='login-frame' className='vh-100'>
                    <div id='text-login'>Login</div>
                    <Form id='form-container'>
                        <Form.Control type="email" placeholder="e-mail" className="mb-3" onChange={(e)=>{
                            setLoginInformations({...loginInformations, login: e.target.value})
                        }}/>
                        <Form.Control type="password" placeholder="password" className="mb-3" onChange={(e)=>{
                            setLoginInformations({...loginInformations, password: e.target.value})
                        }}/>
                        <Button 
                            type='submit'
                            size='sm' 
                            variant='outline-dark' 
                            disabled={!loginInformations.login || !loginInformations.password}
                            onClick={(e)=>{handleLogin(e)}}
                            >
                            Login
                        </Button>
                        
                    </Form>
                    <Alert id='login-data-alert'>
                        Login: admin@hejka.com <br />
                        Password: kocham paczki
                    </Alert>
                </Col>
            </Row>
        </div> 
    );
};

export default Login;