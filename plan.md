# SpendWise – Personal Finance & Expense Analytics Platform

<p align="center">
  <strong>Track Your Money. Understand Your Spending. Manage Your Future.</strong>
</p>

<p align="center">
  A full-stack personal finance management and expense analytics application built using React, Node.js, Express.js, PostgreSQL and Microsoft Power BI.
</p>

---

## 1. Project Overview

**SpendWise** is a web-based personal finance management and expense analytics platform designed to help students and young professionals monitor their financial activities, manage monthly budgets and understand their spending patterns.

The application provides a centralized interface where users can record their income and expenses, categorize transactions, maintain monthly budgets and visualize their financial activities through interactive dashboards.

SpendWise combines full-stack web development with business intelligence to transform raw transaction records into meaningful financial insights.

### Key Highlights

- Personal income and expense tracking.
- Category-wise transaction management.
- Monthly budget planning and monitoring.
- Interactive financial analytics dashboard.
- Visual representation of spending patterns.
- Relational database management using PostgreSQL.
- RESTful API architecture.
- Docker-based backend containerization.
- GitHub-based version control and collaboration.

---

## 2. Problem Statement

Students and young professionals frequently struggle to manage their daily financial activities.

Many individuals rely on manual notes, spreadsheets or disconnected applications to record their expenses. These approaches make it difficult to:

- Maintain a centralized record of transactions.
- Understand monthly spending patterns.
- Identify categories with excessive spending.
- Compare income against expenses.
- Monitor monthly budget utilization.
- Generate meaningful financial reports.

There is a need for a simple and accessible platform that combines transaction management, budget monitoring and analytical reporting.

### Proposed Solution

SpendWise addresses these problems by providing a centralized personal finance management system with an integrated analytics dashboard.

Users can record transactions, categorize expenses, define monthly budgets and analyze their financial behavior using visual reports.

---

## 3. Project Objectives

The primary objectives of SpendWise are:

1. Develop a responsive web application for personal financial management.
2. Provide functionality to create, view, update and delete transactions.
3. Design a normalized relational database for storing financial records.
4. Implement RESTful APIs using Node.js and Express.js.
5. Enable users to categorize income and expenses.
6. Provide monthly budget creation and monitoring.
7. Visualize financial information using Microsoft Power BI.
8. Implement interactive charts, filters and analytical metrics.
9. Containerize the backend application using Docker.
10. Maintain source code using Git and GitHub.
11. Demonstrate end-to-end integration between frontend, backend and database.

---

## 4. Target Users

SpendWise is primarily designed for:

- College students managing personal allowances.
- Young professionals tracking monthly salaries and expenses.
- Individuals interested in understanding their spending habits.
- Users who want a simple personal budgeting solution.

---

## 5. Features and Functionalities

### 5.1 Financial Dashboard

The dashboard provides an overview of the user's financial activities.

**Key metrics:**

- Total Income
- Total Expenses
- Available Balance
- Monthly Spending
- Budget Utilization

The dashboard presents important financial information through summary cards and visualizations.

### 5.2 Income Management

Users can record their income transactions.

Features include:

- Add income records.
- Select income categories.
- Enter transaction amounts.
- Add descriptions.
- Specify transaction dates.
- View recorded income.

Example income categories:

- Salary
- Allowance
- Freelancing
- Scholarship
- Other Income

### 5.3 Expense Management

Users can record and manage their daily expenses.

Features include:

- Add new expenses.
- Assign expense categories.
- Enter transaction amounts.
- Add transaction descriptions.
- Specify transaction dates.
- Edit existing transactions.
- Delete transactions.
- View complete transaction history.

Example expense categories:

- Food
- Transportation
- Shopping
- Education
- Entertainment
- Healthcare
- Rent
- Utilities
- Other Expenses

### 5.4 Transaction History

The transaction history section displays previously recorded financial activities.

Users can:

- View all transactions.
- Filter transactions by category.
- Filter transactions by date.
- Identify income and expense records.
- Update existing records.
- Delete unnecessary records.

### 5.5 Budget Management

Users can define monthly spending limits for different expense categories.

Example:

| Category | Monthly Budget |
|---|---:|
| Food | ₹3,000 |
| Transportation | ₹1,500 |
| Shopping | ₹2,000 |
| Entertainment | ₹1,000 |
| Education | ₹2,500 |

