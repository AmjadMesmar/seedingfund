/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import './signup.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import useAjax from '../../hooks/useAjax';
import Loader from '../loader/loader';
import { SIGNUP_URL } from '../../urls';
import { tokenName } from '../../helpers';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

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

const SignUp = () => {
    const [ToggleEye, setToggleEye] = useState('https://image.flaticon.com/icons/png/512/4743/4743038.png');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [checking, setChecking] = useState(localStorage.getItem(tokenName));
    const [results, reload, loading, error, setError] = useAjax();

    const history = useHistory();

    const onSignup = () => {
        if (isAdmin === 'on') {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false)
        }
        reload(SIGNUP_URL, 'post', {
            user_name: userName,
            password: password,
            email: email,
            is_admin: isAdmin

        }, null, null)

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
                    <div>
                        <div id="signUpContainer">
                            <h2>SIGN</h2><p>  </p> <h2>UP</h2>
                        </div>
                        <form id="SignUpForm">
                            <input
                                onChange={(e) => setUserName(e.target.value)}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                placeholder="Username"
                                required
                                label="User name"
                                autoFocus
                            />
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                id="email"
                                placeholder="Email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                                id="loginInput"
                                autoComplete="current-password"
                            />
                            <img id="passowrdImage" src={ToggleEye} alt={'alt'} type="checkbox" onClick={showPassword} />
                            <label>Admin User?</label>
                            <input
                                onChange={(e) => setIsAdmin(e.target.value)}
                                name="password"
                                placeholder="Password"
                                label="is_admin"
                                type="checkbox"
                                id="is_admin"
                            />
                            <MaterialButton onClick={onSignup} className='loginButton'>
                                {loading ? <Loader /> : 'Sign Up'}
                            </MaterialButton>
                        </form>
                    </div>
                    <div id="signup">
                        <Link to='/'
                        >
                            <MaterialButton>
                                Home page
                            </MaterialButton>
                        </Link>
                    </div>
                </div>
            </body>

        </React.Fragment>
    )
}


export default SignUp;