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
import IconButton from '@material-ui/core/IconButton';

const HexagonButton = styled(Button)({
    background: "#529471",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.25) 2px 4px 6px 3px",
        backgroundColor: "#529471",
    },
});

const Signin = () => {

    const [ToggleEye, setToggleEye] = useState('https://image.flaticon.com/icons/png/512/4743/4743038.png');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checking, setChecking] = useState(localStorage.getItem(tokenName));

    const [results, reload, loading, error, setError] = useAjax();

    const history = useHistory();

    const onSignin = () => {
        reload(SIGN_IN_URL, 'post', null, null, {
            username: email,
            password: password,
        })
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
                    <img src={"../images/large_seedingfund-01.png"}></img>
                    <form>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            className="loginInput"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            id="loginInput"
                            className="loginInput"
                        />
                        <img id="WelcomepassowrdImage" src={ToggleEye} alt={'alt'} type="checkbox" onClick={showPassword} />
                        <HexagonButton onClick={onSignin} className='loginButton'>
                            {loading ? <Loader /> : 'Sign in'}
                        </HexagonButton>
                    </form>
                </div>
            </body>

        </React.Fragment>
    )
}


export default Signin;