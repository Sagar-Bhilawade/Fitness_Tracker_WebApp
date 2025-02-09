# Fitness Tracker Web App

A comprehensive **Fitness Tracker Web Application** built to help users and administrators manage and track fitness goals, activities, and workouts. The application features a frontend developed with **Angular**, a backend built using **Spring Boot**, and **SQLite** as the database. 

---

## Features

### User Profiles
1. **User (ROLE_USER)**:
   - Sign Up and Sign In securely using **JWT-based authentication**.
   - Create, edit, and track personal fitness goals, activities, and workouts.
   - View personalized statistics and graphs for the last 7 days.
   - Seamless user experience with a modern, responsive **Angular** interface.

---

## Tech Stack

### Frontend
- **Angular**: For dynamic and responsive user interfaces.
- **Nginx**: Used as a reverse proxy to serve the Angular app efficiently.

### Backend
- **Spring Boot**: For RESTful APIs and application logic.
- **SQLite**: Lightweight and efficient database for storing application data.

### Tools and Features
- **JWT**: Secured authentication and authorization.
- **Swagger**: Interactive API documentation for easier development and debugging.
- **Maven**: Dependency management and build automation.
- **Docker**: Containerization for deployment and environment consistency.

---

## Functionalities

### Authentication
- **Sign Up**: Register with a valid email, password, and basic profile information.
- **Sign In**: Authenticate and receive a **JWT token** for secure session management.

### Features for Users
- **Goal Management**: Create and edit fitness goals.
- **Activity Tracking**: Log daily activities and monitor progress.
- **Workout Plans**: Add, edit, and follow workout plans.
- **Statistics & Graphs**: Visual representation of fitness progress over the last 7 days.

### Features for Admins
- **User Management**: View and manage all users’ data.
- **Cumulative Analytics**: Combine and analyze data from all users.
- **Administrative Privileges**: Full access to user activities and records.

---

## Installation and Setup

### Prerequisites
- **Node.js**: Required for Angular development.
- **Maven**: To build and run the Spring Boot backend.
- **Docker**: To containerize and deploy the application.

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/fitness-tracker-webapp.git
   cd fitness-tracker-webapp
   ```

2. **Frontend Setup**
   - Navigate to the Angular frontend directory.
     ```bash
     cd FitnessTrackerApp
     npm install
     npm run build
     ```
   - Serve using **Nginx**.

3. **Backend Setup**
   - Navigate to the Spring Boot backend directory.
     ```bash
     cd backend
     mvn clean install
     mvn spring-boot:run
     ```

4. **Database**
   - The application uses **SQLite** by default. Ensure the `application.properties` file is configured correctly.

5. **Run the Application**
   - Access the application at `http://localhost:8080`.

6. **Swagger Documentation**
   - API docs are available at `http://localhost:8080/swagger-ui.html`.

---

## Docker Deployment

### Build Docker Images
1. **Frontend**
   ```bash
   docker build -t fitness-tracker-frontend ./FitnessTrackerApp
   ```

2. **Backend**
   ```bash
   docker build -t fitness-tracker-backend ./FitnessTrackerServer
   ```

### Run Containers
```bash
docker-compose up
```

---


## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request for review.

---



## Contact
For questions or collaboration, reach out via:
- **Email**: [bhilawadesagar321@gamil.com]
- **GitHub**: [https://github.com/Sagar-Bhilawade]
