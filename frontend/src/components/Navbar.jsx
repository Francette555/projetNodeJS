/*import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/ajout">➕ Ajout</Link>
        <Link to="/liste">📋 Liste des Employés</Link>
        <Link to="/bilan">📊 Bilan & Graphique</Link>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Déconnexion
      </button>
    </nav>
  );
}

export default Navbar;
*/
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { HouseDoorFill, PersonPlusFill, ListCheck, BarChartFill, BoxArrowRight, Building } from 'react-bootstrap-icons';
import '../App.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <BsNavbar expand="lg" className="mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #02061E 0%, #0405BF 100%)' }}>
      <Container>
        <BsNavbar.Brand as={Link} to="/accueil" className="fw-bold text-white">
          <Building className="me-2" /> Gestion Employés 
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/accueil" className="text-white">
              <HouseDoorFill className="me-1" /> Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/ajout" className="text-white">
              <PersonPlusFill className="me-1" /> Ajout
            </Nav.Link>
            <Nav.Link as={Link} to="/liste" className="text-white">
              <ListCheck className="me-1" /> Liste
            </Nav.Link>
            <Nav.Link as={Link} to="/bilan" className="text-white">
              <BarChartFill className="me-1" /> Bilan
            </Nav.Link>
          </Nav>
          <Button 
            variant="outline-light" 
            onClick={handleLogout} 
            size="sm"
            style={{ borderColor: '#0671B6', color: '#0671B6' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0671B6';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#0671B6';
            }}
          >
            <BoxArrowRight className="me-1" /> Déconnexion
          </Button>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;