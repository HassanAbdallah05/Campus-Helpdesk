# Campus Helpdesk

Campus Helpdesk is a web-based ticketing system for Kuwait University. Students can submit campus issues, track ticket status, and communicate with admins. Admin can manage tickets, reply to students, and update ticket statuses.

## Technologies Used

### Frontend
- React
- React Router
- CSS / Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HassanAbdallah05/Campus-Helpdesk.git
```

```bash
cd Campus-Helpdesk
```

### 2. Install Backend Dependencies

```bash
cd backend
```

```bash
npm install
```

## How to Run

### 1. Run the Backend

```bash
cd backend
```

```bash
npm run dev
```

Backend runs on: http://localhost:5001

### 2. Run the Frontend

Open a new terminal in the project root folder.

```bash
npm start
```

Frontend runs on: http://localhost:3000

## Project Structure

```bash
Campus-Helpdesk/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/
├── public/
├── package.json
└── README.md
```

## Main Features

- Student registration and login
- Admin authentication
- JWT-based protected routes
- Ticket creation and tracking
- Admin status update (Open, In Progress, Resolved, Closed)
- Reply system between students and admins
- Location-based ticket reporting
- MongoDB database integration

## API Endpoints

### Authentication

```bash
POST /api/auth/register
```

```bash
POST /api/auth/login
```

### Tickets

```bash
POST /api/tickets
```

```bash
GET /api/tickets
```

```bash
GET /api/tickets/:id
```

```bash
PUT /api/tickets/:id/status
```

### Replies

```bash
POST /api/replies
```

## Database Collections

- Users
- Tickets
- Replies
- Locations
- TicketStatusHistory

## Initial Database

The initial MongoDB database export is included in the `database/` folder as JSON files for the required collections.

## Team Members

- Mohamed Muhdi
- Khaled Bahjat
- Hassan Abdalla