The application calculates budget utilization.

**Budget Utilization Formula:**

Budget Utilization (%) = (Actual Expense / Monthly Budget) × 100

The system can display warnings when spending exceeds the allocated budget.

### 5.6 Financial Analytics

SpendWise uses Microsoft Power BI to transform transaction records into interactive analytical reports.

The dashboard includes:

- Income versus expense analysis.
- Category-wise spending distribution.
- Monthly expense trends.
- Spending patterns over time.
- Budget versus actual expenditure.
- City-wise expense distribution.
- Transaction summary tables.

### 5.7 Data Validation

The application should validate user inputs before saving records.

Examples:

- Transaction amount must be greater than zero.
- Required fields cannot be empty.
- Transaction type must be valid.
- Category must exist.
- Invalid transaction IDs should return appropriate errors.

---

## 6. Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and layouts |
| JavaScript | Application logic |
| React.js | Frontend development |
| Bootstrap 5 | Responsive UI components |
| Node.js | Backend runtime |
| Express.js | HTTP server and REST APIs |
| PostgreSQL | Relational database |
| SQL | Database operations and analytical queries |
| Microsoft Power BI | Data visualization and reporting |
| Git | Version control |
| GitHub | Remote repository and collaboration |
| Docker | Application containerization |
| Render / Vercel | Potential cloud deployment |

### Frontend

**React.js + Bootstrap**

React is used to develop reusable user interface components and manage application state.

Bootstrap provides responsive layouts, forms, navigation components and styling utilities.

### Backend

**Node.js + Express.js**

Node.js provides the JavaScript runtime environment, while Express.js handles HTTP requests, routing, middleware and REST API development.

### Database

**PostgreSQL**

PostgreSQL stores user information, transaction records, expense categories and monthly budgets.

### Business Intelligence

**Microsoft Power BI**

Power BI is used to clean, transform, analyze and visualize financial transaction data.

### Infrastructure

**Docker, Git and GitHub**

Docker packages the backend application into an isolated container. Git and GitHub support source-code management and team collaboration.

---

## 7. System Architecture

SpendWise follows a three-tier application architecture.

### 7.1 Presentation Layer

Built using React.js and Bootstrap.

Responsibilities:

- Display application pages.
- Collect user inputs.
- Perform client-side validation.
- Display financial summaries.
- Communicate with backend APIs.

### 7.2 Application Layer

Built using Node.js and Express.js.

Responsibilities:

- Handle HTTP requests.
- Process business logic.
- Validate incoming data.
- Execute SQL queries.
- Communicate with PostgreSQL.
- Return appropriate API responses.

### 7.3 Database Layer

Built using PostgreSQL.

Responsibilities:

- Store user records.
- Store transaction information.
- Maintain expense categories.
- Store monthly budget details.
- Enforce database relationships and constraints.

### 7.4 Analytics Layer

Built using Microsoft Power BI.

Responsibilities:

- Import transaction data.
- Perform data transformation.
- Generate analytical metrics.
- Create interactive visualizations.
- Display financial trends.

### Architecture Diagram

```text
             USER
               |
               v
       REACT.JS FRONTEND
         + BOOTSTRAP
               |
               | HTTP Requests
               v
       NODE.JS + EXPRESS
          REST API LAYER
               |
               | SQL Queries
               v
          POSTGRESQL
           DATABASE
               |
               | Export CSV
               v
        MICROSOFT POWER BI
               |
               v
       FINANCIAL ANALYTICS
          DASHBOARD


      GITHUB --> SOURCE CONTROL

      DOCKER --> CONTAINERIZATION

      RENDER / VERCEL --> DEPLOYMENT
```

**Note:** The Power BI dashboard uses exported transaction data in the proposed initial implementation. It is not assumed to synchronize automatically with PostgreSQL.

---

## 8. Database Design

SpendWise uses a relational database consisting of four primary tables.

### 8.1 Users Table

Stores basic user information.

| Column | Data Type | Constraint |
|---|---|---|
| user_id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | UNIQUE, NOT NULL |

### 8.2 Categories Table

Stores different income and expense categories.

| Column | Data Type | Constraint |
|---|---|---|
| category_id | SERIAL | PRIMARY KEY |
| category_name | VARCHAR(50) | UNIQUE, NOT NULL |
| category_type | VARCHAR(10) | NOT NULL |

