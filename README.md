# Task Manager with User Authentication

A full-stack task management application with user authentication built with Next.js frontend and Node.js/Express backend.

## Features

- **User Authentication**: Login and registration system
- **Task Management**: Create, view, and delete tasks
- **User-specific Tasks**: Each user can only see their own tasks
- **Modern UI**: Built with Tailwind CSS for a responsive design
- **Secure**: Protected routes and user session management

## Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- Client-side routing and state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or MongoDB Atlas connection string

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your MongoDB connection in `src/config/db.config.js`

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in with your credentials at `/login`
3. **Manage Tasks**: After login, you'll be redirected to the main task manager
4. **Create Tasks**: Use the form to add new tasks
5. **View Tasks**: See all your tasks in the list below
6. **Delete Tasks**: Remove completed or unwanted tasks
7. **Logout**: Click the logout button to end your session

## Security Features

- Password validation (minimum 6 characters)
- Email format validation for usernames
- Protected routes requiring authentication
- User-specific task isolation
- Session management with localStorage

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route definitions
│   │   ├── config/          # Configuration files
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── api/         # API routes (proxies to backend)
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   ├── page.js      # Main task manager page
│   │   │   ├── layout.js    # Root layout
│   │   │   └── globals.css  # Global styles
│   │   └── ...
│   └── package.json
└── README.md
```

## Development

- The frontend proxies API requests to the backend
- CORS is enabled on the backend for development
- Hot reloading is available for both frontend and backend
- Use `npm run dev` for development mode

## Production Considerations

- Implement proper password hashing (bcrypt)
- Add JWT tokens for authentication
- Use environment variables for configuration
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS in production
- Implement proper error logging