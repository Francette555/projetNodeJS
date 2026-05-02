import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Container } from 'react-bootstrap';
import { PeopleFill, CashStack, BarChartLine, ArrowUpShort, ArrowDownShort, HouseDoorFill } from 'react-bootstrap-icons';
import api from '../services/api';
import '../App.css';

function Home() {
  const [bilan, setBilan] = useState({ total: 0, min: 0, max: 0, count: 0 });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bilanRes, employeesRes] = await Promise.all([
          api.get('/bilan'),
          api.get('/')
        ]);
        setBilan(bilanRes.data);
        setRecentEmployees(employeesRes.data.slice(0, 5));
      } catch (err) {
        console.error('Erreur lors du chargement:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAverageSalary = () => {
    if (bilan.count === 0) return 0;
    return bilan.total / bilan.count;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" style={{ color: '#5B11EE' }} />
      </div>
    );
  }

  return (
    <Container className="mt-4 fade-in-up">
      <h1 className="mb-4 text-center" style={{ color: '#02061E' }}>
        <HouseDoorFill className="me-2" style={{ color: '#5B11EE' }} /> Tableau de bord
      </h1>
      
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm stat-card-primary">
            <Card.Body>
              <PeopleFill size={40} />
              <h3 className="mt-2">{bilan.count}</h3>
              <p className="mb-0">Employés</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #0671B6 0%, #0405BF 100%)', color: 'white' }}>
            <Card.Body>
              <CashStack size={40} />
              <h3 className="mt-2">{bilan.total.toLocaleString('fr-FR')} Ar</h3>
              <p className="mb-0">Total des salaires</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #5B11EE 0%, #0405BF 100%)', color: 'white' }}>
            <Card.Body>
              <BarChartLine size={40} />
              <h3 className="mt-2">{getAverageSalary().toLocaleString('fr-FR')} Ar</h3>
              <p className="mb-0">Salaire moyen</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm stat-card-gray">
            <Card.Body>
              <div className="d-flex justify-content-around">
                <div>
                  <ArrowUpShort size={30} />
                  <h5>{bilan.max.toLocaleString('fr-FR')} Ar</h5>
                  <small>Maximum</small>
                </div>
                <div>
                  <ArrowDownShort size={30} />
                  <h5>{bilan.min.toLocaleString('fr-FR')} Ar</h5>
                  <small>Minimum</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="text-center mt-5 pt-3 border-top" style={{ color: '#5E5E5E', borderTopColor: '#E0E0E0 !important' }}>
        <p className="mb-2">
          &copy; {new Date().getFullYear()} - Gestion des Employés
        </p>
        <p className="mb-0 small">
          Application de gestion des salaires | Tous droits réservés
        </p>
      </footer>
    </Container>
  );
}

export default Home;