Possible category types:

- Income
- Expense

### 8.3 Transactions Table

Stores individual financial transactions.

| Column | Data Type | Constraint |
|---|---|---|
| transaction_id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY |
| category_id | INTEGER | FOREIGN KEY |
| amount | DECIMAL(10,2) | NOT NULL |
| transaction_type | VARCHAR(10) | NOT NULL |
| description | TEXT | Optional |
| transaction_date | DATE | NOT NULL |
| merchant_city | VARCHAR(100) | Optional |

### 8.4 Budgets Table

Stores monthly spending limits.

| Column | Data Type | Constraint |
|---|---|---|
| budget_id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY |
| category_id | INTEGER | FOREIGN KEY |
| monthly_limit | DECIMAL(10,2) | NOT NULL |
| budget_month | DATE | NOT NULL |

### 8.5 Database Relationships

- One user can have multiple transactions.
- One user can have multiple budgets.
- One category can be associated with multiple transactions.
- One category can be associated with multiple budgets.

### Entity Relationship Diagram

```text
       USERS
         |
         | 1:N
         |
    TRANSACTIONS
         |
         | N:1
         |
     CATEGORIES
         |
         | 1:N
         |
       BUDGETS
         |
         | N:1
         |
       USERS
```

### Database Normalization

The database is designed to reduce redundant data.

- First Normal Form (1NF): Each field contains atomic values.
- Second Normal Form (2NF): Non-key attributes depend on the complete primary key.
- Third Normal Form (3NF): Non-key attributes depend on keys rather than other non-key attributes.

The proposed schema separates user, category, transaction and budget information into individual tables.

---

## 9. SQL Operations and Analytical Queries

The project demonstrates several SQL concepts required by the TPDS syllabus.

### 9.1 INNER JOIN

Retrieve transactions along with their category names.

```sql
SELECT
    t.transaction_id,
    t.amount,
    t.transaction_type,
    c.category_name
FROM transactions t
INNER JOIN categories c
ON t.category_id = c.category_id;
```

### 9.2 LEFT JOIN

Retrieve all categories, including categories without transactions.

```sql
SELECT
    c.category_name,
    COALESCE(SUM(t.amount), 0) AS total_amount
FROM categories c
LEFT JOIN transactions t
ON c.category_id = t.category_id
GROUP BY c.category_name;
```

### 9.3 Aggregate Functions

Calculate total expenses for each category.

```sql
SELECT
    c.category_name,
    SUM(t.amount) AS total_expense
FROM transactions t
JOIN categories c
ON t.category_id = c.category_id
WHERE t.transaction_type = 'Expense'
GROUP BY c.category_name;
```

### 9.4 Nested Subquery

Find transactions whose expense amount is above the average expense.

```sql
SELECT *
FROM transactions
WHERE transaction_type = 'Expense'
AND amount > (
    SELECT AVG(amount)
    FROM transactions
    WHERE transaction_type = 'Expense'
);
```

### 9.5 SQL View

Create a monthly expense summary.

```sql
CREATE VIEW monthly_expenses AS
SELECT
    DATE_TRUNC('month', transaction_date) AS month,
    category_id,
    SUM(amount) AS total_expense
FROM transactions
WHERE transaction_type = 'Expense'
GROUP BY
    DATE_TRUNC('month', transaction_date),
    category_id;
```

These queries demonstrate joins, grouping, aggregation, nested queries and database views.

---

## 10. REST API Design

The backend exposes RESTful endpoints for communication between the React frontend and PostgreSQL database.

### Transaction APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Retrieve all transactions |
| GET | `/api/transactions/:id` | Retrieve a specific transaction |
| POST | `/api/transactions` | Create a transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### Category APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Retrieve all categories |
| POST | `/api/categories` | Create a category |

### Budget APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/budgets` | Retrieve budgets |
| POST | `/api/budgets` | Create a budget |
| PUT | `/api/budgets/:id` | Update a budget |
| DELETE | `/api/budgets/:id` | Delete a budget |

