/*import { useState } from 'react';
import api from '../services/api';

function AddEmployee() {
  const [nom, setNom] = useState('');
  const [salaire, setSalaire] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/', {
        nom,
        salaire: parseFloat(salaire),
      });
      setMessage(response.data.message);
      setMessageType('success');
      setNom('');
      setSalaire('');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('insertion échouée');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Ajouter un employé</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            placeholder="Entrez le nom"
          />
        </div>
        <div className="form-group">
          <label>Salaire (Ar) :</label>
          <input
            type="number"
            step="0.01"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value)}
            required
            placeholder="Entrez le salaire"
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {message && (
        <p className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddEmployee;*/
import { useState } from 'react';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { PersonPlusFill } from 'react-bootstrap-icons';
import api from '../services/api';
import '../App.css';

function AddEmployee() {
  const [nom, setNom] = useState('');
  const [salaire, setSalaire] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/', {
        nom,
        salaire: parseFloat(salaire),
      });
      setMessage(response.data.message);
      setMessageType('success');
      setNom('');
      setSalaire('');
      
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } catch (err) {
      setMessage('Insertion échouée');
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 fade-in-up">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="text-white" style={{ background: 'linear-gradient(135deg, #5B11EE 0%, #0405BF 100%)' }}>
              <h4 className="mb-0">
                <PersonPlusFill className="me-2" /> Ajouter un employé
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#02061E', fontWeight: 'bold' }}>Nom complet</Form.Label>
                  <Form.Control
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    placeholder="Entrez le nom de l'employé"
                    style={{ borderColor: '#0671B6' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#02061E', fontWeight: 'bold' }}>Salaire (Ar)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={salaire}
                    onChange={(e) => setSalaire(e.target.value)}
                    required
                    placeholder="Entrez le salaire"
                    style={{ borderColor: '#0671B6' }}
                  />
                  <Form.Text style={{ color: '#5E5E5E' }}>
                    Montant en Ariary (MGA)
                  </Form.Text>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  className="w-100"
                  style={{ 
                    background: 'linear-gradient(135deg, #5B11EE 0%, #0405BF 100%)',
                    border: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Ajout en cours...' : '➕ Ajouter l\'employé'}
                </Button>
              </Form>

              {message && (
                <Alert 
                  variant={messageType === 'success' ? 'success' : 'danger'} 
                  className="mt-3"
                >
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddEmployee;