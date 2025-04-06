[![Live App](https://img.shields.io/badge/Live%20App-%F0%9F%9A%80-green?style=for-the-badge)](https://mihirth17.github.io/CampusQuest/)
![Repo Size](https://img.shields.io/github/repo-size/mihirth17/CampusQuest)
![Last Commit](https://img.shields.io/github/last-commit/mihirth17/CampusQuest)
![Top Language](https://img.shields.io/github/languages/top/mihirth17/CampusQuest)
 
🔒 **License Notice**  
This project is licensed under a custom MIT License. You are free to fork and modify this code, but you **must credit the author** (Mihir Thakkar), and **may not submit contributions or modify the original repository** without explicit permission.

# 🚀 CampusQuest – College & Career Guidance System


CampusQuest is a dynamic full-stack platform built to empower students with **personalized college recommendations** based on their aptitude and academic performance. Designed with scalability and simplicity in mind, this system simulates a real-world student career portal and showcases full-cycle product thinking — from frontend UX to secure backend APIs.

---

## ✨ Highlights

- 🧠 Aptitude test engine with timer and auto-submission
- 🎯 Smart college recommendation system using aptitude score + 12th % + stream/course preferences
- 🗂️ Application tracker for students (personal use)
- 🛡️ JWT-based authentication and route protection
- 📊 Admin view to see all scores and application logs

---

## 🛠️ Tech Stack

| Layer        | Technology                      |
|--------------|----------------------------------|
| **Frontend** | ReactJS, Axios, React Router, Toastify |
| **Backend**  | FastAPI, Pydantic, SQLAlchemy, MySQL |
| **Database** | MySQL                           |
| **Auth**     | OAuth2, JWT Token (Bearer)       |
| **Design**   | CSS with glassmorphism, Poppins font |

---

## 📂 Project Structure

```
campus_quest/
├── campusquest-backend/
│   └── app/
│       ├── main.py
│       ├── models.py
│       ├── schemas.py
│       ├── crud.py
│       ├── auth.py
│       ├── database.py
│       ├── admin_routes.py
│       └── routes.py
│   ├── requirements.txt
│   └── .env
│
├── campusquest-frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── utils/
│   ├── package.json
│   ├── .gitignore
│   └── README.md
```

---

## 🚀 How to Run Locally

### 🔧 Backend (FastAPI + MySQL)

1. **Setup Python environment**

```bash
cd campusquest-backend
python -m venv venv
venv\Scripts\activate  # For Windows
pip install -r requirements.txt
```

2. **Create a `.env` file**

```
DATABASE_URL=mysql+pymysql://<user>:<password>@localhost/<database>
SECRET_KEY=your_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

3. **Start the server**

```bash
uvicorn app.main:app --reload
```

---

### 💻 Frontend (React)

```bash
cd campusquest-frontend
npm install
npm start
```

This will launch the React app on [http://localhost:3000](http://localhost:3000)

Ensure your backend runs at [http://localhost:8000](http://localhost:8000)

---

## 🔐 Auth Flow

- Users can **Register / Login**
- JWT token is stored in browser local storage
- Protected pages check token validity
- Currently, user role changes (e.g., making someone admin) must be done via the database manually

---

## 📈 Core Logic

- Aptitude test auto-submits after time ends or all questions are answered
- College recommendations are filtered based on:
  - Aptitude Score
  - 12th % Score
  - Preferred stream and course
- Application status is tracked locally for the user
- Admin can view scores and applications (read-only)

---

## 🧠 Sample Test User

```
Username: testuser
Password: testpass
Role: user
```

*Role changes to "admin" must be applied manually via the DB for now.*

---

## 🚧 Planned Improvements

- 🏆 Leaderboard for top scorers
- 📄 PDF download of result + college list
- ✉️ Application status reminders via email
- 📊 Admin filters and search in application logs

---

## 👨‍💻 About the Developer

**Mihir Thakkar**  
🎓 2nd Year BCA Student | Aspiring Full Stack Developer  
💡 Passionate about building smart, student-focused platforms using modern web technologies.

---

## 🤝 Contributions & Collaboration

Want to contribute or connect?  
Feel free to fork, raise a PR, or get in touch via [LinkedIn](https://www.linkedin.com).
