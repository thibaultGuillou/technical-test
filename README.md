
# Test Technique Ombrea

## Contexte

L'équipe R&D souhaite pouvoir visualiser les données des capteurs associées à un site spécifique directement depuis l'application. L'objectif est qu'à la sélection d'un site, un graphique s'affiche, représentant les quantités mesurées par les capteurs installés sur ce site.

## Environnements

-   **API Django** : Interface entre le front-end et les bases de données.
-   **Interface React** : Front-end de l'application.
-   **Base de données Postgres** : Contient les métadonnées des sites (nom, agriculteur, etc.).
-   **Base de données InfluxDB** : Stocke les données des capteurs pour chaque site.

## Lancer l'application

### 1. Préparer l'environnement

Assurez-vous que **Docker** et **Docker Compose** sont installés sur votre système.

### 2. Démarrer les services

Lancez les commandes suivantes

```bash
docker-compose up --build
docker exec -it <drf_api_container_name> bash # you can find drf container name with docker ps
# inside drf container
python manage.py migrate
python generate_sensor_data # python generate_sensor_data.py
```

### 3. Accéder aux services

-   **API Django** : [http://localhost:8000](http://localhost:8000)
-   **Interface React** : [http://localhost:5173](http://localhost:5173)

### 4. Vérifier les bases de données

-   **PostgreSQL** : Utilisez les identifiants définis dans le fichier `docker-compose.yml`.
-   **InfluxDB** : Accessible à l’adresse [http://localhost:8086](http://localhost:8086). Utiliser les identifiants présents dans le fichier `docker-compose.yml`.

> **N.B.** : Pour bénéficier pleinement des outils de votre IDE (comme les imports automatiques ou le linting), vous pouvez effectuer les installations nécessaires en local, en dehors de l’environnement Docker. 

> **Utile** : Librairie pour faire des graphes en js : [plotly](https://plotly.com/javascript/)