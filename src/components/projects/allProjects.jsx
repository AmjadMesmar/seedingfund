import React, { useState, useEffect } from 'react';
import './allProjects.css'
import { useHistory } from 'react-router';
import axios from 'axios';

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
    const [results2, reload2, loading2, error2] = useAjax();


    const history = useHistory();


    const getAllProjects = () => {
        (async () => {
            const token = await getToken();
            reload(CREAT_GET_PROJECT_URL, 'get', null, token, null)
        })();
    };

    const changeProjectStatus = (projectid, status) => {
        (async () => {
            const token = await getToken();
            reload2(`${GET_UPDATE_DELETE_PROJECTS_URL}/${projectid}`, 'put', { project_status: status }, token);
        })();
    };

    const deleteProject = (projectid) => {
        (async () => {
            const token = await getToken();
            // reload3(`${GET_UPDATE_DELETE_PROJECTS_URL}/${projectid}`, 'delete', null, token);
            axios.delete(`${GET_UPDATE_DELETE_PROJECTS_URL}/${projectid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(data => {
            console.log("🚀 ~ file: allProjects.jsx ~ line 66 ~ data", data);
            window.location.reload();
            }).catch(err => console.log(err));
        })();
    };

    useEffect(() => {
        if (results) {
            setAllProjects(results.data.allProjects);
            console.log("🚀 ~ file: home.jsx ~ line 50 ~ useEffect ~ results", results.data.allProjects)
        }
    }, [results]);

    useEffect(() => {
        if (results2) {
            console.log("🚀 ~ file: allProjects.jsx ~ line 80 ~ useEffect ~ results2", results2)
            window.location.reload();
        }
    }, [results2]);

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
                                    <option name="PENDING">PENDING</option>
                                    <option name="ACCEPTED">ACCEPTED</option>
                                    <option name="REJECTED">REJECTED</option>
                                </select></td>
                                <td><MaterialButton type="submit" onClick={() => {deleteProject(ele.id)}}>X</MaterialButton></td>
                            </tr>)
                    }) : null
                }
            </table>
        </React.Fragment>
    )
}

export default AllProjects;
