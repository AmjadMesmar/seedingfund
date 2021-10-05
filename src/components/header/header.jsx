import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './header.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { getIfAdmin, getToken, signout } from '../../helpers'
import { GET_USER_URL } from '../../urls'
import useAjax from '../../hooks/useAjax';
import Axios from 'axios';


const MaterialButton = styled(Button)({
    border: 0,
    borderRadius: 3,
    color: "gray",
    height: 48,
    padding: "0 30px",
    "&:hover": {
        backgroundColor: "#white",
        color: "rgb(33, 170, 170)",
    },
});

const Header = () => {

    const [token, setToken] = useState();
    const [results, reload, loading, error] = useAjax();



    function showAllProjectsButton(boolCheck) {

        let AdminButtonElement = document.getElementById('AdminButton');


        if (boolCheck === true) {
        }
        else {
            AdminButtonElement.style.display = "none";
        }
    }

    const checkAdmin = () => {
        (async () => {
            const token = await getToken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            Axios.get(
                `${GET_USER_URL}`,
                config
            ).then(results => {
                let adminValue = results.data.user[0].is_admin;
                showAllProjectsButton(adminValue);
            }).catch(error => { console.log(error) });
        })();
    };





    useEffect(() => {
        (async () => {
            checkAdmin();
        })();
    }, []);

    return (
        <React.Fragment>
            <header>
                <div id="logoContainer">
                    <img id="logo" src={"../../images/large_seedingfund-01.png"} alt={"alt"} />
                </div>
                <div id="headerItemsContainer">
                    <Link to='/home'>
                        <MaterialButton>
                            Home
                        </MaterialButton>
                    </Link>
                    <Link to='/projects/all'>
                        <MaterialButton id="AdminButton">
                            All Projects
                        </MaterialButton>
                    </Link>
                    <Link to='/projects/user'>
                        <MaterialButton>
                            Your Projects
                        </MaterialButton>
                    </Link>
                    <Link to='/projects/all'>
                        <MaterialButton>
                            Contact
                        </MaterialButton>
                    </Link>
                    <MaterialButton onClick={signout}>
                        Logout
                    </MaterialButton>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;
