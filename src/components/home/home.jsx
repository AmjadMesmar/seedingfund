import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';


import './home.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import useAjax from '../../hooks/useAjax';
import Loader from '../loader/loader';
import { CREAT_GET_PROJECT_URL } from '../../urls';
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
    const [projectSector, setProjectSector] = useState('Business');
    const [results, reload, loading, error, setError] = useAjax();
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

    useEffect(() => {
        if (results) {
            console.log("🚀 ~ file: home.jsx ~ line 50 ~ useEffect ~ results", results)
            window.location.reload();
            history.push('/home');
        }
    }, [results]);

    return (
        <React.Fragment>
            <div id="createProjectForm">
            <h3>Create a project</h3>
                <form>
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
                        fullWidth
                        maxlength="500"
                        cols="10"
                        rows="4"
                    />
                    <select 
                        onChange={(e) => setProjectSector(e.target.value)}
                        required
                        name="project_sector"
                        label="project_sector"
                        placeholder="Sector"
                        fullWidth
                        >
                        <option selected="selected" name="Busniness">Busniness</option>
                        <option name="Education">Education</option>
                        <option name="Personal">Personal</option>
                        <option name="Helping others"> Helping others</option>
                        <option name="Supporting">Supporting</option>
                        <option name="Donation">Donation</option>
                    </select>
                    <MaterialButton onClick={onCreateProject} className='loginButton'>
                        {loading ? <Loader /> : 'Create Project'}
                    </MaterialButton>
                </form>
            </div>
        </React.Fragment>
    )

}

export default Home;