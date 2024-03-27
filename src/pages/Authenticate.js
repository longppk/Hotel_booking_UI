import React, { useState } from 'react';
import styled from 'styled-components';
import SignIn from '../components/Form/SignIn';
import SignUp from '../components/Form/SignUp';
const AuthenticateStyles = styled.div`
    background-color: #fff;
    width: 100%;
    height: 580px;
    margin: auto;
    padding-top: 50px;
    .container-title{
        display: flex;
        width: 400px;
        margin: auto;
        justify-content: space-around;
        cursor: pointer;
        .active{
            color: red;
            border-bottom: 2px solid red;
        }
        h3{
            padding: 0 15px;
        }
    }
`
const Authenticate = () => {
    const [show, setShow] = useState(true)
    const handleSignIn = () => {
        setShow(true)
    }
    const handleSignUp = () => {
        setShow(false)
    }
    return (
        <AuthenticateStyles>
            <div className='container-title'>
                <h3 className={show ? 'active' : ''} onClick={handleSignIn}>Sign In</h3>
                <h3 className={!show ? 'active' : ''} onClick={handleSignUp}>Sign Up</h3>
            </div>
            <div>
                {show && <SignIn></SignIn>}
                {!show && <SignUp></SignUp>}
            </div>
        </AuthenticateStyles>
    );
};

export default Authenticate;