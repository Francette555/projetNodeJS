/*import { useEffect, useState } from 'react';
import api from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function Dashboard() {
  const [bilan, setBilan] = useState({ total: 0, min: 0, max: 0, count: 0 });
  const [chartType, setChartType] = useState('pie'); // 'pie' ou 'bar'
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bilanRes, employeesRes] = await Promise.all([
          api.get('/bilan'),
          api.get('/')
        ]);
        setBilan(bilanRes.data);
        
        // Préparer les données pour le graphique
        const data = employeesRes.data.map(emp => ({
          name: emp.nom,
          salaire: Number(emp.salaire)
        }));
        setChartData(data);
      } catch (err) {
        console.error('Erreur lors du chargement:', err);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="dashboard-container">
      <h2>📈 Bilan des salaires</h2>
      
      <div className="bilan-stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p className="stat-value">{bilan.total.toLocaleString('fr-FR')} Ar</p>
        </div>
        <div className="stat-card">
          <h3>Minimum</h3>
          <p className="stat-value">{bilan.min.toLocaleString('fr-FR')} Ar</p>
        </div>
        <div className="stat-card">
          <h3>Maximum</h3>
          <p className="stat-value">{bilan.max.toLocaleString('fr-FR')} Ar</p>
        </div>
        <div className="stat-card">
          <h3>Nombre d'employés</h3>
          <p className="stat-value">{bilan.count}</p>
        </div>
      </div>

      <div className="chart-controls">
        <button onClick={() => setChartType('pie')} className={chartType === 'pie' ? 'active' : ''}>
          🥧 Camembert
        </button>
        <button onClick={() => setChartType('bar')} className={chartType === 'bar' ? 'active' : ''}>
          📊 Histogramme
        </button>
      </div>

      <div className="chart-container">
        {chartData.length > 0 ? (
          chartType === 'pie' ? (
            <PieChart width={500} height={400}>
              <Pie
                data={chartData}
                dataKey="salaire"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={(entry) => `${entry.name}: ${entry.salaire}Ar`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString('fr-FR')} Ar`} />
              <Legend />
            </PieChart>
          ) : (
            <BarChart width={600} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString('fr-FR')} Ar`} />
              <Legend />
              <Bar dataKey="salaire" fill="#8884d8" name="Salaire (Ar)" />
            </BarChart>
          )
        ) : (
          <p>Aucune donnée à afficher</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;*/
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
          <Card className="text-center shadow-sm stat-card-secondary">
            <Card.Body>
              <h5>Minimum</h5>
              <h3>{bilan.min.toLocaleString('fr-FR')} Ar</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #0671B6 0%, #0405BF 100%)', color: 'white' }}>
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
              <ToggleButton
                type="radio"
                variant="outline-primary"
                value="bar"
                checked={chartType === 'bar'}
                onChange={(e) => setChartType(e.currentTarget.value)}
                style={{ color: chartType === 'bar' ? 'white' : '#5B11EE' }}
              >
                📊 Histogramme
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
                    data={chartData}
                    dataKey="salaire"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={(entry) => `${entry.name}: ${entry.salaire}Ar`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString('fr-FR')} Ar`} />
                  <Legend />
                </PieChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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