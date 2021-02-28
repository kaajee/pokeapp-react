import React, {Component} from 'react';
import styled from "@emotion/styled";
import BrangLogo from "../../logo.svg"
import { Navbar, Nav } from 'react-bootstrap';

const Logo = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 0.5em;
`;

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <Navbar expand="md" fixed="top">
                        <Navbar.Brand href="/">
                            <Logo src={BrangLogo} width="30" height="30" alt="Pokedex Mobile"/>
                            PokeApp
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#/">Home</Nav.Link>
                                <Nav.Link href="#/my-pokemon">My Pokemon`</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </React.Fragment>
        );
    }
}

export default Header;
