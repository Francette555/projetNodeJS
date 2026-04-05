USE gestion_employes;

-- Insertion de 3 employés
INSERT INTO employe (nom, salaire) VALUES
('Jean Dupont', 850.00),
('Marie Curie', 3200.00),
('Albert Einstein', 6200.00);

-- Vérification
SELECT * FROM employe;