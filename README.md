# Todo App - FastAPI Backend with HTML/CSS/JS Frontend

This is a full-stack Todo application built with FastAPI for the backend and vanilla HTML/CSS/JavaScript for the frontend. The application features user authentication, task management, and JWT-based security.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup-installation)
- [API Documentation](#api-documentation)
- [Frontend Structure](#frontend-structure)
- [Security](#security)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### Core Functionality
- User registration and authentication
- Create, read, update, and delete (CRUD) operations for tasks
- JWT-based authentication and authorization
- Responsive UI for task management

### Technical Features
- RESTful API design with FastAPI
- PostgreSQL database with SQLAlchemy ORM
- Password hashing with bcrypt
- Token-based authentication
- CORS configuration for frontend-backend communication

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Server**: Uvicorn

### Frontend
- **HTML5** for structure
- **CSS3** for styling
- **Vanilla JavaScript** for client-side logic
- Responsive design for cross-device compatibility

## Project Structure

```
todo-app/
├── backend/
│   ├── database.py          # Database configuration
│   ├── main.py              # FastAPI application entry point
│   ├── models.py            # SQLAlchemy database models
│   └── routes/
│       ├── user.py          # User authentication endpoints
│       └── task.py          # Task management endpoints
├── frontend/
│   ├── css/
│   │   ├── dashboard.css
│   │   ├── home.css
│   │   ├── login.css
│   │   └── signup.css
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── home.js
│   │   ├── login.js
│   │   └── signup.js
│   └── html/
│       ├── dashboard.html
│       ├── index.html
│       ├── login.html
│       └── signup.html
└── requirements.txt         # Project dependencies
```

## Setup & Installation

### Prerequisites
- Python 3.7+
- PostgreSQL database
- Node.js (optional, for frontend development)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/1wahab/todo-app.git
   cd todo-app/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure database connection in `database.py` (replace with your PostgreSQL credentials)

5. Run migrations to create database tables:
   ```bash
   python main.py
   ```

6. Start the development server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Open `index.html` in a web browser to access the application

## API Documentation

The API is RESTful and follows standard conventions. All endpoints are prefixed with `/api`.

### Authentication Endpoints

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | /api/signup       | User registration         |
| POST   | /api/login        | User login                |

### Task Management Endpoints

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | /api/tasks        | Create a new task         |
| GET    | /api/tasks        | Get all user's tasks      |
| PUT    | /api/tasks/{id}   | Update a task             |
| DELETE | /api/tasks/{id}   | Delete a task             |

### Request/Response Examples

#### User Registration
```http
POST /api/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01",
  "gender": "Male",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### User Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Complete project report",
  "description": "Finish the quarterly business review"
}
```

## Frontend Structure

The frontend consists of four main pages:

1. **Home Page** (`index.html`): 
   - Guest view with task management (not persisted)
   - Navigation to login/signup

2. **Login Page** (`login.html`): 
   - Form for user authentication
   - Error handling and feedback

3. **Signup Page** (`signup.html`): 
   - Registration form with validation
   - Date picker for date of birth
   - Gender selection dropdown

4. **Dashboard** (`dashboard.html`): 
   - Authenticated view for task management
   - Form for creating new tasks
   - List display of user's tasks
   - Logout functionality

## Security

### Authentication & Authorization
- JWT tokens are used for stateless authentication
- Tokens are validated on each protected endpoint
- Passwords are hashed using bcrypt before storage
- All API endpoints requiring authentication use the Bearer token scheme

### Security Best Practices
- HTTPS should be enforced in production
- Environment variables for sensitive data (database credentials, secret keys)
- Input validation on both client and server sides
- Protection against common vulnerabilities (SQL injection, XSS)

## Usage Examples

### Creating a User
```javascript
// signup.js
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    date_of_birth: document.getElementById('date_of_birth').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    if (response.ok) {
      // Handle successful signup
      window.location.href = 'dashboard.html';
    } else {
      // Display error message
      document.getElementById('signup-message').textContent = result.detail || 'Signup failed';
    }
  } catch (error) {
    console.error('Signup error:', error);
  }
});
```

### Creating a Task
```javascript
// dashboard.js
document.getElementById('add-task').addEventListener('click', async () => {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  
  if (!title) {
    alert('Please enter a task title');
    return;
  }
  
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ title, description })
    });
    
    if (response.ok) {
      // Refresh task list
      loadTasks();
      document.getElementById('task-title').value = '';
      document.getElementById('task-desc').value = '';
    } else {
      const error = await response.json();
      alert(error.detail || 'Failed to create task');
    }
  } catch (error) {
    console.error('Error creating task:', error);
  }
});
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- GitHub: https://github.com/1wahab

---

This README provides a comprehensive overview of the Todo App project, covering its features, technical implementation, setup instructions, and usage examples. It can be customized further with additional details specific to your implementation.
