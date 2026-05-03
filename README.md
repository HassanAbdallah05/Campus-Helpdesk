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
git clone https://github.com/HassanAbdallah05/Campus-Helpdesk.git  
cd Campus-Helpdesk  

### 2. Install Dependencies (Backend Only)
cd backend  
npm install  

## How to Run

### 1. Run the Backend
cd backend  
npm start  

Backend runs on:  
http://localhost:5001  

### 2. Run the Frontend
Open a new terminal:  
npm start  

Frontend runs on:  
http://localhost:3000  

## Project Structure

Campus-Helpdesk/  
├── backend/  
│   ├── config/  
│   ├── controllers/  
│   ├── middleware/  
│   ├── models/  
│   ├── routes/  
│   └── server.js  
│  
├── src/  
├── public/  
├── package.json  
└── README.md  

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
POST /api/auth/register  
POST /api/auth/login  

### Tickets
POST /api/tickets  
GET /api/tickets  
GET /api/tickets/:id  
PUT /api/tickets/:id/status  

### Replies
POST /api/replies  

## Database Collections

- Users  
- Tickets  
- Replies  
- Locations  
- TicketStatusHistory  

## Team Members

- Mohamed Muhdi  
- Khaled Bahjat  
- Hassan Abdalla  
