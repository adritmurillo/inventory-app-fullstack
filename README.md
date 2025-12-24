# 📦 Enterprise Inventory System — Hexagonal Architecture
A high-performance, decoupled fullstack inventory management system designed with Domain-Driven Design (DDD) and Hexagonal Architecture.

## 💡 Overview
This is more than CRUD: it’s a back-office core for a scalable e-commerce platform. The core domain stays pure and isolated from external tech (DB, UI, frameworks), making the app testable, maintainable, and infra-agnostic.

## 🏗️ Architecture Blueprint
1) Core (Domain Layer)
- Technology agnostic: pure Java, no Spring/JPA annotations.
- Rich domain models: e.g., Product enforces invariants (stock non-negative).
- Ports: interfaces for inputs (use cases) and outputs (repositories).

2) Application Layer
- Orchestration: services implementing input ports (e.g., ProductServicePort).
- Transaction management for data consistency.

3) Infrastructure Layer (Adapters)
- Input adapters (driving): REST controllers translating JSON to domain via mappers.
- Output adapters (driven): JPA implementations mapping domain ↔ DB entities.

## 📂 Project Structure
src/main/java/com/joaco/inventory
├── application
│   └── service          # Use case implementations (orchestrators)
├── domain
│   ├── model            # Pure Java business objects (rich models)
│   └── port             # Interfaces (contracts)
│       ├── in           # Input ports (service interfaces)
│       └── out          # Output ports (repository interfaces)
└── infrastructure
    ├── input
    │   └── rest         # REST controllers & DTOs
    └── output
        └── persistence  # JPA repositories, entities & adapters

## 🚀 Key Features
- Advanced product management with strict validation.
- Dynamic categorization via backend-fetched dropdowns.
- Smart filtering with server-side pagination and search.
- Stock intelligence with low-stock alerts.
- Responsive UI with React + Vite + Bootstrap 5.

## 📡 API Reference
- GET /api/v1/products — Paginated list of products
- POST /api/v1/products — Create product
- GET /api/v1/products/{id} — Product details
- PUT /api/v1/products/{id} — Update product
- DELETE /api/v1/products/{id} — Remove product
- GET /api/v1/categories — List categories
- POST /api/v1/categories — Create category

## 🛠️ Installation & Setup
Prerequisites
- Java 17+
- Node.js & npm
- MySQL Server

1️⃣ Backend (Spring Boot)
cd inventory-backend
Configure src/main/resources/application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=YOUR_USER
spring.datasource.password=YOUR_PASSWORD
Run:
./mvnw spring-boot:run

2️⃣ Frontend (React)
cd inventory-react
npm install
npm run dev
Open: http://localhost:5173

## ✒️ Author
- Joaquin Tumba — Software Architect & Fullstack Developer
- Email: joaquintumba010@gmail.com
- LinkedIn: linkedin.com/in/joaquintumba
- GitHub: github.com/adritmurillo
