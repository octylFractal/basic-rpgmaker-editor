import React, {useState} from "react";
import {Navbar} from "react-bulma-components";
import logo from "../img/logo.png";

const AppNavbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    return <Navbar role="navigation" aria-label="main navigation" active={open}>
        <Navbar.Brand>
            <Navbar.Item href="/">
                <img src={logo} alt="RPG"/>
            </Navbar.Item>
            <Navbar.Burger
                onClick={(): void => setOpen(x => !x)}
                aria-label="menu"
                aria-expanded={open}
            />
        </Navbar.Brand>
        <Navbar.Menu>
            <Navbar.Container align="left">
                <Navbar.Item renderAs="span" className="is-size-4 font-family-cabin-sketch">
                    Basic RPGMaker Save Editor
                </Navbar.Item>
            </Navbar.Container>
        </Navbar.Menu>
    </Navbar>;
};
export default AppNavbar;
