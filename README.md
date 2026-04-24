## FEATURES INCLUDED
- Full CRUD Functionality: Create, Read, Update, and Delete products with real-time UI updates.
- Secure Authentication: User registration and login powered by OAuth2 and JWT.
- Database Persistence: Reliable data storage using PostgreSQL.
- Security: Password hashing and protected API routes to ensure data privacy.

<br /> <br />
## TECH STACK
- Frontend: React JSX
- Backend: FastAPI with Uvicorn engine
- Database: PostgreSQL
- Authentication: JWT, OAuth2, Passlib (Bcrypt)

<br /> <br />
## INSTALLATIONS AND DEPENDENCIES

### IMPORTANT: THIS WEBSITE WAS PROGRAMMED USING THE PYCHARM DEVELOPMENT TOOL. PLEASE FOLLOW THE FOLLOWING STEPS BEFORE RUNNING THE TERMINAL COMMANDS.

<img width="997" height="240" alt="image" src="https://github.com/user-attachments/assets/6dbfbc3f-3ca8-43b2-ab9f-be9fc90dcf99" />

### Make sure to select "Project venv" in "New Project" before pressing "Create"

<img width="1919" height="679" alt="image" src="https://github.com/user-attachments/assets/82128485-19fc-4911-bc0f-c4075a9ed19b" />

### There will be a premade "main.py" file right below the .venv library roots (clear the code within the premade main.py file). Move the "main.py" file into a new folder named "Backend" by right clicking the Inventory Manager directory.

<img width="851" height="800" alt="image" src="https://github.com/user-attachments/assets/92c9ecb7-13df-4502-9888-cb0a1f0f0e4b" />
<br /> <br />
<img width="1318" height="410" alt="image" src="https://github.com/user-attachments/assets/76b73736-4aab-40c4-b376-fb88380d7fc9" />


### Create another folder named "Frontend" the same way.

<img width="441" height="231" alt="image" src="https://github.com/user-attachments/assets/365320d9-fc27-4a9a-a465-174dbd411b37" />

### Above is the final file structure for the project



<br /> <br />
### 1. Backend Setup (FastAPI)
   Within the Backend folder, run the following command in terminal to install the dependencies:
   
 ```bash
#To locate the Backend folder if not located already
cd Backend
```
```bash
#Install the dependencies
pip install uvicorn fastapi sqlalchemy
```
```bash
#Run the backend engine
uvicorn main:app --reload
```
<br /> <br />
### 2. Frontend Setup (React)
   Within the Frontend folder, run the following command in a new terminal to install the libraries and dependencies (make sure node.js is installed on your system before proceeding with this step):
  
   ```bash
#To locate the Frontend folder if not located already
cd Frontend
```
```bash
# 1. Start the Vite installation process
npm create vite@latest

# 2. When prompted, follow these selections:
# Project name: (Type your folder name, e.g., my-inventory-app)
# Select a framework: -> React
# Select a variant: -> JavaScript
```

   The server will automatically be live which can be accessed by clicking on the localhost link that appears after all these commands are run.
   You can manually start the server after restart by typing:

   ```bash
#Make sure to replace "my-inventory-app" with the name you have provided for you project
cd my-inventory-app
```
```bash
#This command allows the server to go live
npm run dev
```
  

### Key Note: Make sure you replace "db_url" within the database.py file to connect to your preferred SQL Database

<br /> <br />
## PREVIEW
### Backend



<img width="765" height="247" alt="image" src="https://github.com/user-attachments/assets/06d940f2-33d4-4979-b793-4569a2d068b3" />

### Local Host link displayed after running the backend in terminal

<img width="966" height="194" alt="image" src="https://github.com/user-attachments/assets/7c529e15-e76e-4f1b-b5c0-5f4fec3a847b" />

### Type /docs to access the backend logic and test all functions

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5683a840-0b6a-452e-a5a0-cf1e04e6342f" />

<br /> <br />
### Frontend

<img width="582" height="260" alt="image" src="https://github.com/user-attachments/assets/3e2f8cf6-c8c8-4434-90e5-d984346744b8" />
<br /> <br />
<img width="1919" height="1002" alt="image" src="https://github.com/user-attachments/assets/6dd73a82-2171-41b1-8e36-3d5c6350a15c" />
<br /> <br />
<img width="1919" height="1005" alt="image" src="https://github.com/user-attachments/assets/dc1533a6-daff-4fd4-aaf0-c10476386207" />
<br /> <br />
<img width="1919" height="1003" alt="image" src="https://github.com/user-attachments/assets/7dea9063-68d0-4a96-b55c-1aa434802982" />
<br /> <br />
<img width="1917" height="1005" alt="image" src="https://github.com/user-attachments/assets/55873c02-1e9c-424a-a807-43f2865c2502" />
<br /> <br />
<img width="1919" height="1000" alt="image" src="https://github.com/user-attachments/assets/11cd8040-a618-4f2e-bc11-09c4d12d6f33" />












   
