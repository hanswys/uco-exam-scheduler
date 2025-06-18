# 🗓️ UCO Exam Scheduler

> A full-stack web application to help UCO students register their exams, view them in a structured way, and export to their device calendar.

---

## ✨ Features

- ✉️ Contact page with working email form (EmailJS)
- 📄 Schedule page with subject, date, and time fields
- ✅ Save scheduled exams to PostgreSQL via backend API
- 📝 Display scheduled exams from database in an animated list
- 📤 Export all scheduled exams to a calendar (.ics bulk download)
- 🕐 Official UCO Exam Schedule Updates based on current semester
- 🚀 Responsive and centered layout for all forms and lists

---

## 🧠 Why I Built This

I built this app to help UCO students organize their exam schedules and easily add them to their calendars, while practicing full-stack development with React and Spring Boot.

---

## 👨‍💻 My Role

- Designed and implemented the **frontend** using React and dynamic components (Mostly React Bits) 
- Developed **backend APIs** with Spring Boot  
- Integrated **PostgreSQL** for exam schedule data  
- Managed project structure and Git version control

---

## 🚀 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/uco-exam-scheduler.git
cd uco-exam-scheduler

# 2. Start backend (Spring Boot, Java, PostgreSQL)
cd backend
# Configure your PostgreSQL in src/main/resources/application.properties
./mvnw spring-boot:run

# 3. Start frontend (React)
cd ../frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack

**Frontend:** React, EmailJS, react-social-icons, Material UI, ics, file-saver  
**Backend:** Spring Boot (Java), JPA  
**Database:** PostgreSQL  
**Dev Tools:** Git, GitHub, Vite

---

## 📸 Screenshots

🚀 [Live Demo](https://youtu.be/5lmNEUHRYNo)

Home UI  
![Home Screenshot](https://github.com/user-attachments/assets/93302dfa-8c25-44fc-8e24-37366d3632e5)

UCO Official Exam Timing (Summer 2025)  
![Exam Timing Screenshot](https://github.com/user-attachments/assets/fa7e82a2-b56e-49e1-8bc1-70e72591adb6)

Scheduling Page  
![Schedule Screenshot](https://github.com/user-attachments/assets/dbf1a86f-09f7-4d24-95b7-8be91dc77944)

Contact Page  
![Contact Screenshot](https://github.com/user-attachments/assets/b5f53728-6384-4f72-b838-dfeb04a31e68)

---

## 📬 Contact

- LinkedIn: [linkedin.com/in/yong-shen-wong-507517309/](https://www.linkedin.com/in/yong-shen-wong-507517309/)
- GitHub: [github.com/hanswys](https://github.com/hanswys?tab=repositories)
- Email: hanswongys007@email.com

---

## ✅ What I Learned

- Building RESTful APIs with Spring Boot and JPA
- Connecting React frontends to Java backends
- Using PostgreSQL for structured data storage
- Exporting calendar events with the ics library
- Handling CORS and environment variables securely
- Creating responsive, user-friendly UIs

---
