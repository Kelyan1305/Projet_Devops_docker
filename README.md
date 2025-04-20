
# Projet e-commerce DEVOPS

Ce projet est un site de commerce en ligne utilisant une architecture de microservices avec Node.js, Docker, Kubernetes et des principes de DevOps (CI/CD).

Les principales fonctionnalités du site comprennent :
- Affichage et recherche de produits
- Création de commandes
- Interface web de démonstration
- Conteneurisation des services avec Docker
- Déploiement via Kubernetes
- CI/CD avec GitLab

## Fonctionnalités principales
- **Page d’accueil** avec produits existants 
- **Page produits** liste des produits et possibilité de recherche.
- **Création de nouvelles commandes** pour des produits sélectionnés.
- **Démonstration d'interface web** avec interaction entre frontend et microservices.
- **Conteneurisation avec Docker** et déploiement sur Kubernetes.
- **CI/CD automatisé avec GitLab** pour tests et déploiement continus.


## Stack technique
- **Backend** : Node.js, Express
- **Frontend** : HTML, CSS, JavaScript
- **DevOps** : Docker, Kubernetes
- **CI/CD** : Script de Continuous Integration (via GitHub Actions ou Jenkins)


## Prérequis
Avant de lancer l’application, assurez-vous d’avoir les outils suivants installés :
- **Docker** : Pour la conteneurisation des microservices.
- **Kubernetes** (Minikube, K3s, ou tout autre gestionnaire de clusters Kubernetes).
- **GitLab** : Pour l’intégration continue et le déploiement.
- **Node.js** et **npm** : Pour exécuter le code localement.
- **Kubectl** : Outil en ligne de commande pour interagir avec Kubernetes.


### Installer les dépendances et démarrer les services

#### Product Service
Dans le dossier `product-service` :
installer les dépendances et démarrer le service :
 --> bash
   cd product-service
   npm install
   node index.js

#### Order Service
Dans le dossier `order-service` :
installer les dépendances et démarrer le service :
 --> bash
   cd order-service
   npm install
   node index.js

Les deux services doivent fonctionner sur les ports suivants :
- **Product Service** : http://localhost:3001
- **Order Service** :http://localhost:3002


### Lancer le frontend
Dans le dossier `frontend` :

-->bash
   cd frontend
   npm install express
   node server.js

Le site sera accessible sur http://localhost:8080


### Utiliser Docker pour exécuter les services
0. Lancer Docker Desktop
  	Démarrer Docker Desktop dans windows

1. Construisez les images Docker pour chaque service :
   -->bash
   cd product-service
   docker build -t product-service .
   docker run -p 3001:3001 product-service

   cd order-service
   docker build -t order-service .
   docker run -p 3002:3002 order-service
   
2. Vous pouvez maintenant accéder aux services via `localhost` dans le navigateur.


### Déploiement des services sur Kubernetes
0. Démarrer Rancher Desktop sous windows

1. Appliquez les fichiers YAML pour déployer les services :
   -->bash
      kubectl apply -f product-service/k8s/
      kubectl apply -f order-service/k8s/
      kubectl apply -f frontend/k8s/

2. Vérifiez que les pods et services sont créés correctement :
   -->bash
   kubectl get pods,services



## CI/CD avec GitLab

### Fichier `.gitlab-ci.yml`

Le fichier `.gitlab-ci.yml` dans ce projet est utilisé pour automatiser les étapes suivantes :
1. **Build des images Docker** pour chaque service.
2. **Déploiement sur Kubernetes** après chaque modification du code source.

Exemple de fichier `.gitlab-ci.yml` :
```yaml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t product-service .
    - docker build -t order-service .
    - docker push product-service
    - docker push order-service

deploy:
  stage: deploy
  script:
    - kubectl apply -f k8s/product-deployment.yaml
    - kubectl apply -f k8s/order-deployment.yaml
```


## Tests

### Endpoints disponibles :
- **GET /products** : Récupère la liste des produits.
  - URL : `http://localhost:3001/products`
  
- **POST /orders** : Crée une commande.
  - Exemple de payload :
    -->json
    {
      "productName": "Téléphone",
      "quantity": 1,
      "clientEmail": "client@example.com"
    }
  

## Utilisation

1. **Afficher les produits**  
   Une fois le site lancé, vous pouvez cliquer sur l'onglet produits pour voir la liste des produits disponibles.
    Vous pouvez cliquer sur **Commander** pour ajouter un produit à la commande.

2. **Passer une commande**  
   Vous pouvez aussi entrer manuellement le nom du produit et la quantité, puis cliquer sur **Commander** à partir de l'onglet" Nouvelle commande.

3. **Visualiser les commandes passées**  
   Toutes les commandes passées seront affichées sur la page d'accueil sous **Commandes existantes**.



 ## Lien vers le dépôt Git

Le code source complet du projet est disponible sur GitLab :  