### Analytics APIs

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/summary` | Retrieve income, expenses and balance |
| GET | `/api/analytics/categories` | Retrieve category-wise expenses |
| GET | `/api/analytics/monthly` | Retrieve monthly spending summaries |

These are the proposed API routes; their actual implementation and response formats should be verified during development.

---

## 11. Power BI Dashboard

Microsoft Power BI is used to create an interactive financial analytics dashboard.

### Dashboard Components

**1. KPI Cards**

- Total Income
- Total Expenses
- Available Balance
- Total Transactions

**2. Donut Chart**

Displays category-wise expense distribution.

**3. Bar Chart**

Displays monthly expenses.

**4. Line Chart**

Displays changes in spending over time.

**5. Map Visualization**

Displays geographical distribution of spending based on transaction city.

**6. Budget Comparison**

Compares allocated monthly budgets against actual spending.

**7. Transaction Table**

Displays detailed financial records.

### Interactive Filters

- Month
- Expense Category
- Transaction Type
- City

### Power BI Data Flow

```text
POSTGRESQL DATABASE
         |
         v
    EXPORT CSV
         |
         v
   POWER BI DESKTOP
         |
         v
  POWER QUERY CLEANING
         |
         v
  DATA MODELING
         |
         v
   VISUALIZATIONS
         |
         v
 INTERACTIVE DASHBOARD
```

For the initial demonstration, transaction records can be exported from PostgreSQL into CSV and imported into Power BI.

The map visualization requires geographical information in the dataset. Synthetic Indian city data can be used for demonstration purposes.

---

## 12. Project Directory Structure

The following is the proposed repository structure.

```text
SpendWise/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── queries/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── analytical_queries.sql
│
├── powerbi/
│   ├── dashboard.pbix
│   └── transactions_sample.csv
│
├── docs/
│   ├── architecture.png
│   ├── er_diagram.png
│   ├── module_mapping.md
│   └── testing.md
│
├── .gitignore
├── README.md
└── LICENSE
```

The actual directory structure may differ depending on implementation choices.

---

## 13. Installation and Setup Instructions

The following instructions describe the intended local development setup.

### Prerequisites

Install the following:

- Node.js and npm
- PostgreSQL
- Git
- Visual Studio Code
- Docker Desktop
- Microsoft Power BI Desktop (Windows)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SpendWise.git

cd SpendWise
```

Replace `YOUR_USERNAME` with the actual GitHub username.

### Step 2: Configure the Database

Create a PostgreSQL database.

```sql
CREATE DATABASE spendwise;
```

Execute the schema and sample data scripts.

```bash
psql -U postgres -d spendwise -f database/schema.sql

psql -U postgres -d spendwise -f database/seed.sql
```

### Step 3: Configure the Backend

```bash
cd backend

npm install
```

Create a `.env` file.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=spendwise
DB_USER=postgres
DB_PASSWORD=your_password

FRONTEND_URL=http://localhost:5173
```

Use your own PostgreSQL credentials.

Start the backend:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:5000
```

### Step 4: Configure the Frontend

Open another terminal.

```bash
cd frontend

npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The React application should be accessible at:

```text
http://localhost:5173
```

### Step 5: Verify the Application

Verify that:

- The frontend loads correctly.
- The backend server starts.
- PostgreSQL connects successfully.
- Transactions can be created.
- Transactions can be retrieved.
- Transactions can be updated.
- Transactions can be deleted.
- Budget information is displayed correctly.

**Note:** These instructions assume the corresponding scripts, database configuration and source files have been implemented.

---

## 14. Environment Variables

Never upload real passwords, database credentials or secret keys to GitHub.

Example backend environment configuration:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=spendwise
DB_USER=postgres
DB_PASSWORD=your_password
```

Example frontend environment configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

Use `.env.example` files to document required configuration without exposing actual credentials.

---

## 15. Docker Containerization

Docker is used to package the backend application and its dependencies into a portable container.

### Dockerfile

A proposed backend Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

Make sure the backend package includes a suitable `start` script.

### Build Docker Image

```bash
docker build -t spendwise-backend ./backend
```

### Run Docker Container

```bash
docker run -p 5000:5000 --env-file backend/.env spendwise-backend
```

For containerized deployment with PostgreSQL, configure the database hostname and networking appropriately. `localhost` inside a container refers to that container itself, not automatically to the host machine.

---

## 16. Git and GitHub Workflow

Git is used to maintain project history and support collaboration between team members.

### Initialize Git

```bash
git init

git add .

git commit -m "Initial project setup"
```

### Connect GitHub Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/SpendWise.git

