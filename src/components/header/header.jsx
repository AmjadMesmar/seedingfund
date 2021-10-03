import React, { useState, useEffect } from 'react';

import './header.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { getIfAdmin,getToken, signout } from '../../helpers'
import {GET_USER_URL} from '../../urls'
import useAjax from '../../hooks/useAjax';


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

    const [adminButton, setAdminButton] = useState(false);
    const [token, setToken] = useState();
    const [results, reload, loading, error] = useAjax();

    getToken().then((results) => setToken(results));


    function showAllProjectsButton(token) {

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
            const isAdmin = await getIfAdmin();
            console.log("🚀 ~ file: header.jsx ~ line 50 ~ isAdmin", isAdmin)
             console.log("🚀 ~ file: header.jsx ~ line 51 ~ results", results)
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
