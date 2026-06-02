import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = ({ theme, onToggleTheme }) => {
    const logoSrc = `${process.env.PUBLIC_URL}/zedbytes_logo.png`;

    return (
        <Navbar expand="lg" sticky="top" className="custom-navbar shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logoSrc} alt="Zedbytes logo" className="header-logo" />
                    ZEDBYTES SOLUTIONS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/services">Services</Nav.Link>
                        <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        <Button onClick={onToggleTheme} variant="outline-light" className="ms-2 theme-toggle-btn">
                            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        </Button>
                        <Button as={Link} to="/contact" variant="info" className="ms-2 quote-btn">
                            Get a Quote
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;