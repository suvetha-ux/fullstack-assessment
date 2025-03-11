# Sales Management App  

## 📜 Project Overview  
This is a simple *Sales Management Application* built with:  
- *Backend:* Node.js, Express.js, MongoDB (secured with JWT authentication)  
- *Frontend:* React.js with React Router DOM and Axios  

The application allows you to:  
- *Login* with a username and password.  
- *Add Sales* with product name, price, and quantity.  
- *View Sales List* with options to *View, **Edit, and **Delete* sales records.  
- *Perform CRUD Operations* directly linked to the database.  

## 📂 Project Structure  
### *Backend (backend/)*  
- server.js: Main server file.  
- routes/: Contains salesRoutes.js and authRoutes.js.  
- controllers/: Handles logic for sales and authentication.  
- models/: Contains the Sales.js model.  
- .env: Environment variables for MongoDB URI, PORT, JWT_SECRET.  

### *Frontend (frontend/src/)*  
- pages/:  
  - Login.jsx → Handles login functionality.  
  - SalesManagement.jsx → Handles displaying sales records and performing actions.  
- components/:  
  - AddSale.jsx → Form to add a new sale.  
  - ViewSale.jsx → Page to view sale details.  
  - EditSale.jsx → Form to edit sale details.  
- App.jsx → Handles routes using React Router DOM.  

---

## ✅ *How to Run the Project*  
### *Step 1: Clone the Repository*  
```bash
git clone <repository-link>
cd Sales-Management-App