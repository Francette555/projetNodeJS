/*import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/ajout');
    } catch (err) {
      setError('Échec de l\'authentification. Vérifiez vos identifiants.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>GESTION EMPLOYEE</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { Building, PersonFill, LockFill } from 'react-bootstrap-icons';
import axios from 'axios';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/accueil');
    } catch (err) {
      setError('Échec de l\'authentification. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg border-0 login-card">
              <Card.Header className="text-white text-center py-4 login-header" style={{ background: 'linear-gradient(135deg, #5B11EE 0%, #0405BF 100%)' }}>
                <Building size={48} className="mb-2" />
                <h3 className="mb-0">GESTION EMPLOYÉS</h3>
                <small>2026</small>
              </Card.Header>
              <Card.Body className="p-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#02061E', fontWeight: 'bold' }}>
                      <PersonFill className="me-2" /> Nom d'utilisateur
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrez votre nom d'utilisateur"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      size="lg"
                      style={{ borderColor: '#0671B6' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#02061E', fontWeight: 'bold' }}>
                      <LockFill className="me-2" /> Mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      size="lg"
                      style={{ borderColor: '#0671B6' }}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={loading}
                    className="w-100"
                    style={{ 
                      background: 'linear-gradient(135deg, #5B11EE 0%, #0405BF 100%)',
                      border: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                  </Button>

                  {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;