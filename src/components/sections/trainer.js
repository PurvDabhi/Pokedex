import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/trainer.css';
import Formtable from '../sections/formtable';

export default function Trainer() {
    const [users, setUsers] = useState([]);
    const [editSection, setEditSection] = useState(false);
    const [formDataEdit, setFormDataEdit] = useState({
        username: "",
        password: "",
        _id: ""
    });

    const handleEditOnChange = async (e) => {
        const { value, name } = e.target;
        setFormDataEdit((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const getFetchData = async () => {
        axios.get('http://localhost:3001/getUsers')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const deleteUser = async (id) => {
        axios.delete("http://localhost:3001/delete/" + id);
        window.alert("User Deleted successfully");
        getFetchData();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = await axios.put("http://localhost:3001/update", formDataEdit);
        if (data.data.success) {
            getFetchData();
            alert(data.data.message);
            setEditSection(false);
        }
    };

    const handleEdit = (user) => {
        setFormDataEdit(user);
        setEditSection(true);
    };

    // Function to hide or encrypt password
    const hidePassword = (password) => {
        return "*".repeat(password.length); // Replace with your encryption logic if needed
    };

    return (
        <div className='container'>
            {editSection && (
                <Formtable
                    handleSubmit={handleUpdate}
                    handleOnChange={handleEditOnChange}
                    handleClose={() => setEditSection(false)}
                    rest={formDataEdit}
                />
            )}
            <div className='tableContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                UserName
                            </th>
                            <th>
                                Password
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                {/* Displaying hidden or encrypted password */}
                                <td>{hidePassword(user.password)}</td>
                                <td>
                                    <button className='btn btn-edit' onClick={() => handleEdit(user)}>Edit</button>
                                    <button className='btn btn-delete' onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
