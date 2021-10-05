/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import './signin.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import useAjax from '../../hooks/useAjax';
import Loader from '../loader/loader';
import { SIGN_IN_URL } from '../../urls';
import { tokenName } from '../../helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MaterialButton = styled(Button)({
    background: "rgb(33, 170, 170)",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.25) 2px 4px 6px 3px",
        backgroundColor: "rgb(71, 71, 191)",
    },
});

const Signin = () => {

    const [ToggleEye, setToggleEye] = useState('https://image.flaticon.com/icons/png/512/4743/4743038.png');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checking, setChecking] = useState(localStorage.getItem(tokenName));
    const [signin, setSignIn] = useState();

    const [results, reload, loading, error, setError] = useAjax();

    const history = useHistory();

    const onSignin = () => {
        axios.post(SIGN_IN_URL,{}, {
            auth:{
                username: email,
                password: password      
            }
          })
          .then(data => {
          localStorage.setItem(tokenName, JSON.stringify(data.data));
          setChecking(false);
          history.push('/home');
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    function showPassword(e) {

        let passwordInput = document.getElementById('loginInput');

        let closedEye = 'https://image.flaticon.com/icons/png/512/4743/4743038.png';
        let openedEye = 'https://image.flaticon.com/icons/png/512/709/709612.png';

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            setToggleEye(openedEye);
        }
        else {
            passwordInput.type = "password";
            setToggleEye(closedEye);
        }
    }

    useEffect(() => {
        if (results) {
            localStorage.setItem(tokenName, JSON.stringify(results.data));
            setChecking(false);
            history.push('/home');
        }
    }, [results]);

    return (
        <React.Fragment>
            <body>
                <div id="body">
                    <img src={"../images/large_seedingfund-01.png"} alt={"alt"}></img>
                    <div id="motoContainer">
                    <h2>You ask it</h2><p>  </p> <h2>we fund it!</h2>
                    </div>
                    <div id="formContainer">
                        <form id="signinForm">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                type="email"
                                className="loginInput"
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                type="password"
                                id="loginInput"
                                className="loginInput"
                            />
                            <img id="passowrdImage" src={ToggleEye} alt={'alt'} type="checkbox" onClick={showPassword} />
                            <MaterialButton onClick={onSignin} className='loginButton'>
                                {loading ? <Loader /> : 'Sign in'}
                            </MaterialButton>
                        </form>
                    </div>
                    <div id="signup">
                        <Link to='/signup'
                        >
                            <MaterialButton>
                                Create a New Account
                            </MaterialButton>
                        </Link>
                    </div>
                </div>
            </body>

        </React.Fragment>
    )
}


export default Signin;