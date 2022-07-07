import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container >
                <Navbar.Brand href="/">Note Zipper</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/">My Notes</Nav.Link>
                    <NavDropdown title="User's Name" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.2">
                        Logout
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header