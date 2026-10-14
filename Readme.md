# 🍔 Foodie — Food Ordering System

A full-stack food ordering web application built using **Java, Spring Boot, HTML, CSS, and JavaScript**. Foodie provides a simple and user-friendly interface for browsing food items, managing a shopping cart, and accessing user accounts.

## ✨ Features

- **User Authentication:** Login and signup functionality.
- **Food Menu:** Browse available food items.
- **Shopping Cart:** Add and manage food items before checkout.
- **Responsive UI:** Clean interface designed for a smooth user experience.
- **REST API Integration:** Communicates with the backend using HTTP requests and JSON.
- **Spring Boot Backend:** Handles application logic and API requests.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Java | Backend programming |
| Spring Boot | Backend framework and REST APIs |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend interactions and API calls |
| Maven | Dependency management and build tool |

## 📂 Project Structure

```text
food-ordering-system/
├── src/
│   └── main/
│       ├── java/
│       │   └── ...                 # Java source code
│       └── resources/
│           ├── static/
│           │   ├── index.html
│           │   ├── style.css
│           │   └── ...             # Other frontend assets
│           └── application.properties
├── .mvn/
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

*The exact locations of your HTML, CSS, and JavaScript files may differ depending on your project setup.*

## 🔗 REST API Endpoints

Foodie uses REST-style HTTP endpoints to communicate between the frontend and backend.

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/signup` | Registers a new user |
| POST | `/api/login` | Authenticates an existing user |

### Example: Signup Request

**Endpoint:** `POST /api/signup`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "examplePassword123"
}
```

### Example: Login Request

**Endpoint:** `POST /api/login`

Request body:

```json
{
  "email": "john@example.com",
  "password": "examplePassword123"
}
```

The backend processes these requests and returns a JSON response. Actual response fields and HTTP status codes depend on the Java controller implementation.

> **Note:** The authentication endpoints above match the frontend URLs. Add menu, cart, and order endpoints to this table only when they are implemented in your backend.

## ⚙️ Getting Started

### Prerequisites

- Java JDK compatible with your project's `pom.xml`
- Maven, or the included Maven Wrapper
- Git (optional, for cloning the repository)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/food-ordering-system.git
cd food-ordering-system
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Run the application

On Windows, use the Maven Wrapper:

```powershell
.\mvnw.cmd spring-boot:run
```

Alternatively, if Maven is installed:

```bash
mvn spring-boot:run
```

### 3. Open the application

Visit:

```text
http://localhost:8080/
```

The default port may differ if your application configuration specifies another port.

## 🔐 Security Notes

- Do not commit database passwords, API keys, or other secrets.
- Validate user input on the backend.
- Store passwords securely using a suitable password-hashing mechanism.
- Use HTTPS and appropriate session or token management when deploying publicly.

## 🚀 Future Improvements

- Food search and category filters
- Persistent cart and order history
- Online payment integration
- Admin dashboard for managing food items
- Order status tracking
- Deployment to a cloud hosting platform

## 👩‍💻 Author

Shravani Khawale

GitHub: [Shravanikha](https://github.com/Shravanikha)

---

⭐ If you find this project interesting, consider giving the repository a star!