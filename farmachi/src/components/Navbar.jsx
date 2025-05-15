import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/Navbar.css';
import CartWidgetReactIcons from './CartWidgetReactIcons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function NavigationBar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <img src='../farmaCHI_sin_fondo.png' alt='logo' className='logo' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/'>Inicio</Nav.Link>
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to='/category/nuevos'>🆕 Nuevos</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/category/ofertas'>💸 Ofertas</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/category/mas vendidos'>🔥 Más vendidos</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            <NavDropdown
              align="end"
              title={<CartWidgetReactIcons />}
              id="cart-dropdown"
              menuVariant="light"
            >
              {cart.length === 0 ? (
                <NavDropdown.Item disabled>🛒 El carrito está vacío</NavDropdown.Item>
              ) : (
                <>
                  {cart.map((item) => (
                    <NavDropdown.Item
                      key={item.id}
                      onClick={() => navigate('/cart')}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>{item.name}</span>
                      <span className="badge bg-secondary">{item.quantity}</span>
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navigate('/cart')} className="text-center fw-bold text-primary">
                    Ver carrito 🧾
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
