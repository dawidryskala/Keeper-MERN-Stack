import React from "react";
import AddIcon from '@mui/icons-material/Add';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <div className="header">
            <NavLink className="create-note-navlink-button" to="/create">
                Create Note <AddIcon style={{ fontSize: '2.5rem' }} />
            </NavLink>
        </div>
    );
}