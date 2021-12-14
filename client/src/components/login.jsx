import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, FormInput, Button} from "shards-react";

import { authenticate } from '../fetcher'

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    const token = await authenticate({
      username,
      password
    });

    if (token.token === "token123") {
        setToken(token.token)
    } 
  }


  return(
    <>
    <div className='text-center' style={{padding: 100}}>
        <div className='col-md-10 col-md-offset-1 section-title'>
            <h2>Login</h2>
        </div>
    </div>

    <Form style={{ width: '80vw', margin: '0 auto', marginTop: '20px', background: '#f6f6f6' }}>
        <FormGroup style={{ width: '20vw', margin: '0 auto' }}>

            <label style={{ marginTop: '15px' }}>Username</label>
            <FormInput onChange={e => setUserName(e.target.value)} placeholder="username" />

            <label style={{ marginTop: '15px' }}>Password</label>
            <FormInput onChange={e => setPassword(e.target.value)} placeholder="password" />

            <Button style={{ marginTop: '2vh', marginLeft: '7vw', display: 'inline-block' }} onClick={handleSubmit}>Log In</Button>

        </FormGroup>
    </Form>
    </>

  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
