import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header.js";

const Layout = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    );
};

export default Layout;