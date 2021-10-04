import React, { useState, useEffect } from 'react';
import './allProjects.css'
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import useAjax from '../../hooks/useAjax';
import Loader from '../loader/loader';
import { CREAT_GET_PROJECT_URL, GET_UPDATE_DELETE_PROJECTS_URL } from '../../urls';
import { tokenName } from '../../helpers';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { getToken } from '../../helpers'




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
const AllProjects = () => {

    const [allProjects, setAllProjects] = useState();
    const [results, reload, loading, error] = useAjax();
    const history = useHistory();




    function showAllProjectsButton(boolCheck) {

        let AdminButtonElement = document.getElementById('AdminButton');


        if (boolCheck === true) {
        }
        else {
            AdminButtonElement.style.display = "none";
        }
    }

    const getAllProjects = () => {
        (async () => {
            const token = await getToken();
            reload(CREAT_GET_PROJECT_URL, 'get', null, token, null)
        })();
    };

    const changeProjectStatus = (projectid,status) => {
    console.log("🚀 ~ file: allProjects.jsx ~ line 60 ~ changeProjectStatus ~ status", status);
    console.log("🚀 ~ file: allProjects.jsx ~ line 60 ~ changeProjectStatus ~ projectid", projectid);
        (async () => {
            const token = await getToken();
            reload(`${GET_UPDATE_DELETE_PROJECTS_URL}/${projectid}`, 'put', { project_status: status }, token);
            history.push('/projects/all');
        })();
    };


    useEffect(() => {
        if (results) {
            setAllProjects(results.data.allProjects);
            console.log("🚀 ~ file: home.jsx ~ line 50 ~ useEffect ~ results", results.data.allProjects)
        }
    }, [results]);
    useEffect(() => {
        if (allProjects) {
            console.log('all projects: ', allProjects);
        }
    }, [allProjects]);

    useEffect(() => {
        (async () => {
            getAllProjects();
        })();
    }, []);

    return (
        <React.Fragment>
            <table id="allProjectsForm">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Sector</th>
                    <th>Status</th>
                    <th>Acc/Rej</th>
                    <th>Delete</th>
                </tr>
                {
                    allProjects ? allProjects.map((ele, idx) => {
                        return (
                            <tr key={ele.id}>
                                <td>{ele.project_name}</td>
                                <td>{ele.project_description}</td>
                                <td>{ele.project_sector}</td>
                                <td>{ele.project_status}</td>
                                <td><select
                                    onChange={(e) => changeProjectStatus(ele.id, e.target.value)}>
                                    <option name="Busniness">PENDING</option>
                                    <option name="Education">ACCEPTED</option>
                                    <option name="Personal">REJECTED</option>
                                </select></td>
                                <td><MaterialButton>X</MaterialButton></td>
                            </tr>)
                    }) : null
                }
            </table>
        </React.Fragment>
    )
}

export default AllProjects;
