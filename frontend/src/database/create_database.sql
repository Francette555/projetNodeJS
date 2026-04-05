-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_employes;
USE gestion_employes;

-- Suppression de la table si elle existe déjà
DROP TABLE IF EXISTS employe;

-- Création de la table employe
CREATE TABLE IF NOT EXISTS employe (
    numEmp INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    salaire DECIMAL(10,2) NOT NULL CHECK (salaire >= 0)
);