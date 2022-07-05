//STEP 1 -- IMPORT REACT
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Navigate } from "react-router-dom";
import axios from 'axios'
import '../App.css';

//STEP 2 -- CREATE FUNCTIONAL COMPONENT
function AdminViewAllUser() {
    let usertp = sessionStorage.getItem('Usertype')
    const [emplist, setEmpList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/use')
            .then(response => {
                console.log(response.data)
                setEmpList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    function viewEmpList() {
        return emplist.map((currentrow, index) => {
            return (
                <tr key={index}>
                    <td>{currentrow.name}</td>
                    <td>{currentrow.email}</td>
                </tr>
            );
        });
    }

    if (usertp == null) {
        return (<Navigate to="/adminlogin" />)
    }
    else {
        return (
            <div className='container'>
                <Navbar />
                <br />
                <h3>ALL EMPLOYEE DETAILS</h3>

                <table className="table table-bordered table-hover" align="center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {viewEmpList()}
                    </tbody>
                </table>
            </div>)
    }
}

//STEP 3 -- EXPORT IT TO USE IT
export default AdminViewAllUser