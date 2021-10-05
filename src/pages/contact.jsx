import React from 'react';
import './contact.css'
import MapIcon from '@mui/icons-material/Map';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DraftsIcon from '@mui/icons-material/Drafts';





const Contact = () => {


    return (

        <React.Fragment>
            <h1>CONTACT US</h1>
            <div id="contactContainer">
                <div>
                    <MapIcon className="icons"/> 2 Queen Street, USA
                </div>
                <div>
                    <LocalPhoneIcon className="icons"/> 888 666 000
                </div>
                <div>
                    <DraftsIcon className="icons"/> info@example.com
                </div>
            </div>

        </React.Fragment>
    )
}

export default Contact;
