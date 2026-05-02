import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import { BarChartFill, PieChartFill } from 'react-bootstrap-icons';
import api from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../App.css';

function Dashboard() {
  const [bilan, setBilan] = useState({ total: 0, min: 0, max: 0, count: 0 });
  const [chartType, setChartType] = useState('pie');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bilanRes, employeesRes] = await Promise.all([
          api.get('/bilan'),
          api.get('/')
        ]);
        setBilan(bilanRes.data);
        
        const data = employeesRes.data.map(emp => ({
          name: emp.nom,
          salaire: Number(emp.salaire)
        }));
        setChartData(data);
      } catch (err) {
        console.error('Erreur lors du chargement:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#5B11EE', '#0405BF', '#0671B6', '#5E5E5E', '#8B5CF6', '#A78BFA'];

  // Données pour le camembert (sans le nombre d'employés)
  const pieChartData = [
    { name: 'Total des salaires', valeur: bilan.total, color: '#5B11EE' },
    { name: 'Salaire maximum', valeur: bilan.max, color: '#0405BF' },
    { name: 'Salaire minimum', valeur: bilan.min, color: '#0671B6' }
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" style={{ color: '#5B11EE' }} />
      </div>
    );
  }

  return (
    <Container className="mt-4 fade-in-up">
      <h2 className="mb-4 text-center" style={{ color: '#02061E' }}>
        <BarChartFill className="me-2" style={{ color: '#5B11EE' }} /> Bilan des salaires
      </h2>
      
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm stat-card-primary">
            <Card.Body>
              <h5>Total</h5>
              <h3>{bilan.total.toLocaleString('fr-FR')} Ar</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #0671B6 0%, #0405BF 100%)', color: 'white' }}>
            <Card.Body>
              <h5>Minimum</h5>
              <h3>{bilan.min.toLocaleString('fr-FR')} Ar</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #5B11EE 0%, #0405BF 100%)', color: 'white' }}>
            <Card.Body>
              <h5>Maximum</h5>
              <h3>{bilan.max.toLocaleString('fr-FR')} Ar</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm stat-card-gray">
            <Card.Body>
              <h5>Employés</h5>
              <h3>{bilan.count}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-lg border-0">
        <Card.Header style={{ background: '#02061E', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <PieChartFill className="me-2" /> Visualisation des salaires
            </h5>
            <ButtonGroup>
              <ToggleButton
                type="radio"
                variant="outline-primary"
                value="pie"
                checked={chartType === 'pie'}
                onChange={(e) => setChartType(e.currentTarget.value)}
                style={{ color: chartType === 'pie' ? 'white' : '#5B11EE' }}
              >
                🥧 Camembert
              </ToggleButton>
           
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body className="text-center">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              {chartType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="valeur"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={(entry) => `${entry.name}: ${entry.valeur.toLocaleString('fr-FR')} Ar`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString('fr-FR')} Ar`} />
                  <Legend />
                </PieChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString('fr-FR')} Ar`} />
                  <Legend />
                  <Bar dataKey="salaire" fill="#5B11EE" name="Salaire (Ar)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          ) : (
            <p className="text-muted">Aucune donnée à afficher</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;