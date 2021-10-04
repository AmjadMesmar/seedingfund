import React, { useState, useEffect } from 'react';

import './header.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { getIfAdmin,getToken, signout } from '../../helpers'
import {GET_USER_URL} from '../../urls'
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

    const [adminButton, setAdminButton] = useState();
    const [token, setToken] = useState();
    const [results, reload, loading, error] = useAjax();



    function showAllProjectsButton() {

        let AdminButtonElement = document.getElementById('AdminButton');

        if (adminButton) {
            AdminButtonElement.style.display = "flex";
            setAdminButton(true);
        }
        else {
            AdminButtonElement.style.display = "none";
            setAdminButton(false);
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
                setAdminButton(results.data.user[0].is_admin)
                console.log(results.data.user[0].is_admin);
                showAllProjectsButton();
            }).catch(error => {console.log (error)});
            console.log("🚀 ~ file: header.jsx ~ line 60 ~ adminButton", adminButton)
            console.log("🚀 ~ file: header.jsx ~ line 48 ~ token", token)
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
                <img id="logo" src={"../../images/large_seedingfund-01.png"} alt={"alt"}/>
                </div>
                <div id="headerItemsContainer">
                    <MaterialButton id="AdminButton">
                        All Projects
                    </MaterialButton>
                    <MaterialButton>
                        Your Projects
                    </MaterialButton>
                    <MaterialButton>
                        Contact
                    </MaterialButton>
                    <MaterialButton onClick={signout}>
                        Logout
                    </MaterialButton>

                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;
