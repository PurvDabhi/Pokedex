import React from 'react';
import "../../styles/trainer.css";
import { MdClose } from 'react-icons/md';

const Formtable = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleClose}><MdClose/></div>
                <label htmlFor="name">Username: </label>
                <input type="text" id="username" name="username" onChange={handleOnChange} value={rest.username}/>
                <br/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" onChange={handleOnChange} value={rest.password}/>
                <button className="btn">Submit</button>
            </form>
        </div>
    );
};

export default Formtable;