git branch -M main

git push -u origin main
```

### Create a Feature Branch

```bash
git checkout -b feature/transaction-management
```

### Commit Changes

```bash
git add .

git commit -m "Implement transaction management"
```

### Push Changes

```bash
git push origin feature/transaction-management
```

### Merge Changes

Create a Pull Request on GitHub and merge the feature branch into the main branch after reviewing the changes.

### Version Tagging

```bash
git tag v1.0.0

git push origin v1.0.0
```

---

## 17. Cloud Deployment

The project can be deployed using cloud hosting platforms.

Possible deployment options:

| Component | Suggested Platform |
|---|---|
| Frontend | Vercel / Render |
| Backend | Render |
| PostgreSQL | Render PostgreSQL / Other PostgreSQL hosting |
| Source Code | GitHub |
| Containerization | Docker |

### Deployment Workflow

```text
GITHUB REPOSITORY
        |
        v
  BUILD APPLICATION
        |
        v
   DOCKER IMAGE
        |
        v
 CLOUD DEPLOYMENT
        |
        v
  RUNNING APPLICATION
```

Deployment configuration should include environment variables, database connectivity and appropriate frontend/backend URLs.

Actual deployment URLs should be added after successful deployment.

---

## 18. Testing and Validation

Testing is performed to verify the correctness, reliability and usability of the application.

### Functional Testing

| Test Case | Expected Result |
|---|---|
| Add an expense | Expense should be saved |
| Add income | Income should be saved |
| View transactions | Transaction list should appear |
| Update transaction | Existing record should update |
| Delete transaction | Record should be deleted |
| Create budget | Budget should be saved |
| Filter transactions | Matching records should appear |

### Input Validation Testing

| Test Case | Input | Expected Result |
|---|---|---|
| Negative amount | -500 | Validation error |
| Zero amount | 0 | Validation error |
| Empty required field | Blank | Validation error |
| Invalid transaction type | Random value | Validation error |
| Invalid transaction ID | Non-existing ID | 404 response |

### Boundary Testing

- No transactions available.
- Very large transaction amount.
- Budget exactly equal to expenditure.
- Expense exceeding the budget.
- Category with no transactions.
- Multiple transactions on the same date.

### Performance and Reliability

Basic verification should include:

- Database connection reliability.
- API response correctness.
- Proper handling of invalid requests.
- Consistency of dashboard totals.
- Correct calculation of income and expenses.

Test results and screenshots should be recorded in the final project report.

---

## 19. Four-Module TPDS Syllabus Mapping

SpendWise is designed to demonstrate the practical activities specified in the TPDS course syllabus.

### Module 1: Dashboard Designing & Data Mapping

| Syllabus Activity | Project Implementation |
|---|---|
| 1. Data Connection & Cleaning | Import transaction CSV into Power BI and clean the data |
| 2. Interactive Chart & Metric Creation | KPI cards, bar charts, line charts and donut charts |
| 3. Geospatial Data Mapping | City-wise expense distribution map |
| 4. Interactive Dashboard Construction | Interactive Power BI dashboard with filters |

### Module 2: Responsive Front-End UI/UX Development

| Syllabus Activity | Project Implementation |
|---|---|
| 5. Responsive Wireframing & Layout Grid | Responsive application layout |
| 6. UI Control & Form Interface | Transaction entry forms and validation |
| 7. Mobile-First Layout using Bootstrap | Bootstrap components and responsive utilities |
| 8. Cross-Platform Mobile Interface | Responsive React interface using an open-source framework |

**Note:** The React implementation demonstrates a responsive web interface. It should not be represented as a native Flutter mobile application.

### Module 3: Back-End Development, Databases & APIs

| Syllabus Activity | Project Implementation |
|---|---|
| 9. Relational Database Design | PostgreSQL schema and relational constraints |
| 10. Advanced SQL Querying | Joins, aggregates, subqueries and views |
| 11. HTTP Web Server Setup | Node.js and Express server |
| 12. RESTful API Development | CRUD REST endpoints |
| 13. Database Integration | Express backend connected to PostgreSQL |

### Module 4: Version Control, Containerization & Cloud Deployment

| Syllabus Activity | Project Implementation |
|---|---|
| 14. Git Repository Setup | Git initialization and commits |
| 15. Remote Git Collaboration | GitHub branches, push, pull and merge |
| 16. Full-Stack Application Versioning | Git tags and `.gitignore` |
| 17. Application Containerization | Dockerfile and backend container |
| 18. End-to-End Cloud Deployment | Cloud hosting and deployment workflow |

---

## 20. Team Responsibilities

This project is developed by a team of two.

### Team Member 1 – Frontend & Analytics

Responsibilities:

- Frontend architecture and UI design.
- React component development.
- Bootstrap integration.
- Transaction forms.
- Dashboard interface.
- Power BI dashboard creation.
- Frontend and backend integration.

### Team Member 2 – Backend & Database

Responsibilities:

- PostgreSQL database design.
- Table relationships and constraints.
- SQL query implementation.
- Node.js and Express development.
- REST API implementation.
- Database integration.
- Docker configuration.
- Cloud deployment.

### Joint Responsibilities

Both members participate in:

- System architecture.
- GitHub collaboration.
- Testing and debugging.
- Documentation.
- PPT preparation.
- Final demonstration.
- Project viva.

Both members should understand the complete system and be able to explain its architecture and functionality.

---

## 21. Project Limitations

The initial version of SpendWise focuses on basic personal finance management.

Some limitations include:

1. Financial transactions are entered manually.
2. Bank account integration is not included.
3. Payment gateway integration is not included.
4. Power BI analytics initially uses exported CSV data rather than guaranteed real-time synchronization.
5. Advanced financial forecasting is not included.
6. The initial version is designed as a responsive web application rather than a native mobile application.
7. The application is not intended to provide professional financial advice.

---

## 22. Future Scope

SpendWise can be enhanced with additional capabilities in future versions.

### 1. AI-Based Expense Analysis

Introduce machine learning models to identify spending patterns and detect unusual expenses.

### 2. Automated Transaction Categorization

Automatically classify transactions based on their descriptions.

### 3. Real-Time Analytics

Integrate the analytics dashboard with live database updates.

### 4. Mobile Application

Develop a dedicated mobile application using Flutter or React Native.

### 5. Authentication and Authorization

Introduce secure user authentication and role-based access control.

### 6. Financial Goal Tracking

Allow users to create savings goals and monitor their progress.

### 7. Expense Forecasting

Use historical transaction records to estimate future spending patterns.

### 8. Exportable Financial Reports

Allow users to download monthly financial reports in PDF or Excel formats.

---

## 23. Conclusion

SpendWise demonstrates the integration of modern full-stack web development, relational database management and business intelligence into a practical personal finance management application.

By combining React, Node.js, Express.js and PostgreSQL, the application provides a structured platform for managing income, expenses and monthly budgets.

The integration of Microsoft Power BI adds analytical capabilities that help users understand their financial behavior through interactive visualizations.

The project also demonstrates important software engineering practices, including REST API development, Git-based collaboration, Docker containerization and cloud deployment.

Overall, SpendWise provides a practical implementation of the four TPDS course modules through a single end-to-end application.

---

## 24. References and Documentation

Official documentation:

- React: https://react.dev/
- Bootstrap: https://getbootstrap.com/
- Node.js: https://nodejs.org/docs/
- Express.js: https://expressjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- Microsoft Power BI: https://learn.microsoft.com/power-bi/
- Git: https://git-scm.com/doc
- GitHub: https://docs.github.com/
- Docker: https://docs.docker.com/
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs

---

## 25. Acknowledgements

We would like to express our gratitude to our course instructor for providing the opportunity to develop SpendWise as part of the TPDS practical project.

This project helped us understand the practical integration of frontend development, backend programming, database management, business intelligence, version control and application deployment.

We also acknowledge the official documentation of the technologies used throughout the project.

---

## Project Information

**Project Name:** SpendWise

**Project Category:** Full-Stack Web Application & Data Analytics

**Course:** TPDS – III

**Semester:** 5th Semester

**Team Size:** 2 Members

**Frontend:** React.js, Bootstrap

**Backend:** Node.js, Express.js

**Database:** PostgreSQL

**Analytics:** Microsoft Power BI

**Containerization:** Docker

**Version Control:** Git and GitHub

**Deployment:** Render / Vercel (planned)

---

<p align="center">
  <strong>SpendWise – Track Your Money. Make Smarter Financial Decisions.</strong>
</p>