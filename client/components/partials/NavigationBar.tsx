import React from "react";
import { Navbar, NavItem } from "react-materialize";
export default () => {
    return (
        <Navbar className="teal lighten-1">
            <div className="container">
                <NavItem href="/register">Register</NavItem>
            </div>
        </Navbar>
    );
};
