/*import { useEffect, useState } from 'react';
import api from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNom, setEditNom] = useState('');
  const [editSalaire, setEditSalaire] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/');
      setEmployees(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getObservation = (salaire) => {
    if (salaire < 1000) return 'médiocre';
    if (salaire <= 5000) return 'moyen';
    return 'grand';
  };

  const handleDelete = async (id, nom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${nom} ?`)) {
      try {
        const response = await api.delete(`/${id}`);
        setMessage(response.data.message);
        fetchEmployees();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('suppression échouée');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await api.put(`/${id}`, {
        nom: editNom,
        salaire: parseFloat(editSalaire),
      });
      setMessage(response.data.message);
      setEditId(null);
      fetchEmployees();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('modification échouée');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Liste des employés</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Salaire (Ar)</th>
            <th>Observation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.numEmp}>
              {editId === emp.numEmp ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editNom}
                      onChange={(e) => setEditNom(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={editSalaire}
                      onChange={(e) => setEditSalaire(e.target.value)}
                    />
                  </td>
                  <td>{getObservation(parseFloat(editSalaire))}</td>
                  <td>
                    <button onClick={() => handleUpdate(emp.numEmp)} className="save-btn">
                      💾 Valider
                    </button>
                    <button onClick={() => setEditId(null)} className="cancel-btn">
                      ❌ Annuler
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{emp.nom}</td>
                  <td>{Number(emp.salaire).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</td>
                  <td className={`observation ${getObservation(emp.salaire)}`}>
                    {getObservation(emp.salaire)}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditId(emp.numEmp);
                        setEditNom(emp.nom);
                        setEditSalaire(emp.salaire);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(emp.numEmp, emp.nom)}
                      className="delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default EmployeeList;*/
import { useEffect, useState } from 'react';
import { Table, Button, Form, Alert, Container, Modal, Badge } from 'react-bootstrap';
import { Pencil, Trash2, Save, X, PeopleFill } from 'react-bootstrap-icons';
import api from '../services/api';
import '../App.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNom, setEditNom] = useState('');
  const [editSalaire, setEditSalaire] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/');
      setEmployees(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getObservation = (salaire) => {
    if (salaire < 1000) return { text: 'Médiocre', variant: 'secondary', color: '#5E5E5E' };
    if (salaire <= 5000) return { text: 'Moyen', variant: 'info', color: '#0671B6' };
    return { text: 'Grand', variant: 'primary', color: '#5B11EE' };
  };

  const handleDelete = async () => {
    if (employeeToDelete) {
      try {
        const response = await api.delete(`/${employeeToDelete.id}`);
        setMessage(response.data.message);
        fetchEmployees();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('Suppression échouée');
        setTimeout(() => setMessage(''), 3000);
      } finally {
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await api.put(`/${id}`, {
        nom: editNom,
        salaire: parseFloat(editSalaire),
      });
      setMessage(response.data.message);
      setEditId(null);
      fetchEmployees();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Modification échouée');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <Container className="mt-4 fade-in-up">
      <h2 className="mb-4" style={{ color: '#02061E' }}>
        <PeopleFill className="me-2" style={{ color: '#5B11EE' }} /> Liste des employés
      </h2>
      
      {message && <Alert variant="info" className="mb-3">{message}</Alert>}
      
      <div className="table-responsive">
        <Table striped hover className="shadow-sm">
          <thead>
            <tr style={{ background: '#02061E', color: 'white' }}>
              <th>#</th>
              <th>Nom</th>
              <th>Salaire (Ar)</th>
              <th>Observation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.numEmp}>
                <td>{index + 1}</td>
                {editId === emp.numEmp ? (
                  <>
                    <td>
                      <Form.Control
                        type="text"
                        value={editNom}
                        onChange={(e) => setEditNom(e.target.value)}
                        size="sm"
                        style={{ borderColor: '#0671B6' }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={editSalaire}
                        onChange={(e) => setEditSalaire(e.target.value)}
                        size="sm"
                        style={{ borderColor: '#0671B6' }}
                      />
                    </td>
                    <td>
                      <Badge style={{ background: getObservation(parseFloat(editSalaire)).color }}>
                        {getObservation(parseFloat(editSalaire)).text}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="success" 
                        size="sm" 
                        onClick={() => handleUpdate(emp.numEmp)}
                        className="me-2 action-btn"
                      >
                        <Save /> Valider
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => setEditId(null)}
                        className="action-btn"
                      >
                        <X /> Annuler
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ fontWeight: 'bold', color: '#02061E' }}>{emp.nom}</td>
                    <td style={{ color: '#5E5E5E' }}>{Number(emp.salaire).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</td>
                    <td>
                      <Badge style={{ background: getObservation(emp.salaire).color }}>
                        {getObservation(emp.salaire).text}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        onClick={() => {
                          setEditId(emp.numEmp);
                          setEditNom(emp.nom);
                          setEditSalaire(emp.salaire);
                        }}
                        className="me-2 action-btn"
                      >
                        <Pencil /> Modifier
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => {
                          setEmployeeToDelete({ id: emp.numEmp, name: emp.nom });
                          setShowDeleteModal(true);
                        }}
                        className="action-btn"
                      >
                        <Trash2 /> Supprimer
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ borderBottom: `3px solid #5B11EE` }}>
          <Modal.Title style={{ color: '#02061E' }}>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer <strong style={{ color: '#5B11EE' }}>{employeeToDelete?.name}</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EmployeeList;