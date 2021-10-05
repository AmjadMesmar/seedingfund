import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';


import './home.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import useAjax from '../../hooks/useAjax';
import Loader from '../loader/loader';
import { CREAT_GET_PROJECT_URL,GET_USER_URL } from '../../urls';
import { tokenName } from '../../helpers';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {getToken} from '../../helpers'




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

const Home = () => {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [userName, setUserName] = useState();
    const [projectSector, setProjectSector] = useState('Business');
    const [results, reload, loading, error, setError] = useAjax();
    const [results2, reload2, loading2, error2, setError2] = useAjax();
    const history = useHistory();


    const onCreateProject = () => {
        (async () => {
            const token = await getToken();
            reload(CREAT_GET_PROJECT_URL, 'post', {
                project_name: projectName,
                project_description: projectDescription,
                project_sector: projectSector,
            }, token, null)
        })();
        };

        const getUserName = () => {
            (async () => {
                const token = await getToken();
                reload2(GET_USER_URL, 'get', null, token, null)
            })();
        };


        useEffect(() => {
            getUserName();
        }, []);
        
        useEffect(() => {
            if (results2) {
                setUserName(results2.data.user[0].user_name);
            }
        }, [results2]);

    useEffect(() => {
        if (results) {
            // window.location.reload();
            let form = document.getElementById('projectForm');
            form.reset();
            history.push('/home');
        }
    }, [results]);

    return (
        <React.Fragment>
            <div id="body">
                <div id='HomeContainer'>
            <h2>{userName ? `Hello ${userName} !`: null}</h2>
            <h2>Create a project</h2>
            </div>
            <div id="createProjectForm">
                <form id="projectForm">
                    <input
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        name="project_name" 
                        placeholder="Project Name"
                        label="Name"
                        autoFocus
                    />
                    <textarea
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                        name="project_description"
                        id="Description"
                        placeholder="Description"
                        label="Description"
                        maxLength="500"
                        cols="10"
                        rows="4"
                    />
                    <select 
                        onChange={(e) => setProjectSector(e.target.value)}
                        required
                        name="project_sector"
                        label="project_sector"
                        placeholder="Sector"
                        >
                        <option name="Busniness">Busniness</option>
                        <option name="Education">Education</option>
                        <option name="Personal">Personal</option>
                        <option name="Helping others"> Helping others</option>
                        <option name="Supporting">Supporting</option>
                        <option name="Donation">Donation</option>
                    </select>
                    <MaterialButton id="createProjectButton" onClick={onCreateProject} className='loginButton'>
                        {loading ? <Loader /> : 'Create Project'}
                    </MaterialButton>
                </form>
            </div>
            </div>
        </React.Fragment>
    )

}

export default Home;